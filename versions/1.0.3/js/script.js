// Main Script File

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  });
  
  // Projects slider functionality
  const projectContainer = document.querySelector('.projects-container');
  if (projectContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    projectContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      projectContainer.classList.add('active');
      startX = e.pageX - projectContainer.offsetLeft;
      scrollLeft = projectContainer.scrollLeft;
    });
    
    projectContainer.addEventListener('mouseleave', () => {
      isDown = false;
      projectContainer.classList.remove('active');
    });
    
    projectContainer.addEventListener('mouseup', () => {
      isDown = false;
      projectContainer.classList.remove('active');
    });
    
    projectContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - projectContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      projectContainer.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Timeline scroll functionality
  const timeline = document.querySelector('.timeline-container');
  if (timeline) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    timeline.addEventListener('mousedown', (e) => {
      isDown = true;
      timeline.classList.add('active');
      startX = e.pageX - timeline.offsetLeft;
      scrollLeft = timeline.scrollLeft;
    });
    
    timeline.addEventListener('mouseleave', () => {
      isDown = false;
      timeline.classList.remove('active');
    });
    
    timeline.addEventListener('mouseup', () => {
      isDown = false;
      timeline.classList.remove('active');
    });
    
    timeline.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - timeline.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      timeline.scrollLeft = scrollLeft - walk;
    });
  }
});