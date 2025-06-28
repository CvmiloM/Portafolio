// src/App.jsx - PARTE 1 DE 2

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// --- INICIO: IMPORTACIONES DE ICONOS ---
import {
  FaGithub, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaJava,
  FaNpm, FaGitAlt, FaTerminal, FaCodeBranch, FaCogs, FaFigma, FaPaperPlane, FaLinkedin, FaPython
} from 'react-icons/fa';
import {
  SiPostgresql, SiExpress, SiAngular, SiIonic, SiTypescript, SiOracle,
  SiFirebase, SiMapbox, SiFlask, SiTailwindcss
} from 'react-icons/si';
// --- FIN: IMPORTACIONES DE ICONOS ---
import TiltCard from './components/TiltCard';
import TypewriterEffect from './components/TypewriterEffect';
import TerminalDisplay from './components/TerminalDisplay';
import { motion } from 'framer-motion';

const techIconMap = {
  'HTML5': <FaHtml5 size={20} color="#E34F26" />, 'CSS3': <FaCss3Alt size={20} color="#1572B6" />,
  'JavaScript': <FaJs size={20} color="#F7DF1E" />, 'TypeScript': <SiTypescript size={20} color="#3178C6" />,
  'React.js': <FaReact size={20} color="#61DAFB" />, 'Angular': <SiAngular size={20} color="#DD0031" />,
  'Ionic Angular': <SiIonic size={20} color="#3880FF" />, 'Node.js': <FaNodeJs size={20} color="#339933" />,
  'Express.js': <SiExpress size={20} color="#000000" />, 'Java': <FaJava size={20} color="#007396" />,
  'PostgreSQL': <SiPostgresql size={20} color="#336791" />, 'Oracle DB': <SiOracle size={50} color="#F80000" />,
  'Git': <FaGitAlt size={20} color="#F05032" />, 'GitHub': <FaGithub size={20} color="#181717" />,
  'npm': <FaNpm size={20} color="#CB3837" />, 'Figma': <FaFigma size={50} color="#F24E1E" />,
  'Firebase': <SiFirebase size={20} color="#FFCA28" />, 'Mapbox': <SiMapbox size={20} color="#8A2BE2" />,
  'Capacitor Geolocation': <FaCogs size={20} color="#444" />, 'Python': <FaPython size={20} color="#3776AB" />,
  'Flask': <SiFlask size={20} color="#000000" />, 'Tailwind CSS': <SiTailwindcss size={20} color="#06B6D4" />,
};

const formatRelativeDate = (dateString) => {
  const date = new Date(dateString); const now = new Date(); const diffMilliseconds = Math.abs(now.getTime() - date.getTime());
  const diffSeconds = Math.floor(diffMilliseconds / 1000); const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60); const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30.44); const diffYears = Math.floor(diffDays / 365.25);
  if (diffYears > 0) { return `hace ${diffYears} año${diffYears === 1 ? '' : 's'}`; }
  else if (diffMonths > 0) { return `hace ${diffMonths} mes${diffMonths === 1 ? '' : 'es'}`; }
  else if (diffDays > 0) { return `hace ${diffDays} día${diffDays === 1 ? '' : 's'}`; }
  else if (diffHours > 0) { return `hace ${diffHours} hora${diffHours === 1 ? '' : 's'}`; }
  else if (diffMinutes > 0) { return `hace ${diffMinutes} minuto${diffMinutes === 1 ? '' : 's'}`; }
  else { return `hace unos segundos`; }
};

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);

  const technologiesData = [
    { category: 'Desarrollo Frontend', items: [{ name: 'HTML5', icon: <FaHtml5 size={50} color="#E34F26" /> }, { name: 'CSS3', icon: <FaCss3Alt size={50} color="#1572B6" /> }, { name: 'JavaScript', icon: <FaJs size={50} color="#F7DF1E" /> }, { name: 'TypeScript', icon: <SiTypescript size={50} color="#3178C6" /> }, { name: 'React.js', icon: <FaReact size={50} color="#61DAFB" /> }, { name: 'Angular', icon: <SiAngular size={50} color="#DD0031" /> }, { name: 'Ionic Angular', icon: <SiIonic size={50} color="#3880FF" /> }, ], },
    { category: 'Desarrollo Backend', items: [{ name: 'Node.js', icon: <FaNodeJs size={50} color="#339933" /> }, { name: 'Express.js', icon: <SiExpress size={50} color="#000000" /> }, { name: 'Java', icon: <FaJava size={50} color="#007396" /> }, { name: 'Python', icon: <FaPython size={50} color="#3776AB" /> }, { name: 'Flask', icon: <SiFlask size={50} color="#000000" /> }, ], },
    { category: 'Bases de Datos', items: [{ name: 'PostgreSQL', icon: <SiPostgresql size={50} color="#336791" /> }, { name: 'Oracle DB', icon: <SiOracle size={50} color="#F80000" /> }, ], },
    { category: 'Herramientas y Otros', items: [{ name: 'Git', icon: <FaGitAlt size={50} color="#F05032" /> }, { name: 'GitHub', icon: <FaGithub size={50} color="#181717" /> }, { name: 'Figma', icon: <FaFigma size={50} color="#F24E1E" /> }, { name: 'Tailwind CSS', icon: <SiTailwindcss size={50} color="#06B6D4" /> }, ], },
  ];

// COPIA ESTE BLOQUE COMPLETO EN TU App.jsx
// LUEGO, EN TU SIGUIENTE MENSAJE, PIDE LA "SEGUNDA PARTE DE App.jsx"
// src/App.jsx - PARTE 2 DE 2 (Asegúrate de pegar esto después de la PARTE 1)

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los proyectos del backend:', err);
      setError(true);
      setLoading(false);
    }
  };
  fetchProjects();
}, []);

