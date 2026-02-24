import {
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Home,
  Star,
  Users,
  Phone,
  Award,
  CheckCircle2,
} from "lucide-react";

export const landingContent = {
  es: {
    hero: {
      title: "Azure Bay",
      subtitle: "VISTA MARINA, COSTA DEL SOL PREMIUM",
      description:
        "Caso de estudio (portfolio): complejo residencial ficticio frente al mar, impulsado por la futura Azure Grand Marina (primavera 2027). Proyecciones orientativas.",
      price: "Desde €198.000",
      payment: "Pague solo 1% mensual durante 5 años",
      handover: "Entrega Q3 2026",
      cta1: "Descargar Dossier",
      cta2: "Reservar Ahora",
    },
    menu: {
      wynnEffect: "El Efecto Marina",
      investment: "Inversión",
      features: "Características",
      gallery: "Galería",
      apartments: "Apartamentos",
      location: "Ubicación",
      faq: "FAQ",
    },
    wynnEffect: {
      title: "El Efecto Marina",
      subtitle: "El catalizador que está transformando Azure Bay District",
      description:
        "La futura Azure Grand Marina & Signature Boulevard (apertura prevista en primavera de 2027) está atrayendo inversión, turismo y nueva demanda residencial. El mercado se posiciona antes del hito para capturar el ciclo completo de apreciación del waterfront.",
      stats: [
        {
          icon: TrendingUp,
          value: "+32%",
          label: "Impulso de demanda",
          sublabel: "Proyección 2025–2027",
        },
        {
          icon: DollarSign,
          value: "€3.4B",
          label: "Inversión en distrito",
          sublabel: "Marina + boulevard + retail",
        },
        {
          icon: Calendar,
          value: "Prim. 2027",
          label: "Apertura Marina",
          sublabel: "Hito de consolidación",
        },
      ],
      urgency: {
        title: "¿Por qué posicionarse AHORA?",
        description:
          "Los inversores sofisticados se adelantan a la apertura de la marina y a la activación del paseo comercial. Azure Bay se entrega en Q3 2026, para capturar la ventana de apreciación previa y posterior al lanzamiento.",
        countdown: "Entrega: Q3 2026 • Apertura Marina: Primavera 2027",
      },
    },
    features: {
      // FEATURES_1: Development Structure
      development: {
        title: "Estructura del Desarrollo",
        tagline: "Arquitectura contemporánea frente al mar",
        description: [
          "Tres torres icónicas que combinan elegancia atemporal con el entorno costero de Azure Bay District.",
          "Diseño arquitectónico que maximiza vistas panorámicas al mar abierto desde cada residencia.",
        ],
        image: "/assets/imagenes/collage_estructura.webp",
      },
      // FEATURES_2: Specifications
      specifications: {
        title: "Especificaciones",
        tagline: "Detalles que definen la excelencia",
        cards: [
          {
            title: "Studios",
            size: "27,87-42,9 m²",
            price: "Desde 192.000€",
            features: "Cocina integrada, baño premium, balcón privado",
          },
          {
            title: "1 Dormitorio",
            size: "55,74-78,97 m²",
            price: "Desde 325.000€",
            features: "Suite en-suite, vestidor, zona de lavandería",
          },
          {
            title: "2 Dormitorios",
            size: "102,19-111,48 m²",
            price: "Desde 540.000€",
            features: "Dos suites, cocina isla, balcones duales",
          },
          {
            title: "3 Dormitorios",
            size: "157,94-167,22 m²",
            price: "Desde 740.000€",
            features: "Master suite, cuarto de servicio, terraza 25m²",
          },
        ],
      },
      // FEATURES_3: Azure Bay Views
      playaViva: {
        title: "Azure Bay",
        tagline: "Cuatro perspectivas de vida frente al mar",
        tabs: [
          {
            label: "Comunidad Costera",
            image: "/assets/imagenes/view1.webp",
            description: "Comunidad exclusiva en primera línea de playa",
          },
          {
            label: "Diseño Inspirador",
            image: "/assets/imagenes/view2.webp",
            description:
              "Arquitectura que captura la esencia del Mediterráneo",
          },
          {
            label: "Lujo sin Esfuerzo",
            image: "/assets/imagenes/view3.webp",
            description: "Lujo sin esfuerzo en cada detalle",
          },
          {
            label: "Acceso a Playa",
            image: "/assets/imagenes/beach.webp",
            description: "Acceso directo a playas de arena blanca",
          },
        ],
      },
      // FEATURES_4: Amenities Carousel
      amenities: {
        title: "Servicios",
        tagline: "Espacios diseñados para el bienestar",
        items: [
          {
            title: "Cine Exterior",
            image: "/assets/imagenes/cinema.webp",
            description:
              "Cine al aire libre con proyección bajo las estrellas",
          },
          {
            title: "Spa y Bienestar",
            image: "/assets/imagenes/foto galeria 7.webp",
            description: "Centro de bienestar con tratamientos de lujo",
          },
          {
            title: "Centro de Fitness",
            image: "/assets/imagenes/foto galeria 4.webp",
            description:
              "Gimnasio equipado con tecnología de última generación",
          },
          {
            title: "Piscinas Exteriores",
            image: "/assets/imagenes/nueva_piscina_mejorada.webp",
            description: "Piscinas infinity con vistas al Mediterráneo",
          },
          {
            title: "Comercios y Restauración",
            image: "/assets/imagenes/retail.webp",
            description: "Gastronomía y retail de primer nivel",
          },
        ],
      },
    },
    gallery: {
      title: "El Proyecto",
      subtitle: "Diseño arquitectónico excepcional en Azure Bay District",
      description:
        "Explore la elegancia y sofisticación de Azure Bay a través de renders de alta resolución y fotografías del entorno.",
    },
    apartments: {
      title: "Colección de Apartamentos",
      subtitle: "Espacios diseñados para cada perfil inversor",
      description:
        "Desde estudios boutique hasta áticos de tres dormitorios, cada tipología ofrece vistas al mar, entrega llave en mano y acceso al plan de pago del 1% mensual.",
      note: "Los precios son estimaciones orientativas basadas en el tipo de cambio vigente y pueden variar sin previo aviso.",
      tabs: {
        studio: {
          label: "Estudio",
          headline: "Estudios boutique frente al mar",
          description:
            "Distribución abierta con cocina integrada, ventanales de piso a techo y balcón privado hacia el Golfo.",
          highlights: [
            "Totalmente amueblados con domótica y electrodomésticos premium",
            "Baño hotelero con acabados de piedra natural",
            "Ideal para renta corporativa o pied-à-terre en Azure Coast",
          ],
          parking: "Opción de aparcacoches gratuito para residentes",
        },
        oneBed: {
          label: "1 Habitación",
          headline: "Suite residencial con sala independiente",
          description:
            "Salón comedor con cocina lineal, dormitorio en suite y balcón profundo para disfrutar del skyline.",
          highlights: [
            "Vestidor cerrado y baño principal con doble lavabo",
            "Zona de lavandería y almacenamiento oculto",
            "Elegible para paquete de gestión de rentas llave en mano",
          ],
          parking: "1 plaza de parking (aprox. 11.750€)",
        },
        twoBed: {
          label: "2 Habitaciones",
          headline: "Plantas angulares con vistas duales",
          description:
            "Dos dormitorios en suite, cocina con isla y sala envolvente que accede a dos balcones panorámicos.",
          highlights: [
            "Dormitorio principal tipo master con lounge privado",
            "Baño secundario con ventilación natural y tocador doble",
            "Espacio flexible para despacho o family room",
          ],
          parking: "1 plaza de parking incluida",
        },
        threeBed: {
          label: "3 Habitaciones",
          headline: "Residencias familiares con terraza envolvente",
          description:
            "Amplia zona social, cocina cerrada y tres suites con acceso directo a una terraza de más de 25 m².",
          highlights: [
            "Habitación principal con baño spa y walk-in closet de 6 metros",
            "Cuarto de servicio con baño independiente",
            "Vistas de 180° hacia el mar y el skyline de la Azure Grand Marina",
          ],
          parking: "2 plazas de parking incluidas",
        },
      },
    },
    trust: {
      title: "Caso de Estudio (Portfolio)",
      subtitle: "Landing premium + automatización de captación",
      description:
        "Proyecto ficticio creado por Anclora Cognitive Solutions (Anclora Nexus Group) para demostrar un servicio integral: diseño UI premium, copy bilingüe, estructura de conversión y automatización del lead magnet (dossier).",
      partners: "Cobertura (mock) para contexto narrativo",
      readMore: "Ver ejemplo",
      articles: [
        {
          date: "Mayo 2026",
          image: "/assets/imagenes/news_1.webp",
          alt: "Coastal Development Review - Azure Grand Marina",
          source: "Coastal Development Review",
          title: "Azure Grand Marina: el nuevo polo del waterfront",
          summary:
            "Anuncio de la marina, boulevard comercial y oferta gastronómica como catalizador del distrito costero.",
          url: "https://example.com",
        },
        {
          date: "Abril 2026",
          image: "/assets/imagenes/news_2.webp",
          alt: "Global Wealth Digest - Coastal migration",
          source: "Global Wealth Digest",
          title: "La nueva ola de inversión en distritos costeros emergentes",
          summary:
            "Tendencias de movilidad de capital hacia zonas premium frente al mar con infraestructuras planificadas.",
          url: "https://example.com",
        },
        {
          date: "Febrero 2026",
          image: "/assets/imagenes/news_3.webp",
          alt: "Marina & Hospitality Report - Signature Boulevard",
          source: "Marina & Hospitality Report",
          title: "Signature Boulevard: retail y hospitality en primera línea",
          summary:
            "Cómo el mix de retail, hotelería y ocio eleva la demanda residencial y la ocupación turística.",
          url: "https://example.com",
        },
        {
          date: "Enero 2026",
          image: "/assets/imagenes/news_4.webp",
          alt: "Coastal Economics - Infrastructure impact",
          source: "Coastal Economics",
          title: "Infraestructura y apreciación: el ciclo del waterfront",
          summary:
            "Guía de lectura para inversores: fases de apreciación antes y después de un gran hito urbano.",
          url: "https://example.com",
        },
        {
          date: "Noviembre 2025",
          image: "/assets/imagenes/news_5.webp",
          alt: "Residential Market Insights - Supply & demand",
          source: "Residential Market Insights",
          title:
            "Oferta vs demanda: por qué suben los alquileres en zonas prime",
          summary:
            "Factores que explican el incremento de alquileres en productos turnkey frente al mar (análisis ilustrativo).",
          url: "https://example.com",
        },
      ],
    },
    specifications: {
      title: "Especificaciones",
      subtitle: "Unidades diseñadas para el inversor sofisticado",
      description:
        "Desde estudios compactos hasta amplios apartamentos de 3 dormitorios, todas las unidades incluyen acabados premium, domótica y entrega totalmente amueblada.",
      units: [
        {
          type: "Studio",
          size: "37-45 m²",
          price: "Desde 170.000€",
          features: [
            "Smart Home",
            "Totalmente amueblado",
            "Balcón privado",
            "Cocina equipada",
          ],
        },
        {
          type: "1 Dormitorio",
          size: "65-75 m²",
          price: "Desde 240.000€",
          features: [
            "Smart Home",
            "Totalmente amueblado",
            "Balcón amplio",
            "Dormitorio principal en-suite",
          ],
        },
        {
          type: "2 Dormitorios",
          size: "95-110 m²",
          price: "Desde 350.000€",
          features: [
            "Smart Home",
            "Totalmente amueblado",
            "2 Balcones",
            "Dormitorios en-suite",
          ],
        },
        {
          type: "3 Dormitorios",
          size: "135-160 m²",
          price: "Desde 480.000€",
          features: [
            "Smart Home",
            "Totalmente amueblado",
            "Terraza amplia",
            "3 Baños completos",
          ],
        },
      ],
    },
    paymentPlan: {
      title: "Plan de Pago",
      subtitle: "Inversión flexible con términos competitivos",
      description:
        "40% durante construcción antes de entrega. Balance 60% a 1% mensual durante 60 meses post-entrega.",
      mainPayment: "40%",
      mainLabel: "Al Comprar",
      postHandover: "60%",
      postLabel: "Post-Entrega",
      postDetails: "1% mensual durante 60 meses",
      features: [
        "Esquema flexible para inversores internacionales",
        "Maximiza tu liquidez durante el periodo de construcción",
      ],
      cards: [
        {
          text: "Accede a la propiedad sin complicaciones: tu inversión se ajusta a ti.",
        },
        {
          text: "Empieza a vivir tu sueño ahora y paga cómodamente a lo largo del tiempo.",
        },
      ],
    },
    investment: {
      title: "Oportunidad de Inversión",
      subtitle: "Rentabilidad impulsada por el Efecto Marina",
      description:
        "Azure Bay es un caso de estudio (proyecto ficticio) diseñado para ilustrar cómo se presenta un activo premium en un distrito costero emergente. Con un plan flexible del 1% mensual y entrega en Q3 2026, el posicionamiento se produce antes de la apertura de la Azure Grand Marina en primavera de 2027.",
      stats: [
        {
          icon: TrendingUp,
          value: "6–8%",
          label: "Rentabilidad bruta objetivo",
          description: "Proyección ilustrativa (según escenarios)",
        },
        {
          icon: TrendingUp,
          value: "+32%",
          label: "Impulso de demanda",
          description: "Hasta el hito de primavera 2027",
        },
        {
          icon: Award,
          value: "Q3 2026",
          label: "Entrega del proyecto",
          description: "Antes del catalizador 2027",
        },
        {
          icon: DollarSign,
          value: "1%",
          label: "Pago mensual",
          description: "Durante 60 meses post‑entrega",
        },
      ],
      benefits: [
        "Catalizador de demanda: Azure Grand Marina (primavera 2027)",
        "Unidades amuebladas + domótica (ejemplo de especificación)",
        "Potencial de apreciación por consolidación del distrito costero",
        "Estrategias de salida y sensibilidad de escenarios en el dossier",
      ],
    },
    leadForm: {
      title: "Dossier de Inversión (Demo)",
      subtitle: "Escenarios financieros + proyecciones del Efecto Marina",
      badge: "Portfolio Demo",
      intro: "Escenarios ilustrativos y proyecciones del Efecto Marina",
      description:
        "Acceda a un dossier de ejemplo con proyecciones de rentabilidad, planos, tipologías y el impacto del catalizador urbano (Azure Grand Marina) sobre Azure Bay District. Caso de estudio creado por Anclora Cognitive Solutions (Anclora Nexus Group).",
      features: [
        "Escenarios 2026–2032 y estrategias de salida",
        "Simulación de cashflow con plan 1% mensual",
        "Tipologías, planos y memorias de calidades (demo)",
        "Calendario de hitos y automatización de seguimiento",
      ],
      form: {
        firstNamePlaceholder: "Nombre",
        lastNamePlaceholder: "Apellidos",
        emailPlaceholder: "Email",
        ctaButton: "Descargar Dossier (Demo)",
        sending: "Preparando tu dossier...",
        privacy:
          "Usamos tus datos solo para personalizar el dossier demo y disparar la automatización descrita.",
        successMessage:
          "Gracias, {{name}}. Tu dossier demo se está enviando a tu bandeja.",
        errorMessage:
          "No pudimos completar el envío. Inténtalo de nuevo o contáctanos.",
      },
    },
    location: {
      title: "Azure Bay District",
      subtitle: "Un waterfront emergente con visión 2030",
      description:
        "Distrito costero planificado para combinar vida residencial premium, paseo marítimo, marina y retail. Ubicación omitida intencionalmente (caso de estudio/portfolio).",
      stats: [
        {
          number: "9",
          label: "Km de paseo marítimo",
          labelEn: "Km of seafront promenade",
        },
        {
          number: "2.3",
          label: "Millones m² masterplan",
          labelEn: "Million m² masterplan",
        },
        {
          number: "3",
          label: "Zonas de marina + retail",
          labelEn: "Marina + retail zones",
        },
        {
          number: "25",
          label: "Min al aeropuerto (demo)",
          labelEn: "Min to airport (demo)",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas estratégicas",
      title: "Preguntas Frecuentes",
      subtitle:
        "Respuestas orientativas para un caso de estudio (portfolio).",
      highlights: [
        "Proyecto ficticio usado como ejemplo de servicio",
        "Copy bilingüe + estructura de conversión",
        "Automatización del lead magnet incluida en el flujo",
      ],
      cta: "Hablar con un especialista",
      questions: [
        {
          question: "¿Qué es Azure Bay?",
          answer:
            "Azure Bay es un complejo residencial ficticio creado como caso de estudio para mostrar cómo diseñamos una landing premium y una narrativa de inversión alrededor de un distrito costero emergente.",
        },
        {
          question: "¿Qué tipologías de apartamentos hay disponibles?",
          answer:
            "Estudios y unidades de 1, 2 y 3 dormitorios (ejemplo). El objetivo es ilustrar cómo se presenta cada tipología con beneficios claros, highlights y un encaje para distintos perfiles de inversor.",
        },
        {
          question: "¿Qué amenidades ofrece Azure Bay?",
          answer:
            "Amenidades tipo resort (ejemplo): spa, piscinas interior/exterior, rooftop lounge, gimnasio, kids club, playa privada y servicios de concierge 24/7. El listado es configurable según el producto real.",
        },
        {
          question: "¿Cuándo se entregará Azure Bay?",
          answer:
            "La entrega ilustrativa está fijada en Q3 2026, para posicionar al inversor antes del hito urbano principal: la apertura de Azure Grand Marina en primavera de 2027.",
        },
        {
          question: "¿Es una buena oportunidad de inversión?",
          answer:
            "En este caso de estudio, el argumento de inversión se apoya en un catalizador urbano (marina + boulevard) que incrementa demanda y puede impulsar rentas y apreciación. El dossier demo incluye escenarios y sensibilidad.",
        },
        {
          question: "¿Quién es el desarrollador?",
          answer:
            "Azure Bay Development Group (ficticio). El objetivo es demostrar el servicio de Anclora Cognitive Solutions: diseño, copy, estructura de conversión y automatización de captación.",
        },
        {
          question: "¿Cómo funciona el plan de pagos?",
          answer:
            "Ejemplo: 40% durante construcción antes de la entrega, y 60% post‑entrega con pagos del 1% mensual durante 60 meses. El plan se adapta a condiciones reales de cada promotor.",
        },
        {
          question: "¿Dónde está ubicado?",
          answer:
            "Ubicación omitida intencionalmente (portfolio). Se presenta como un distrito costero emergente en primera línea de playa, con un gran catalizador (Azure Grand Marina) previsto para 2027.",
        },
        {
          question: "¿Cuáles son las cuotas de servicio?",
          answer:
            "En un caso real dependen de amenidades y operación. En el dossier demo se incluiría una estimación y el detalle de qué cubren (mantenimiento, seguridad, zonas comunes, etc.).",
        },
      ],
    },
  },
  en: {
    hero: {
      title: "Azure Bay",
      subtitle: "AZURE BAY • EMERGING COASTAL DISTRICT",
      description:
        "Portfolio case study: a fictional beachfront residential concept accelerated by the upcoming Azure Grand Marina (Spring 2027). Indicative projections.",
      price: "Starting from £165,000",
      payment: "Pay Just 1% Per Month for 5 Years",
      handover: "Handover Q3 2026",
      cta1: "Download Dossier",
      cta2: "Book Now",
    },
    menu: {
      wynnEffect: "The Marina Effect",
      investment: "Investment",
      features: "Features",
      gallery: "Gallery",
      apartments: "Apartments",
      location: "Location",
      faq: "FAQ",
    },
    wynnEffect: {
      title: "The Marina Effect",
      subtitle: "The catalyst reshaping Azure Bay District",
      description:
        "The upcoming Azure Grand Marina & Signature Boulevard (opening Spring 2027) is attracting capital, tourism, and new residential demand. Investors position ahead of the milestone to capture the full waterfront appreciation cycle.",
      stats: [
        {
          icon: TrendingUp,
          value: "+32%",
          label: "Demand uplift",
          sublabel: "Indicative 2025–2027",
        },
        {
          icon: DollarSign,
          value: "€3.4B",
          label: "District investment",
          sublabel: "Marina + boulevard + retail",
        },
        {
          icon: Calendar,
          value: "Spring 2027",
          label: "Marina opening",
          sublabel: "Consolidation trigger",
        },
      ],
      urgency: {
        title: "Why position NOW?",
        description:
          "Sophisticated investors move early, ahead of the marina launch and commercial promenade activation. Azure Bay delivers in Q3 2026, aligning you with the pre‑ and post‑launch window.",
        countdown: "Delivery: Q3 2026 • Marina opening: Spring 2027",
      },
    },
    features: {
      // FEATURES_1: Development Structure
      development: {
        title: "Development Structure",
        tagline: "Contemporary architecture facing the sea",
        description: [
          "Three iconic towers combining timeless elegance with the coastal setting of Azure Bay District.",
          "Architectural design that maximizes panoramic views of the open sea from every residence.",
        ],
        image: "/assets/imagenes/collage_estructura.webp",
      },
      // FEATURES_2: Specifications
      specifications: {
        title: "Specifications",
        tagline: "Details that define excellence",
        cards: [
          {
            title: "Studios",
            size: "300-462 SqFt",
            price: "From £146,200",
            features: "Integrated kitchen, premium bathroom, private balcony",
          },
          {
            title: "1 Bedroom",
            size: "600-850 SqFt",
            price: "From £245,100",
            features: "En-suite bedroom, walk-in closet, laundry area",
          },
          {
            title: "2 Bedrooms",
            size: "1100-1200 SqFt",
            price: "From £387,000",
            features: "Two suites, island kitchen, dual balconies",
          },
          {
            title: "3 Bedrooms",
            size: "1700-1800 SqFt",
            price: "From £559,000",
            features: "Master suite, maid's room, 25m² terrace",
          },
        ],
      },
      // FEATURES_3: Azure Bay Views
      playaViva: {
        title: "Azure Bay",
        tagline: "Four perspectives of beachfront living",
        tabs: [
          {
            label: "Coastal Community",
            image: "/assets/imagenes/view1.webp",
            description: "Exclusive beachfront community",
          },
          {
            label: "Inspired Design",
            image: "/assets/imagenes/view2.webp",
            description: "Architecture capturing Mediterranean essence",
          },
          {
            label: "Effortless Luxury",
            image: "/assets/imagenes/view3.webp",
            description: "Effortless luxury in every detail",
          },
          {
            label: "Beach Access",
            image: "/assets/imagenes/beach.webp",
            description: "Direct access to white sandy beaches",
          },
        ],
      },
      // FEATURES_4: Amenities Carousel
      amenities: {
        title: "Amenities",
        tagline: "Spaces designed for wellbeing",
        items: [
          {
            title: "Outdoor Cinema",
            image: "/assets/imagenes/cinema.webp",
            description: "Open-air cinema with screenings under the stars",
          },
          {
            title: "Spa & Wellness",
            image: "/assets/imagenes/foto galeria 7.webp",
            description: "Wellness center with luxury treatments",
          },
          {
            title: "Fitness Center",
            image: "/assets/imagenes/foto galeria 4.webp",
            description: "Gym equipped with state-of-the-art technology",
          },
          {
            title: "Outdoor Swimming Pools",
            image: "/assets/imagenes/nueva_piscina_mejorada.webp",
            description: "Infinity pools overlooking the Mediterranean",
          },
          {
            title: "Retail & Dining",
            image: "/assets/imagenes/retail.webp",
            description: "World-class dining and retail",
          },
        ],
      },
    },
    gallery: {
      title: "The Project",
      subtitle: "Exceptional architectural design in Azure Bay District",
      description:
        "Explore the elegance and sophistication of Azure Bay through high-resolution renders and environmental photography.",
    },
    apartments: {
      title: "Apartment Collection",
      subtitle: "Layouts tailored to every investment profile",
      description:
        "From boutique studios to three-bedroom residences, each typology delivers sea views, turnkey interiors, and access to the 1% monthly payment plan.",
      note: "Prices are indicative estimates based on prevailing FX and may adjust at the time of reservation.",
      tabs: {
        studio: {
          label: "Studio",
          headline: "Boutique studios facing the sea",
          description:
            "Open-plan living with integrated kitchen, floor-to-ceiling glazing, and a private balcony overlooking the Gulf.",
          highlights: [
            "Fully furnished with smart-home package and premium appliances",
            "Hotel-inspired bathroom wrapped in natural stone",
            "Perfect for corporate leasing or a pied-à-terre in Azure Coast",
          ],
          parking: "Complimentary valet option for residents",
        },
        oneBed: {
          label: "1 Bedroom",
          headline: "One-bedroom suite with defined living zones",
          description:
            "Separate living/dining area, en-suite bedroom, and a deep balcony to capture the skyline.",
          highlights: [
            "Walk-in wardrobe plus primary bathroom with double vanity",
            "Dedicated laundry and concealed storage",
            "Eligible for turnkey rental management",
          ],
          parking: "1 parking space (approx. £10,380)",
        },
        twoBed: {
          label: "2 Bedrooms",
          headline: "Corner layouts with dual-aspect views",
          description:
            "Two en-suite bedrooms, island kitchen, and wraparound living room opening onto twin panoramic balconies.",
          highlights: [
            "Primary suite with private lounge corner",
            "Secondary bath with natural ventilation and twin vanity",
            "Flexible den for office or family room use",
          ],
          parking: "1 parking space included",
        },
        threeBed: {
          label: "3 Bedrooms",
          headline: "Family residences with sweeping terrace",
          description:
            "Expansive great room, closed kitchen, and three suites that spill onto a 25 m² terrace.",
          highlights: [
            "Owner's suite with spa bathroom and 6-metre walk-in wardrobe",
            "Maid's room with dedicated bathroom",
            "180° views across the sea and the Azure Grand Marina skyline",
          ],
          parking: "2 parking spaces included",
        },
      },
    },
    trust: {
      title: "Case Study (Portfolio)",
      subtitle: "Premium landing + lead automation",
      description:
        "Fictional project created by Anclora Cognitive Solutions (Anclora Nexus Group) to showcase an end‑to‑end service: premium UI, bilingual copy, conversion structure and lead‑magnet automation (dossier).",
      partners: "Mock coverage for narrative context",
      readMore: "View example",
      articles: [
        {
          date: "May 2026",
          image: "/assets/imagenes/news_1.webp",
          alt: "Coastal Development Review - Azure Grand Marina",
          source: "Coastal Development Review",
          title: "Azure Grand Marina: the next waterfront hub",
          summary:
            "Announcement of the marina, commercial boulevard and dining scene as the district catalyst.",
          url: "https://example.com",
        },
        {
          date: "April 2026",
          image: "/assets/imagenes/news_2.webp",
          alt: "Global Wealth Digest - Coastal migration",
          source: "Global Wealth Digest",
          title: "Capital shifts towards emerging coastal districts",
          summary:
            "Investor patterns favouring prime beachfront zones with planned infrastructure and hospitality.",
          url: "https://example.com",
        },
        {
          date: "February 2026",
          image: "/assets/imagenes/news_3.webp",
          alt: "Marina & Hospitality Report - Signature Boulevard",
          source: "Marina & Hospitality Report",
          title: "Signature Boulevard: retail & hospitality on the seafront",
          summary:
            "How curated retail and leisure programmes boost residential demand and tourist occupancy.",
          url: "https://example.com",
        },
        {
          date: "January 2026",
          image: "/assets/imagenes/news_4.webp",
          alt: "Coastal Economics - Infrastructure impact",
          source: "Coastal Economics",
          title: "Infrastructure and appreciation: the waterfront cycle",
          summary:
            "Investor lens: the pre‑ and post‑milestone appreciation phases around major urban catalysts.",
          url: "https://example.com",
        },
        {
          date: "November 2025",
          image: "/assets/imagenes/news_5.webp",
          alt: "Residential Market Insights - Supply & demand",
          source: "Residential Market Insights",
          title: "Supply vs demand: why rents rise in prime turnkey products",
          summary:
            "Illustrative analysis of rental pressure drivers for furnished beachfront residences.",
          url: "https://example.com",
        },
      ],
    },
    specifications: {
      title: "Specifications",
      subtitle: "Units designed for the sophisticated investor",
      description:
        "From compact studios to spacious 3-bedroom apartments, all units include premium finishes, home automation and fully furnished delivery.",
      units: [
        {
          type: "Studio",
          size: "37-45 m²",
          price: "From £150,000",
          features: [
            "Smart Home",
            "Fully furnished",
            "Private balcony",
            "Equipped kitchen",
          ],
        },
        {
          type: "1 Bedroom",
          size: "65-75 m²",
          price: "From £210,000",
          features: [
            "Smart Home",
            "Fully furnished",
            "Spacious balcony",
            "Master bedroom en-suite",
          ],
        },
        {
          type: "2 Bedrooms",
          size: "95-110 m²",
          price: "From £310,000",
          features: [
            "Smart Home",
            "Fully furnished",
            "2 Balconies",
            "En-suite bedrooms",
          ],
        },
        {
          type: "3 Bedrooms",
          size: "135-160 m²",
          price: "From £420,000",
          features: [
            "Smart Home",
            "Fully furnished",
            "Large terrace",
            "3 Full bathrooms",
          ],
        },
      ],
    },
    paymentPlan: {
      title: "Payment Plan",
      subtitle: "Flexible investment with competitive terms",
      description:
        "40% during construction before handover. Balance 60% at 1% per month for 60 months post-handover.",
      mainPayment: "40%",
      mainLabel: "On Purchase",
      postHandover: "60%",
      postLabel: "Post-Handover",
      postDetails: "1% per month for 60 months",
      features: [
        "Flexible scheme for international investors",
        "Maximize your liquidity during construction period",
      ],
      cards: [
        {
          text: "Unlock the door to effortless ownership—your investment adapts to you.",
        },
        {
          text: "Start living your dream today, pay comfortably over time.",
        },
      ],
    },
    investment: {
      title: "Investment Opportunity",
      subtitle: "Returns accelerated by the Marina Effect",
      description:
        "Azure Bay is a portfolio case study (fictional project) designed to showcase how a premium waterfront asset is positioned within an emerging coastal district. With a flexible 1% monthly plan and Q3 2026 handover, the timing aligns ahead of the Azure Grand Marina opening in Spring 2027.",
      stats: [
        {
          icon: TrendingUp,
          value: "6–8%",
          label: "Target gross yield",
          description: "Illustrative projection (scenario‑based)",
        },
        {
          icon: TrendingUp,
          value: "+32%",
          label: "Demand uplift",
          description: "Into the Spring 2027 milestone",
        },
        {
          icon: Award,
          value: "Q3 2026",
          label: "Project handover",
          description: "Ahead of the 2027 catalyst",
        },
        {
          icon: DollarSign,
          value: "1%",
          label: "Monthly payment",
          description: "For 60 months post‑handover",
        },
      ],
      benefits: [
        "Demand catalyst: Azure Grand Marina (Spring 2027)",
        "Turnkey furnishing + smart home (sample spec)",
        "Appreciation potential as the district consolidates",
        "Exit strategies and scenario sensitivity in the dossier",
      ],
    },
    leadForm: {
      title: "Investment Dossier (Demo)",
      subtitle: "Financial scenarios + Marina Effect projections",
      badge: "Portfolio Demo",
      intro: "Illustrative scenarios and Marina Effect projections",
      description:
        "Access a sample dossier with return scenarios, layouts, specs and the projected impact of the urban catalyst (Azure Grand Marina) on Azure Bay District. Portfolio case study built by Anclora Cognitive Solutions (Anclora Nexus Group).",
      features: [
        "2026–2032 scenarios and exit strategies",
        "Cash‑flow simulation with the 1% monthly plan",
        "Masterplan, typologies and delivered specs (demo)",
        "Milestone calendar + follow‑up automation",
      ],
      form: {
        firstNamePlaceholder: "First name",
        lastNamePlaceholder: "Last name",
        emailPlaceholder: "Email",
        ctaButton: "Download Dossier (Demo)",
        sending: "Preparing your dossier...",
        privacy:
          "We only use your details to personalise the demo dossier and trigger the described automation.",
        successMessage:
          "Thank you, {{name}}. Your demo dossier is on its way to your inbox.",
        errorMessage:
          "We couldn't finalise the send. Please try again or contact our team.",
      },
    },
    location: {
      title: "Azure Bay District",
      subtitle: "An emerging waterfront vision for 2030",
      description:
        "A masterplanned coastal district combining premium residential living, a seafront promenade, marina infrastructure and curated retail. Location intentionally omitted (portfolio case study).",
      stats: [
        {
          number: "9",
          label: "Km de paseo marítimo",
          labelEn: "Km of seafront promenade",
        },
        {
          number: "2.3",
          label: "Millones m² masterplan",
          labelEn: "Million m² masterplan",
        },
        {
          number: "3",
          label: "Zonas de marina + retail",
          labelEn: "Marina + retail zones",
        },
        {
          number: "25",
          label: "Min al aeropuerto (demo)",
          labelEn: "Min to airport (demo)",
        },
      ],
    },
    faq: {
      eyebrow: "Strategic Questions",
      title: "Frequently Asked Questions",
      subtitle: "Indicative answers for a portfolio case study.",
      highlights: [
        "Fictional project used as a service example",
        "Bilingual copy + conversion structure",
        "Lead‑magnet automation included in the flow",
      ],
      cta: "Speak to a specialist",
      questions: [
        {
          question: "What is Azure Bay?",
          answer:
            "Azure Bay is a fictional residential concept built as a portfolio case study to showcase a premium landing page and an investment narrative around an emerging coastal district.",
        },
        {
          question: "What types of apartments are available?",
          answer:
            "Studios and 1, 2 and 3‑bed layouts (illustrative). The goal is to demonstrate how each typology is positioned with clear benefits, highlights and fit for different investor profiles.",
        },
        {
          question: "What amenities does Azure Bay offer?",
          answer:
            "Resort‑style amenities (illustrative): spa, indoor/outdoor pools, rooftop lounge, gym, kids club, private beach and 24/7 concierge. The list is configurable per real product.",
        },
        {
          question: "When will Azure Bay be completed?",
          answer:
            "Illustrative delivery is set to Q3 2026, positioning investors ahead of the key urban milestone: the Azure Grand Marina opening in Spring 2027.",
        },
        {
          question: "Is Azure Bay a good investment opportunity?",
          answer:
            "In this case study, the investment argument is driven by an urban catalyst (marina + boulevard) that can lift demand, rents and capital appreciation. The demo dossier includes scenarios and sensitivity.",
        },
        {
          question: "Who is the developer of Azure Bay?",
          answer:
            "Azure Bay Development Group (fictional). The objective is to showcase Anclora Cognitive Solutions’ service: design, copy, conversion structure and lead automation.",
        },
        {
          question: "What are the payment terms?",
          answer:
            "Example: 40% during construction before handover, and 60% post‑handover via 1% monthly payments across 60 months. The structure is adapted to each developer’s real terms.",
        },
        {
          question: "Where is Azure Bay located?",
          answer:
            "Location is intentionally omitted (portfolio). It is presented as a beachfront district in expansion, supported by a major catalyst (Azure Grand Marina) planned for 2027.",
        },
        {
          question: "What are the service fees at Azure Bay?",
          answer:
            "In real projects they depend on amenities and operations. In the demo dossier we would include an estimate and a clear breakdown of what the fees cover.",
        },
      ],
    },
  },
};

