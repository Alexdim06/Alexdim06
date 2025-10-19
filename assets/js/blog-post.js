// Strapi API Configuration loaded from config.js
// STRAPI_URL and API_URL are defined in config.js

// Get slug from URL
function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug');
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Convert markdown-style content to HTML (basic converter)
function convertToHTML(content) {
  if (!content) return '';
  
  // Handle Strapi rich text format
  if (Array.isArray(content)) {
    return content.map(block => {
      if (block.type === 'paragraph') {
        return `<p>${block.children.map(child => child.text).join('')}</p>`;
      }
      if (block.type === 'heading') {
        const level = block.level || 2;
        return `<h${level}>${block.children.map(child => child.text).join('')}</h${level}>`;
      }
      return '';
    }).join('');
  }
  
  // If it's a string, do basic markdown conversion
  let html = content;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  
  // Wrap in paragraphs if not already
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }
  
  return html;
}

// Load and display blog post
async function loadBlogPost() {
  const slug = getSlugFromURL();
  
  if (!slug) {
    showError();
    return;
  }
  
  const loadingState = document.getElementById('loadingState');
  const blogPostContent = document.getElementById('blogPostContent');
  const errorState = document.getElementById('errorState');
  
  try {
    const response = await fetch(`${API_URL}/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      showError();
      return;
    }
    
    const post = data.data[0];
    displayPost(post);
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    showError();
  }
}

// Increment view count
async function incrementViewCount(slug) {
  try {
    await fetch(`${API_URL}/blog-posts/${slug}/view`, {
      method: 'POST',
    });
  } catch (error) {
    console.log('Could not increment view count:', error);
    // Fail silently - not critical
  }
}

// Display the blog post
function displayPost(post) {
  // Hide loading, show content
  document.getElementById('loadingState').classList.add('d-none');
  document.getElementById('blogPostContent').classList.remove('d-none');
  
  // Increment view count (async, don't wait)
  incrementViewCount(post.slug);
  
  // Update page title and meta
  document.getElementById('pageTitle').textContent = `${post.title} — Alexander Dimitrov`;
  document.getElementById('pageDescription').content = post.excerpt;
  
  // Category badge
  document.getElementById('categoryBadge').innerHTML = 
    `<span class="badge bg-light text-dark">${post.category}</span>`;
  
  // Title
  document.getElementById('postTitle').textContent = post.title;
  
  // Meta info
  document.getElementById('postAuthor').textContent = post.author || 'Alexander Dimitrov';
  document.getElementById('postDate').textContent = formatDate(post.publishedAt || post.createdAt);
  document.getElementById('postReadTime').textContent = `${post.readTime || 5} min read`;
  
  // Cover image
  const coverImageUrl = post.coverImageUrl || 
    (post.coverImage?.url ? `${STRAPI_URL}${post.coverImage.url}` : null);
  
  if (coverImageUrl) {
    const coverImageContainer = document.getElementById('coverImageContainer');
    const coverImage = document.getElementById('coverImage');
    coverImage.src = coverImageUrl;
    coverImage.alt = post.title;
    coverImageContainer.classList.remove('d-none');
  }
  
  // Content
  const contentHTML = convertToHTML(post.content);
  document.getElementById('postContent').innerHTML = contentHTML;
  
  // Tags
  if (post.tags && post.tags.length > 0) {
    const tagsContainer = document.getElementById('tagsContainer');
    const postTags = document.getElementById('postTags');
    
    const tagsHTML = post.tags.map(tag => 
      `<span class="badge bg-light text-dark">${tag}</span>`
    ).join('');
    
    postTags.innerHTML = tagsHTML;
    tagsContainer.classList.remove('d-none');
  }
  
  // Views
  document.getElementById('postViews').textContent = `${post.views || 0} views`;
  
  // Initialize AOS
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quart',
      once: true,
      offset: 80
    });
  }
}

// Show error state
function showError() {
  document.getElementById('loadingState').classList.add('d-none');
  document.getElementById('errorState').classList.remove('d-none');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Load the blog post
  loadBlogPost();
});

