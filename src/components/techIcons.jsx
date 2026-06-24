import {
  SiReact, SiRedux, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiGraphql,
  SiApollographql, SiPostgresql, SiMongodb, SiMysql, SiSequelize,
  SiGit, SiGithub, SiTrello, SiPostman,
} from 'react-icons/si'
import { FaJava, FaServer, FaUsers, FaComments, FaLightbulb, FaSyncAlt, FaBookOpen, FaSitemap, FaInfinity } from 'react-icons/fa'
import { FiLayout, FiServer, FiPenTool } from 'react-icons/fi'

// Mapa nombre de tecnología -> { icon, color }
const map = {
  React: { icon: SiReact, color: '#61DAFB' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  Tailwind: { icon: SiTailwindcss, color: '#38BDF8' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  Express: { icon: SiExpress, color: '#cbd5e1' },
  GraphQL: { icon: SiGraphql, color: '#E10098' },
  Apollo: { icon: SiApollographql, color: '#311C87' },
  'REST APIs': { icon: FaServer, color: '#22d3ee' },
  Java: { icon: FaJava, color: '#E76F00' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Sequelize: { icon: SiSequelize, color: '#52B0E7' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: '#cbd5e1' },
  Scrum: { icon: FaUsers, color: '#a855f7' },
  Trello: { icon: SiTrello, color: '#0079BF' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  // Habilidades blandas (color unificado para distinguirlas de las marcas)
  teamwork: { icon: FaUsers, color: '#c084fc' },
  communication: { icon: FaComments, color: '#c084fc' },
  problemSolving: { icon: FaLightbulb, color: '#c084fc' },
  adaptability: { icon: FaSyncAlt, color: '#c084fc' },
  selfLearning: { icon: FaBookOpen, color: '#c084fc' },
  // Áreas de trabajo (orbital de Skills)
  'area-frontend': { icon: FiLayout, color: '#22d3ee' },
  'area-backend': { icon: FiServer, color: '#a855f7' },
  'area-architecture': { icon: FaSitemap, color: '#ec4899' },
  'area-devops': { icon: FaInfinity, color: '#38bdf8' },
  'area-uiux': { icon: FiPenTool, color: '#34d399' },
}

export default function TechIcon({ name, size = 18 }) {
  const entry = map[name] || { icon: FaServer, color: '#94a3b8' }
  const Icon = entry.icon
  return <Icon size={size} style={{ color: entry.color }} />
}

export { map as techMap }
