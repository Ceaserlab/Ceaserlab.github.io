/**
 * Theme Manager for Version 1.0.2
 */

const themes = {
  dark: {
    '--color-text': '#ffffff',
    '--color-text-secondary': '#b3b3b3',
    '--color-background': '#121212',
    '--color-surface': '#1e1e1e',
    '--color-primary': '#00a67e',
    '--color-primary-hover': '#008a67',
    '--color-border': '#333333',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  light: {
    '--color-text': '#121212',
    '--color-text-secondary': '#666666',
    '--color-background': '#ffffff',
    '--color-surface': '#f8f9fa',
    '--color-primary': '#00a67e',
    '--color-primary-hover': '#008a67',
    '--color-border': '#e0e0e0',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};

const themeManager = {
  getTheme() {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.applyTheme(theme);
    this.updateThemeIcon();
  },

  applyTheme(theme) {
    const themeColors = themes[theme];
    if (themeColors) {
      Object.entries(themeColors).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
    }
  },

  toggle() {
    const current = this.getTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  updateThemeIcon() {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const theme = this.getTheme();

    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }
  }
};

// Initialize theme on load
themeManager.applyTheme(themeManager.getTheme());

export { themeManager };