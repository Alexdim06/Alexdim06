// API Configuration
// This file manages the Strapi API URL for both development and production

// Determine the API URL based on environment
function getStrapiURL() {
  // Check if we're in production (GitHub Pages or any deployed site)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  
  if (isProduction) {
    // PRODUCTION: Replace this with your deployed Strapi URL
    // After deploying Strapi to Railway/Render/etc, update this URL
    return 'https://your-strapi-backend.up.railway.app';
    
    // Examples:
    // Railway: 'https://your-app.up.railway.app'
    // Render: 'https://your-app.onrender.com'
    // Heroku: 'https://your-app.herokuapp.com'
    // Custom domain: 'https://api.yourdomain.com'
  } else {
    // DEVELOPMENT: Use local Strapi
    return 'http://localhost:1337';
  }
}

// Export the configuration
const STRAPI_URL = getStrapiURL();
const API_URL = `${STRAPI_URL}/api`;

console.log('🚀 API URL:', API_URL);