const handleContactChange = (e) => {
  const { name, value } = e.target;
  setContactForm({ ...contactForm, [name]: value });
};

const handleContactSubmit = async (e) => {
  e.preventDefault();
  setContactStatus('loading');
  try {
    const response = await axios.post('http://localhost:5001/api/contact', contactForm);
    setContactStatus('success');
    setContactForm({ name: '', email: '', message: '' });
    console.log(response.data.message);
  } catch (err) {
    setContactStatus('error');
    console.error('Error al enviar el mensaje de contacto:', err.response ? err.response.data.message : err.message);
  }
};

return (
  <div className="portfolio-container">
    <header className="portfolio-header">
      <h1 className="developer-name">Camilo Monge - Developer</h1>
      <nav className="main-nav">
        <ul>
          <li><a href="#tecnologias">Tecnologías</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#sobre-mi">Sobre Mí</a></li>
        </ul>
      </nav>
    </header>

    <main className="portfolio-content">
      <section className="hero-section">
        <div className="hero-content-left">
          <p className="greeting-text">Hola, soy</p>
          <h2 className="hero-name">Camilo Monge</h2>
          <h3 className="hero-title">
            Un <TypewriterEffect phrases={["Developer", "Programador", "Full-Stack Developer", "Creador"]} />
          </h3>
          <p className="hero-description">
            Apasionado por transformar ideas en soluciones digitales robustas y atractivas.
            Construyo experiencias de usuario cautivadoras y sistemas backend eficientes.
          </p>
          <div className="hero-buttons">
            <a href="#proyectos" className="hero-button primary">Ver Proyectos</a>
            <a href="#contacto" className="hero-button secondary">Contáctame</a>
          </div>
        </div>
        <div className="hero-content-right">
          <TerminalDisplay />
        </div>
      </section>

      <section id="tecnologias" className="section tecnologias-section">
        <h2>Tecnologías</h2>
        <div className="section-content">
          {technologiesData.map((category, catIndex) => (
            <div key={catIndex} className="tech-category">
              <h3>{category.category}</h3>
              <div className="technologies-grid">
                {category.items.map((tech, techIndex) => (
                  <TiltCard key={techIndex}>
                    <div className="tech-card-content">
                      {tech.icon}
                      <p>{tech.name}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos" className="section proyectos-section">
        <h2>Proyectos</h2>
        <div className="section-content">
          {loading && <p className="loading-message">Cargando proyectos...</p>}
          {error && <p className="error-message">No se pudieron cargar los proyectos. Intenta de nuevo más tarde.</p>}
          {!loading && !error && projects.length === 0 && (
            <p className="no-projects-message">No hay proyectos aún. ¡Crea uno en el backend!</p>
          )}
          <div className="projects-grid">
            {!loading && !error && projects.length > 0 && (
              projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.technologies && (
                    <div className="project-technologies-icons">
                      <strong>Tecnologías:</strong>
                      {project.technologies.split(',').map((techName, i) => {
                        const trimmedTechName = techName.trim();
                        const iconComponent = techIconMap[trimmedTechName];
                        return iconComponent ? (
                          <span key={i} className="tech-icon-item">
                            {iconComponent}
                          </span>
                        ) : (
                          <span key={i} className="tech-icon-item">{trimmedTechName}</span>
                        );
                      })}
                    </div>
                  )}
                  <div className="project-links">
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                        <FaGithub size={20} /> GitHub
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="project-link">
                        Ver Demo
                      </a>
                    )}
                  </div>
                  <small className="project-date">Creado {formatRelativeDate(project.created_at)}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="contacto" className="section contacto-section">
        <h2>Contacto</h2>
        <div className="section-content">
          <p className="contact-intro">¿Interesado en mi trabajo? ¡Envíame un mensaje!</p>
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" value={contactForm.name} onChange={handleContactChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={contactForm.email} onChange={handleContactChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea id="message" name="message" value={contactForm.message} onChange={handleContactChange} rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-button" disabled={contactStatus === 'loading'}>
              {contactStatus === 'loading' ? 'Enviando...' : (<>Enviar Mensaje <FaPaperPlane size={16} /></>)}
            </button>
            {contactStatus === 'success' && <p className="contact-status success-message">¡Mensaje enviado con éxito! Te contactaré pronto.</p>}
            {contactStatus === 'error' && <p className="contact-status error-message">Error al enviar el mensaje. Por favor, intenta de nuevo.</p>}
          </form>
        </div>
      </section>

      <motion.section
        id="sobre-mi"
        className="section sobre-mi-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h2>Sobre Mí</h2>
        <div className="section-content">
          <p>Soy Camilo Monge, un desarrollador apasionado por crear soluciones web innovadoras y funcionales. Mi enfoque principal es el desarrollo full-stack, combinando la versatilidad de React para interfaces de usuario dinámicas con la robustez de Node.js y PostgreSQL para el backend. Estoy constantemente aprendiendo y buscando nuevos desafíos para aplicar mis habilidades y crecer profesionalmente.</p>
          <p>Actualmente estoy cursando el <strong>3er año de Ingeniería en Informática en Duoc UC</strong>, donde he profundizado mis conocimientos en desarrollo de software, análisis de datos y planificación de requerimientos.</p>
          <p>Si buscas a alguien proactivo y dedicado para tu equipo o proyecto, ¡no dudes en contactarme!</p>
        </div>
      </motion.section>
    </main>

    <footer className="portfolio-footer">
      <p>&copy; {new Date().getFullYear()} Camilo Monge. Todos los derechos reservados.</p>
      <div className="social-links">
        <a href="https://github.com/CvmiloM" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub size={30} color="white" />
        </a>
      </div>
    </footer>
  </div>
);
}

export default App;