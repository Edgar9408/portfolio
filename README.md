# Portafolio · Edgar Palma 2.0

Portafolio personal — Full Stack Developer. Tema oscuro, glassmorphism con acentos neón
y animaciones fluidas. Bilingüe (ES/EN).

## Stack

- **Vite** + **React 18**
- **Tailwind CSS** (tema dark personalizado, gradiente aurora)
- **Framer Motion** (animaciones de scroll, hover y layout)
- **react-icons** (iconos de tecnologías)
- **EmailJS** (formulario de contacto)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
npm run preview  # previsualiza el build
```

## ✏️ Cómo editar tu contenido

Casi todo vive en un solo archivo: [`src/data/content.js`](src/data/content.js).
Cada texto es bilingüe con el formato `{ es: "...", en: "..." }`.

- **Datos personales** (email, redes, CV): objeto `personal`.
- **Experiencia laboral**: `t.experience.items` — actualmente con **placeholders**,
  reemplázalos con tus empresas, roles, fechas y logros reales.
- **Proyectos**: `t.projects.items`.
- **Educación**: `t.education.items`.
- **Imágenes**: en `public/assets/img/`. El CV en `public/assets/cv/`.

### Activar el formulario de contacto (EmailJS)

1. Crea una cuenta gratis en https://www.emailjs.com/
2. Crea un *Service* y un *Template* (campos: `user_name`, `user_email`, `message`).
3. Pega tus credenciales en `emailjsConfig` dentro de `src/data/content.js`.

> Si no lo configuras, el formulario abre el cliente de correo del visitante como fallback.

## Deploy en Vercel

1. Sube este proyecto a un repo de GitHub.
2. En https://vercel.com importa el repo. Vercel detecta Vite automáticamente.
3. Build command: `npm run build` · Output: `dist`. ¡Listo!
