/**
 * v1.0.3 Animation Utilities
 * Self-contained animation functions for this version
 */

/**
 * Split text into words for reveal animation
 * @param {HTMLElement} element - The element containing text
 */
function splitTextIntoWords(element) {
  const paragraphs = element.querySelectorAll('p');
  
  paragraphs.forEach(paragraph => {
    const text = paragraph.textContent;
    const words = text.split(' ');
    
    paragraph.innerHTML = words.map((word, index) => 
      `<span class="word" style="animation-delay: ${index * 0.08}s">${word}</span>`
    ).join(' ');
  });
}

/**
 * Initialize text reveal animation
 */
function initTextReveal() {
  const heroText = document.querySelector('.hero-text-reveal');
  if (heroText) {
    splitTextIntoWords(heroText);
    heroText.classList.add('text-reveal');
  }
}

/**
 * Initialize project archive slider functionality
 */
function initProjectArchiveSlider() {
  const slider = document.getElementById('archive-slider');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const indicators = document.querySelectorAll('.indicator');
  const archivePages = document.querySelectorAll('.archive-page');
  
  if (!slider || !prevBtn || !nextBtn || indicators.length === 0 || archivePages.length === 0) {
    return;
  }
  
  let currentIndex = 0;
  const totalPages = archivePages.length;
  
  /**
   * Update slider position
   */
  function updateSlider() {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalPages - 1;
  }
  
  /**
   * Go to specific slide
   * @param {number} index - Slide index
   */
  function goToSlide(index) {
    if (index < 0 || index >= totalPages) return;
    
    // Add exit animation to current page
    archivePages[currentIndex].classList.add('exiting');
    setTimeout(() => {
      archivePages[currentIndex].classList.remove('exiting');
    }, 800);
    
    currentIndex = index;
    updateSlider();
    
    // Add animation class to archive page
    archivePages.forEach((page, i) => {
      if (i === currentIndex) {
        page.classList.add('slide-in');
        setTimeout(() => {
          page.classList.remove('slide-in');
        }, 800);
      }
    });
  }
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
    }
  });
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  }
  
  // Initialize
  updateSlider();
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize archive page animations
 */
function initArchiveAnimations() {
  const archivePages = document.querySelectorAll('.archive-page');
  
  archivePages.forEach(page => {
    // Add hover effect to archive sections
    const sections = page.querySelectorAll('.archive-section');
    sections.forEach(section => {
      section.addEventListener('mouseenter', () => {
        section.style.transform = 'translateX(15px) scale(1.02)';
      });
      
      section.addEventListener('mouseleave', () => {
        section.style.transform = 'translateX(0) scale(1)';
      });
    });
    
    // Add hover effect to archive icon
    const icon = page.querySelector('.archive-icon');
    if (icon) {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.15) rotate(15deg)';
      });
      
      icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
      });
    }
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  initTextReveal();
  initProjectArchiveSlider();
  initScrollAnimations();
  initArchiveAnimations();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
