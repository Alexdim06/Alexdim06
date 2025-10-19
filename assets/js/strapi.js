// Strapi API Configuration loaded from config.js
// STRAPI_URL and API_URL are defined in config.js

// Helper function to fetch data from Strapi
async function fetchFromStrapi(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}?populate=*&sort=order:asc`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Load Projects
async function loadProjects() {
  const container = document.querySelector('#projects .row');
  if (!container) return;

  const projects = await fetchFromStrapi('projects');
  if (!projects || projects.length === 0) {
    console.log('No projects found, using static content');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render projects
  projects.forEach((project, index) => {
    const imageUrl = project.imageUrl || project.image?.url 
      ? `${STRAPI_URL}${project.image.url}` 
      : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1280&auto=format&fit=crop';
    
    const link = project.link || '#';
    const delay = index * 100;

    const projectCard = `
      <div class="col-12 col-md-6" data-aos="zoom-in" data-aos-delay="${delay}">
        <a href="${link}" class="text-decoration-none text-reset">
          <div class="project-card card border-0 shadow-sm h-100 reveal-rotate">
            <img class="card-img-top" src="${imageUrl}" alt="${project.title}">
            <div class="card-body">
              <h3 class="h5 mb-2">${project.title}</h3>
              <p class="text-secondary mb-0">${project.description}</p>
            </div>
          </div>
        </a>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', projectCard);
  });

  // Reinitialize AOS for new elements
  if (window.AOS) {
    AOS.refresh();
  }
}

// Load Experience
async function loadExperience() {
  const container = document.querySelector('#experience .timeline');
  if (!container) return;

  const experiences = await fetchFromStrapi('experiences');
  if (!experiences || experiences.length === 0) {
    console.log('No experience found, using static content');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render experiences
  experiences.forEach((exp, index) => {
    const delay = index * 100;
    const companyText = exp.company ? ` — ${exp.company}` : '';

    const expItem = `
      <div class="timeline-item" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3 class="h5 mb-1">${exp.title}${companyText}</h3>
          <div class="text-secondary small mb-2">${exp.period}</div>
          <p class="mb-0">${exp.description}</p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', expItem);
  });

  // Reinitialize AOS
  if (window.AOS) {
    AOS.refresh();
  }
}

// Load Certificates
async function loadCertificates() {
  const container = document.querySelector('#certificates .row');
  if (!container) return;

  const certificates = await fetchFromStrapi('certificates');
  if (!certificates || certificates.length === 0) {
    console.log('No certificates found, using static content');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render certificates
  certificates.forEach((cert, index) => {
    const delay = index * 100;

    const certCard = `
      <div class="col-12 col-md-4" data-aos="flip-left" data-aos-delay="${delay}">
        <div class="card h-100 border-0 shadow-sm">
          <div class="card-body">
            <h3 class="h5">${cert.title}</h3>
            <p class="text-secondary mb-0">${cert.description}</p>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', certCard);
  });

  // Reinitialize AOS
  if (window.AOS) {
    AOS.refresh();
  }
}

// Load Skills
async function loadSkills() {
  const container = document.querySelector('#skills .row');
  if (!container) return;

  const skills = await fetchFromStrapi('skills');
  if (!skills || skills.length === 0) {
    console.log('No skills found, using static content');
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Render skills
  skills.forEach((skill, index) => {
    const delay = index * 50;

    const skillItem = `
      <div class="col-6 col-md-3" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="skill p-3 border rounded-4 h-100">${skill.name}</div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', skillItem);
  });

  // Reinitialize AOS
  if (window.AOS) {
    AOS.refresh();
  }
}

// Initialize all content on page load
document.addEventListener('DOMContentLoaded', async function() {
  // Add loading indicators
  const sections = ['#projects', '#experience', '#certificates', '#skills'];
  sections.forEach(selector => {
    const section = document.querySelector(`${selector} .row, ${selector} .timeline`);
    if (section) {
      section.classList.add('loading');
    }
  });

  // Load all content
  await Promise.all([
    loadProjects(),
    loadExperience(),
    loadCertificates(),
    loadSkills()
  ]);

  // Remove loading indicators
  sections.forEach(selector => {
    const section = document.querySelector(`${selector} .row, ${selector} .timeline`);
    if (section) {
      section.classList.remove('loading');
    }
  });
});

