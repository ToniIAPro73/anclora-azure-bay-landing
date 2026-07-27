export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Azure Bay — Anclora Group</p>
          <h1 className="text-4xl font-semibold">Términos del servicio</h1>
          <p className="text-xs text-slate-400">Última actualización: 17 de mayo de 2026</p>
        </div>

        <Section title="Operador">
          <p>Azure Bay es un proyecto presentado por Anclora Group. Esta landing page tiene como finalidad la captación de interesados en la promoción inmobiliaria Azure Bay. Contacto: hola@anclora.com.</p>
        </Section>

        <Section title="Naturaleza de la información">
          <p>La información, imágenes, planos, precios orientativos y proyecciones contenidos en este sitio tienen carácter informativo y publicitario. No constituyen oferta vinculante, contrato de reserva ni compromiso de venta. Los datos definitivos figurarán exclusivamente en los documentos contractuales firmados entre las partes.</p>
        </Section>

        <Section title="Uso del sitio">
          <p>El acceso y uso de este sitio es libre y gratuito para personas interesadas en el proyecto. Queda prohibido el uso del sitio para fines ilícitos, la reproducción no autorizada de contenidos o cualquier acción que pueda perjudicar a Anclora Group o a terceros.</p>
        </Section>

        <Section title="Formulario de contacto">
          <p>Los datos facilitados a través del formulario de captación se utilizan exclusivamente para atender tu consulta y gestionar tu interés en el proyecto Azure Bay. No se realizan cesiones a terceros no vinculados al proyecto sin tu consentimiento.</p>
        </Section>

        <Section title="Asesoramiento profesional">
          <p>La información publicada no sustituye el asesoramiento legal, fiscal o financiero profesional. Antes de tomar cualquier decisión de inversión, te recomendamos consultar con asesores cualificados y revisar la documentación oficial del promotor y las licencias vigentes.</p>
        </Section>

        <Section title="Propiedad intelectual">
          <p>Los textos, imágenes, logotipos y diseños publicados en este sitio son propiedad de Anclora Group o de sus licenciantes, salvo indicación expresa en contrario. Queda prohibida su reproducción total o parcial sin autorización escrita.</p>
        </Section>

        <Section title="Limitación de responsabilidad">
          <p>Anclora Group no se responsabiliza de los daños derivados del uso o imposibilidad de uso de este sitio, ni de la exactitud de proyecciones de rentabilidad o disponibilidad de unidades que puedan variar sin previo aviso.</p>
        </Section>

        <Section title="Ley aplicable">
          <p>Estos términos se rigen por la ley española. Para cualquier controversia derivada del uso de este sitio, las partes se someten a los tribunales competentes según la normativa aplicable.</p>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
      <h2 className="text-xl font-semibold text-cyan-100">{title}</h2>
      <div className="text-sm leading-7 text-slate-300">{children}</div>
    </div>
  )
}
