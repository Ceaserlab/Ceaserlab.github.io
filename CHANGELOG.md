# Changelog

All notable changes to ceaserzhao website will be documented in this file.

## [Unreleased] - 2026-01-24

### Added
- History page:
  - `history.html` - Version history page
  - `src/pages/history/history.css` - History page styles
  - `src/pages/history/history.js` - History page logic with version selector
- Home page:
  - `index.html` - Main entry page
  - `src/pages/home/home.css` - Home page styles
  - `src/pages/home/home.js` - Home page logic
  - `assets/images/avatar/default.png` - Placeholder avatar
- UI Components:
  - `src/components/navbar/navbar.html` - Navigation bar structure
  - `src/components/navbar/navbar.css` - Navigation bar styles
  - `src/components/navbar/navbar.js` - Navigation bar logic with language and theme switching
- Core JavaScript modules:
  - `src/core/storage/storage.js` - Local storage utilities
  - `src/core/theme/theme-manager.js` - Theme management system
  - `src/core/i18n/i18n.js` - Internationalization manager
- Language files for 5 languages:
  - `locales/en.json` - English (complete)
  - `locales/zh.json` - Chinese (complete)
  - `locales/es.json` - Spanish (complete)
  - `locales/hi.json` - Hindi (complete)
  - `locales/ar.json` - Arabic (complete)
- Git repository initialization with remote origin
- `members/` directory for individual member pages
- `.gitignore` file

### Changed
- Navbar: "History" link now includes SVG icon
- Motto section: removed title, kept only content
- Gallery: replaced grid layout with interactive floating node map with:
  - Draggable pan
  - Zoom controls (scroll + buttons)
  - Water wave floating animations for nodes
  - SVG connections between nodes
  - Image preview modal

## [Unreleased] - 2026-01-23

### Added
- Initial project structure with modular architecture
- Configuration system:
  - `src/config/site.config.js` - Site configuration
  - `src/config/i18n.config.js` - Internationalization configuration
  - `src/config/theme.config.js` - Theme configuration
  - `src/config/version.config.js` - Version history configuration
- Global styles:
  - `src/styles/variables.css` - CSS variables and theme system
  - `src/styles/base.css` - Base styles and reset
  - `src/styles/layout.css` - Layout utilities
  - `src/styles/utilities.css` - Utility classes
- Directory structure:
  - `src/pages/` - Page modules (home, history)
  - `src/components/` - Reusable components
  - `src/core/` - Core framework modules
  - `src/styles/` - Global styles
  - `src/config/` - Configuration files
  - `assets/` - Static assets (images, fonts, data)
  - `locales/` - Language files

### Planned
- Core JavaScript modules:
  - Theme manager
  - Storage utilities
  - i18n manager
- UI Components:
  - Navbar
  - Hero section
  - Motto
  - Organization
  - Projects
  - Timeline
  - Gallery
  - Contact
  - Theme switcher
  - Version transition animation
- Language files:
  - English (en)
  - Chinese (zh)
  - Spanish (es)
  - Hindi (hi)
  - Arabic (ar)
- Data files for content

---

## Format

Based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Types of changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
