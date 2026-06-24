// =============================================================
//  CONTENIDO DEL PORTAFOLIO  —  Edita aquí tus textos y datos
//  Todo es bilingüe: { es: "...", en: "..." }
// =============================================================

export const personal = {
  name: 'Edgar Palma',
  fullName: 'Edgar Andrés Palma Florido',
  email: 'edgar.palma9408@gmail.com',
  linkedin: 'https://www.linkedin.com/in/edgar-palma9408',
  github: 'https://github.com/Edgar9408',
  whatsapp: 'https://api.whatsapp.com/send/?phone=573223736988',
  location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
}

// Inicio de la carrera profesional (mes 0-indexado: 1 = febrero) → febrero 2020.
export const careerStart = new Date(2020, 1, 1)

// Años de experiencia calculados al cargar la página. No requiere mantenimiento.
export function yearsOfExperience(from = careerStart) {
  const ms = Date.now() - from.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25))
}

export const t = {
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    about: { es: 'Sobre mí', en: 'About' },
    skills: { es: 'Habilidades', en: 'Skills' },
    experience: { es: 'Experiencia', en: 'Experience' },
    contact: { es: 'Contacto', en: 'Contact' },
  },

  hero: {
    greeting: { es: 'Hola, soy', en: "Hi, I'm" },
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    // Frases rotativas del subtítulo (efecto typing)
    typed: {
      es: [
        'Convierto tus ideas en realidad',
        'Webs que enamoran a tus clientes',
        'Tu negocio brillando en internet',
        'Diseño moderno que vende solo',
        'Rápido, elegante y a tu medida',
      ],
      en: [
        'I turn your ideas into reality',
        'Websites your clients will love',
        'Your business shining online',
        'Modern design that sells itself',
        'Fast, elegant and made for you',
      ],
    },
    tagline: {
      es: 'Diseño y desarrollo páginas web a medida que hacen crecer tu negocio y dejan a tus clientes con ganas de volver.',
      en: 'I design and build custom websites that grow your business and keep your clients coming back for more.',
    },
    ctaPrimary: { es: 'Trabajemos juntos', en: "Let's work together" },
    ctaSecondary: { es: 'Conóceme', en: 'Get to know me' },
    scroll: { es: 'Desplázate', en: 'Scroll' },
  },

  about: {
    title: { es: 'Sobre mí', en: 'About me' },
    kicker: { es: 'Pasión por crear', en: 'Passion for building' },
    status: { es: 'Disponible para nuevos proyectos', en: 'Available for new projects' },
    // Valores que se muestran en la tarjeta de código de la derecha
    code: {
      role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
      yearsWord: { es: 'años', en: 'years' },
      delivers: { es: 'Soluciones de Software', en: 'End-to-end Software solutions' },
    },
    paragraphs: {
      es: [
        `Desarrollador Full Stack con más de ${yearsOfExperience()} años inmerso en la tecnología, enfocado en construir aplicaciones web completas, escalables y centradas en el usuario. Me muevo con soltura en todo el ciclo de desarrollo: desde interfaces pulidas en React hasta APIs robustas y el modelado de bases de datos.`,
        'Combino criterio técnico con mentalidad de producto: priorizo el código limpio, la resolución de problemas reales y la entrega de valor en equipos ágiles. Autodidacta por naturaleza, aprendo rápido y disfruto los retos que me empujan más allá de lo conocido.',
      ],
      en: [
        `Full Stack developer with ${yearsOfExperience()}+ years immersed in technology, focused on building complete, scalable and user-centered web applications. I move comfortably across the entire development cycle: from polished React interfaces to robust APIs and database modeling.`,
        'I blend technical judgment with a product mindset: I prioritize clean code, solving real problems and delivering value in agile teams. A natural self-learner, I pick things up fast and enjoy challenges that push me beyond the familiar.',
      ],
    },
    stats: [
      { value: `${yearsOfExperience()}+`, label: { es: 'Años en tecnología', en: 'Years in tech' } },
      { value: '15+', label: { es: 'Tecnologías', en: 'Technologies' } },
      { value: '∞', label: { es: 'Ganas de aprender', en: 'Drive to learn' } },
    ],
  },

  skills: {
    title: { es: 'Habilidades', en: 'Skills' },
    kicker: { es: 'Lo que aporto', en: 'What I bring' },
    subtitle: {
      es: 'Estas son algunas de las herramientas y cualidades con las que trabajo a diario. Siempre dispuesto a aprender lo que tu proyecto necesite.',
      en: "These are some of the tools and qualities I work with every day. Always ready to learn whatever your project needs.",
    },
    hoverHint: {
      es: 'Pasa el mouse sobre cada área',
      en: 'Hover over each area',
    },
    techLabel: { es: 'Tecnologías', en: 'Tech' },
    // Núcleo del orbital
    core: { initial: 'E', label: { es: 'Áreas', en: 'Areas' } },
    // Nodos = áreas de trabajo (el "icon" coincide con techIcons.jsx)
    orbit: [
      {
        id: 'frontend',
        name: { es: 'Frontend', en: 'Frontend' },
        icon: 'area-frontend',
        description: { es: 'Interfaces rápidas, modernas y a medida', en: 'Fast, modern, custom interfaces' },
        tech: 'React · TypeScript · Tailwind',
      },
      {
        id: 'backend',
        name: { es: 'Backend', en: 'Backend' },
        icon: 'area-backend',
        description: { es: 'APIs y lógica de servidor escalable y segura', en: 'Scalable, secure APIs and server logic' },
        tech: 'NestJS · Node.js · Express · GraphQL',
      },
      {
        id: 'architecture',
        name: { es: 'Arquitectura', en: 'Architecture' },
        icon: 'area-architecture',
        description: { es: 'Bases de datos y estructura sólida para crecer', en: 'Databases and solid structure built to scale' },
        tech: 'PostgreSQL · MongoDB · GremlinDB · REST',
      },
      {
        id: 'devops',
        name: { es: 'DevOps', en: 'DevOps' },
        icon: 'area-devops',
        description: { es: 'Despliegue continuo y apps siempre en línea', en: 'Continuous deployment, always online' },
        tech: 'AWS · Docker · Git · CI/CD',
      },
      {
        id: 'uiux',
        name: { es: 'UI/UX', en: 'UI/UX' },
        icon: 'area-uiux',
        description: { es: 'Diseño cuidado que enamora y convierte', en: 'Polished design that delights and converts' },
        tech: 'Diseño responsivo · Figma · Accesibilidad',
      },
    ],
    // Habilidades blandas (bilingües)
    soft: {
      title: { es: 'Habilidades blandas', en: 'Soft skills' },
      items: [
        { es: 'Trabajo en equipo', en: 'Teamwork', icon: 'teamwork' },
        { es: 'Comunicación clara', en: 'Clear communication', icon: 'communication' },
        { es: 'Resolución de problemas', en: 'Problem solving', icon: 'problemSolving' },
        { es: 'Adaptabilidad', en: 'Adaptability', icon: 'adaptability' },
        { es: 'Aprendizaje continuo', en: 'Continuous learning', icon: 'selfLearning' },
      ],
    },
  },

  experience: {
    title: { es: 'Experiencia', en: 'Experience' },
    kicker: { es: 'Mi trayectoria', en: 'My journey' },
    items: [
      {
        role: { es: 'Full Stack Engineer', en: 'Full Stack Engineer' },
        company: { es: 'Celteeka Software', en: 'Celteeka Software' },
        location: { es: 'Estados Unidos · Remoto', en: 'United States · Remote' },
        period: { es: 'Sep 2021 — Actualidad', en: 'Sep 2021 — Present' },
        description: {
          es: 'Desarrollador full stack con enfoque especializado en back-end. Construyo aplicaciones escalables y robustas con tecnologías como NestJS, MongoDB, GremlinDB y AWS.',
          en: 'Full stack developer with a specialized back-end focus. I build scalable, robust applications with technologies such as NestJS, MongoDB, GremlinDB and AWS.',
        },
        tech: ['NestJS', 'Node.js', 'TypeScript', 'MongoDB', 'GremlinDB', 'AWS'],
      },
      {
        role: { es: 'Desarrollador Freelance', en: 'Freelance Developer' },
        company: { es: 'Autónomo', en: 'Self-employed' },
        location: { es: 'Bogotá, Colombia', en: 'Bogotá, Colombia' },
        period: { es: 'Ago 2020 — Actualidad', en: 'Aug 2020 — Present' },
        description: {
          es: 'Desarrollo de aplicaciones web a medida para distintos clientes, del frontend al backend, cuidando el rendimiento y la experiencia de usuario.',
          en: 'Custom web application development for various clients, from frontend to backend, with a focus on performance and user experience.',
        },
        tech: ['JavaScript', 'React', 'Redux', 'Node.js', 'HTML', 'CSS'],
      },
      {
        role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
        company: { es: 'M2Coin', en: 'M2Coin' },
        location: { es: 'México · Remoto', en: 'Mexico · Remote' },
        period: { es: 'May 2021 — Sep 2021', en: 'May 2021 — Sep 2021' },
        description: {
          es: 'E-commerce web desarrollado bajo metodología ágil Scrum. Incluyó CRUD, autenticación, catálogo y checkout, validación de identidad (KYC Veriff), pasarela de pagos (Stripe), AWS (base de datos y S3), Google Maps, multilenguaje, firma de contratos (HelloSign), emails transaccionales y diseño responsive.',
          en: 'Web e-commerce built with agile Scrum methodology. It included CRUD, authentication, catalog and checkout, identity verification (KYC Veriff), payment gateway (Stripe), AWS (database and S3), Google Maps, multi-language, contract signing (HelloSign), transactional emails and responsive design.',
        },
        tech: ['React', 'Redux', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'Stripe', 'AWS', 'Bootstrap', 'Bitbucket'],
      },
    ],
  },

  education: {
    title: { es: 'Educación', en: 'Education' },
    kicker: { es: 'Formación', en: 'Background' },
    items: [
      {
        degree: { es: 'Ingeniería en Sistemas de Información', en: 'Information Systems Engineering' },
        school: 'Universidad Tecnológica Nacional',
        period: '2020 — Actualidad',
        status: { es: 'En curso', en: 'In progress' },
        link: 'https://www.frc.utn.edu.ar/',
      },
      {
        degree: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
        school: 'Soy Henry',
        period: '6 meses',
        status: { es: 'Completado', en: 'Completed' },
        link: 'https://www.soyhenry.com/',
      },
      {
        degree: { es: 'Técnico en Programación de Software', en: 'Software Programming Technician' },
        school: 'SENA',
        period: '2 años',
        status: { es: 'Completado', en: 'Completed' },
        link: 'https://www.sena.edu.co/',
      },
      {
        degree: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
        school: 'Universidad de los Llanos',
        period: '2 semestres',
        status: { es: 'Cursado', en: 'Coursework' },
        link: 'https://www.unillanos.edu.co/',
      },
    ],
  },

  contact: {
    title: { es: 'Hablemos', en: "Let's talk" },
    kicker: { es: 'Contacto', en: 'Contact' },
    intro: {
      es: '¿Tienes un proyecto en mente o una vacante? Escríbeme por el formulario o por cualquiera de mis canales. Respondo rápido.',
      en: 'Got a project in mind or a position open? Reach out via the form or any of my channels. I reply fast.',
    },
    form: {
      name: { es: 'Tu nombre', en: 'Your name' },
      email: { es: 'Tu correo', en: 'Your email' },
      message: { es: 'Tu mensaje', en: 'Your message' },
      send: { es: 'Enviar mensaje', en: 'Send message' },
      sending: { es: 'Enviando...', en: 'Sending...' },
      success: { es: '¡Mensaje enviado! Te responderé pronto.', en: 'Message sent! I will get back to you soon.' },
      error: { es: 'Algo falló. Escríbeme directo al correo.', en: 'Something failed. Email me directly.' },
    },
  },

  footer: {
    rights: { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },
    builtWith: { es: 'Hecho con React, Tailwind y Framer Motion.', en: 'Built with React, Tailwind and Framer Motion.' },
  },
}

// =============================================================
//  CONFIGURACIÓN DE EMAILJS  (formulario de contacto)
//  1. Crea cuenta gratis en https://www.emailjs.com/
//  2. Reemplaza estos 3 valores con los de tu cuenta.
// =============================================================
export const emailjsConfig = {
  serviceId: 'service_1mqybsu',
  templateId: 'template_pfys746',
  publicKey: 'CQFrVYFli6ocE6pyB',
}
