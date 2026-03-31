// Interactive Terms JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get all interactive terms
  const interactiveTerms = document.querySelectorAll('.interactive-term');
  
  // Add event listeners for each term
  interactiveTerms.forEach(term => {
    // Mouse enter - show tooltip
    term.addEventListener('mouseenter', function() {
      const tooltip = this.querySelector('.term-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
      }
    });
    
    // Mouse leave - hide tooltip
    term.addEventListener('mouseleave', function() {
      const tooltip = this.querySelector('.term-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
      }
    });
    
    // Click - toggle tooltip (for mobile devices)
    term.addEventListener('click', function(e) {
      e.preventDefault();
      const tooltip = this.querySelector('.term-tooltip');
      if (tooltip) {
        if (tooltip.style.visibility === 'visible') {
          tooltip.style.opacity = '0';
          tooltip.style.visibility = 'hidden';
          tooltip.style.transform = 'translateX(-50%) translateY(0)';
        } else {
          tooltip.style.opacity = '1';
          tooltip.style.visibility = 'visible';
          tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
        }
      }
    });
  });
  
  // Close tooltips when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.interactive-term')) {
      const tooltips = document.querySelectorAll('.term-tooltip');
      tooltips.forEach(tooltip => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
      });
    }
  });
  
  // Add animation to elements when they enter viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
});