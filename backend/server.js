// server.js en la carpeta 'backend'

// Importa las librerías necesarias
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importa Pool de la librería pg
const nodemailer = require('nodemailer'); // Importa Nodemailer

// Inicializa la aplicación Express
const app = express();
const port = process.env.PORT || 5001; // El puerto de tu servidor, usa 5001 por defecto

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { // <-- AÑADIDO: Configuración SSL para Render
    rejectUnauthorized: false // Permite conexiones SSL incluso si el certificado no es verificado
  }
});

// Configuración del transportador de correo con Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Usamos el servicio de Gmail
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo de Gmail desde .env
    pass: process.env.EMAIL_PASS, // ¡Tu contraseña de aplicación de Gmail desde .env!
  },
});


// Middlewares (funciones que se ejecutan antes de que lleguen a tus rutas)
app.use(cors()); // Permite peticiones desde el frontend (importante para desarrollo)
app.use(express.json()); // Permite que Express lea JSON en las peticiones (ej: cuando el frontend envía datos)

// --- RUTAS DE LA API ---

// Ruta de prueba inicial
app.get('/', (req, res) => {
  console.log('DEBUG: Petición recibida en /');
  res.send('¡Hola desde el Backend de tu portafolio!');
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/db-test', async (req, res) => {
  console.log('DEBUG: Petición recibida en /db-test');
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    res.json({
      message: 'Conexión a la base de datos exitosa!',
      currentTime: result.rows[0].current_time,
    });
    console.log('DEBUG: /db-test exitoso.');
  } catch (err) {
    console.error('ERROR en /db-test:', err);
    res.status(500).json({ message: 'Error al conectar a la base de datos', error: err.message });
  }
});

// Ruta para OBTENER TODOS los proyectos del portafolio
app.get('/api/projects', async (req, res) => {
  console.log('DEBUG: Petición recibida en /api/projects');
  try {
    const client = await pool.connect();
    console.log('DEBUG: Cliente de DB conectado para /api/projects');
    const result = await client.query('SELECT id, title, description, technologies, github_link, live_link, image_url, created_at FROM projects ORDER BY created_at DESC');
    client.release();
    console.log('DEBUG: Consulta de proyectos exitosa. Filas encontradas:', result.rows.length);
    res.json(result.rows);
    console.log('DEBUG: Proyectos enviados como respuesta.');
  } catch (err) {
    console.error('ERROR CRÍTICO al obtener los posts en /api/projects:', err);
    res.status(500).json({ message: 'Error interno del servidor al obtener los proyectos.', error: err.message });
  }
});

// Ruta para CREAR un nuevo proyecto en el portafolio
app.post('/api/projects', async (req, res) => {
  console.log('DEBUG: Petición POST recibida en /api/projects');
  const { title, description, technologies, github_link, live_link, image_url } = req.body;

  if (!title || !description) {
    console.log('DEBUG: Validación fallida en POST /api/projects (faltan datos)');
    return res.status(400).json({ message: 'Título y descripción son campos obligatorios para un proyecto.' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO projects (title, description, technologies, github_link, live_link, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, technologies, github_link, live_link, image_url]
    );
    client.release();
    console.log('DEBUG: Proyecto creado con ID:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('ERROR CRÍTICO al crear el proyecto en POST /api/projects:', err);
    res.status(500).json({ message: 'Error interno del servidor al crear el proyecto.', error: err.message });
  }
});

// Envío de formulario de contacto
app.post('/api/contact', async (req, res) => {
  console.log('DEBUG: Petición POST recibida en /api/contact');
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('DEBUG: Validación fallida en POST /api/contact (faltan datos)');
    return res.status(400).json({ message: 'Nombre, Email y Mensaje son obligatorios.' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de portafolio de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('DEBUG: Email de contacto enviado con éxito.');
    res.status(200).json({ message: 'Mensaje enviado con éxito. ¡Gracias!' });
  } catch (error) {
    console.error('ERROR al enviar el email de contacto:', error);
    res.status(500).json({ message: 'Error al enviar el mensaje. Intenta de nuevo más tarde.' });
  }
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor de backend ejecutándose en http://localhost:${port}`);
  console.log('Intentando conectar a la base de datos...');
  pool.connect()
    .then(() => console.log('Conexión inicial a PostgreSQL exitosa!'))
    .catch(err => console.error('Error en la conexión inicial a PostgreSQL:', err.message));
});