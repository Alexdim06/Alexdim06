// Strapi API Configuration loaded from config.js
// STRAPI_URL and API_URL are defined in config.js

// Store all posts for filtering
let allPosts = [];
let currentCategory = 'all';

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Create blog post card HTML
function createPostCard(post, index) {
  const imageUrl = post.coverImageUrl || 
    (post.coverImage?.url ? `${STRAPI_URL}${post.coverImage.url}` : null) ||
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1280&auto=format&fit=crop';
  
  const delay = (index % 9) * 50; // Stagger animations
  
  return `
    <div class="col-12 col-md-6 col-lg-4 blog-post-card" data-category="${post.category}" data-aos="fade-up" data-aos-delay="${delay}">
      <a href="blog-post.html?slug=${post.slug}" class="text-decoration-none text-reset">
        <article class="card border-0 shadow-sm h-100 blog-card">
          <div class="blog-card-image-wrapper">
            <img src="${imageUrl}" class="card-img-top blog-card-image" alt="${post.title}">
            ${post.featured ? '<span class="badge bg-dark position-absolute top-0 end-0 m-3">Featured</span>' : ''}
          </div>
          <div class="card-body d-flex flex-column">
            <div class="mb-2">
              <span class="badge bg-light text-dark">${post.category}</span>
            </div>
            <h3 class="h5 mb-2 blog-card-title">${post.title}</h3>
            <p class="text-secondary small mb-3 flex-grow-1">${truncateText(post.excerpt, 120)}</p>
            <div class="d-flex justify-content-between align-items-center text-secondary small mt-auto">
              <span>${formatDate(post.publishedAt || post.createdAt)}</span>
              <span>${post.readTime} min read</span>
            </div>
          </div>
        </article>
      </a>
    </div>
  `;
}

// Load blog posts from Strapi
async function loadBlogPosts() {
  const container = document.getElementById('blogPostsContainer');
  const noPostsMessage = document.getElementById('noPostsMessage');
  
  try {
    const response = await fetch(`${API_URL}/blog-posts?populate=*&sort=publishedAt:desc`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allPosts = data.data;
    
    if (!allPosts || allPosts.length === 0) {
      container.innerHTML = '';
      noPostsMessage.classList.remove('d-none');
      return;
    }
    
    renderPosts(allPosts);
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center" role="alert">
          <h4 class="alert-heading">Unable to load blog posts</h4>
          <p>Please make sure Strapi is running on http://localhost:1337</p>
          <hr>
          <p class="mb-0">Run: <code>cd backend && npm run develop</code></p>
        </div>
      </div>
    `;
  }
}

// Render posts to the page
function renderPosts(posts) {
  const container = document.getElementById('blogPostsContainer');
  const noPostsMessage = document.getElementById('noPostsMessage');
  
  if (!posts || posts.length === 0) {
    container.innerHTML = '';
    noPostsMessage.classList.remove('d-none');
    return;
  }
  
  noPostsMessage.classList.add('d-none');
  container.innerHTML = posts.map((post, index) => createPostCard(post, index)).join('');
  
  // Reinitialize AOS for new elements
  if (window.AOS) {
    AOS.refresh();
  }
}

// Filter posts by category
function filterByCategory(category) {
  currentCategory = category;
  
  // Update active button
  document.querySelectorAll('#categoryFilters button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter posts
  if (category === 'all') {
    renderPosts(allPosts);
  } else {
    const filtered = allPosts.filter(post => post.category === category);
    renderPosts(filtered);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Init AOS
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80
    });
  }
  
  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Load blog posts
  loadBlogPosts();
  
  // Setup category filters
  document.querySelectorAll('#categoryFilters button').forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByCategory(category);
    });
  });
});

