// ═══════════════════════════════════════════════════════════════════════════
// Azure App Service - Node.js Web Application
// ═══════════════════════════════════════════════════════════════════════════

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Port configuration - Azure App Service uses process.env.PORT
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────

// Home page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Azure Web App',
        environment: process.env.NODE_ENV || 'development',
        hostname: req.hostname,
        serverTime: new Date().toISOString()
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    });
});

// API endpoint
app.get('/api/info', (req, res) => {
    res.json({
        application: 'Azure Web App',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        platform: process.platform,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint (important for Azure App Service)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Readiness check
app.get('/ready', (req, res) => {
    res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString()
    });
});

// Contact form handler
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In production, you would save to database or send email
    console.log('Contact form submission:', { name, email, message });
    
    res.json({
        success: true,
        message: 'Thank you for your message!'
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Error handling
// ─────────────────────────────────────────────────────────────────────────────

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        error: {
            status: 404,
            message: 'The page you are looking for does not exist.'
        }
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).render('error', {
        title: 'Error',
        error: {
            status: err.status || 500,
            message: process.env.NODE_ENV === 'production' 
                ? 'Something went wrong' 
                : err.message
        }
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║         Azure Web Application Started                      ║
    ╠═══════════════════════════════════════════════════════════╣
    ║  🚀 Server running on port: ${PORT}                          ║
    ║  🌍 Environment: ${(process.env.NODE_ENV || 'development').padEnd(15)}                  ║
    ║  📅 Started at: ${new Date().toISOString()}      ║
    ╚═══════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
