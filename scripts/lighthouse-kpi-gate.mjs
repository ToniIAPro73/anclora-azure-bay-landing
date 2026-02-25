#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const files = process.argv.slice(2)

if (files.length === 0) {
  console.error("Usage: node scripts/lighthouse-kpi-gate.mjs <report1.json> [report2.json...]")
  process.exit(1)
}

const requiredCategories = ["performance", "accessibility", "best-practices", "seo"]
const requiredScore = 1
let hasFailure = false

for (const file of files) {
  const absolutePath = path.resolve(file)
  if (!fs.existsSync(absolutePath)) {
    console.error(`[FAIL] Report not found: ${absolutePath}`)
    hasFailure = true
    continue
  }

  const raw = fs.readFileSync(absolutePath, "utf-8")
  const report = JSON.parse(raw)
  process.stdout.write(`\nReport: ${absolutePath}\n`)

  for (const category of requiredCategories) {
    const score = report?.categories?.[category]?.score
    const scorePct = Math.round((score ?? 0) * 100)
    const ok = score === requiredScore
    process.stdout.write(` - ${category}: ${scorePct}${ok ? " ✅" : " ❌"}\n`)
    if (!ok) hasFailure = true
  }

  const extensionUsage = report?.audits?.["unused-javascript"]?.details?.items?.some((item) =>
    String(item.url || "").startsWith("chrome-extension://")
  )
  if (extensionUsage) {
    console.warn("   warning: chrome-extension scripts detected in report (measurement noise)")
  }
}

if (hasFailure) {
  console.error("\nLighthouse KPI gate failed.")
  process.exit(2)
}

process.stdout.write("\nLighthouse KPI gate passed.\n")
