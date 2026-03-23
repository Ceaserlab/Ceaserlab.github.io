# Development Guidelines

This document outlines the development standards and best practices for the Ceaserlab.github.io project.

## 1. Code Organization

### 1.1 Directory Structure
```
Ceaserlab.github.io/
├── index.html              # Main page (development version)
├── history.html            # Version history page
├── redirect.html           # Redirect to latest version
├── src/                    # Source code (main development directory)
│   ├── components/         # Reusable components
│   ├── core/               # Core functionality (i18n, theme, etc.)
│   ├── pages/              # Page-specific logic
│   ├── styles/             # CSS styles
│   │   ├── versions/       # Version-specific styles
│   │   └── base.css        # Base styles
│   └── config/             # Configuration files
├── versions/               # Version archives (read-only)
│   ├── 1.0.0/              # Complete 1.0.0 version (archive)
│   ├── 1.0.1/              # Complete 1.0.1 version (archive)
│   └── 1.0.2/              # Complete 1.0.2 version (archive)
├── locales/                # Translation files
├── assets/                 # Static assets (images, data)
└── docs/                   # Documentation
    └── DEVELOPMENT_GUIDELINES.md  # This file
```

### 1.2 Module Design Principles
- **Modularity**: Each feature should be independent and reusable
- **Version Isolation**: Code in `versions/` directory is read-only archive, not for daily development
- **Core Sharing**: Core functionality (i18n, theme, etc.) is placed in `src/core/` directory and shared across all versions

## 2. Naming Conventions

### 2.1 File Naming
- Use lowercase letters and hyphens
- Example: `home-page.js`, `navbar.css`

### 2.2 Variable Naming
- Use camelCase for variables and functions
- Example: `currentLanguage`, `initTranslations()`

### 2.3 Constant Naming
- Use uppercase letters and underscores
- Example: `MAX_WIDTH`, `API_ENDPOINT`

### 2.4 CSS Class Naming
- Use lowercase letters and hyphens
- Example: `.hero-section`, `.navbar-content`

## 3. Import Paths

### 3.1 Relative Paths
- Preferred for local module imports
- Example: `./components/navbar/navbar.js`

### 3.2 Absolute Paths
- Only used for core module references
- Example: `/src/core/i18n/i18n.js`

## 4. Code Style

### 4.1 Indentation
- Use 2 spaces for indentation
- No tabs

### 4.2 Semicolons
- Use semicolons to end statements

### 4.3 Quotes
- Use single quotes for strings
- Use backticks for template literals

### 4.4 Comments
- Only add comments for complex logic
- Follow JSDoc specification for function documentation

### 4.5 Line Length
- Keep lines under 80 characters when possible
- Use line breaks for long statements

## 5. Version Management

### 5.1 Adding New Versions
1. Update `src/config/version.config.js` with new version information
2. Test thoroughly
3. Archive current version to `versions/` directory
4. Update `redirect.html` to point to the new version

### 5.2 Version Switching
- Use URL parameter `?v=1.0.0` to switch between versions
- Maintain backward compatibility

## 6. Internationalization

### 6.1 Translation Keys
- Use dot-separated namespaces
- Example: `nav.home`, `projects.urconomy.name`

### 6.2 Default Language
- English (en) is the default language

### 6.3 Translation Files
- Stored in `locales/` directory
- One file per language (e.g., `en.json`, `zh.json`)

## 7. Theme Management

### 7.1 CSS Variables
- All colors, spacing, etc. are defined via CSS variables
- Stored in `src/styles/variables.css`

### 7.2 Theme Switching
- Support for light/dark themes
- Controlled via `data-theme` attribute on `<html>` element

## 8. Testing

### 8.1 Unit Tests
- Write unit tests for core modules
- Test edge cases and error handling

### 8.2 Integration Tests
- Ensure version switching works correctly
- Test language and theme switching

### 8.3 Manual Testing
- Test each version before release
- Verify cross-browser compatibility

## 9. Deployment

### 9.1 Build Process
- Use build tools (e.g., Vite) for optimization
- Minify CSS and JavaScript

### 9.2 Static Assets
- All static assets go in `assets/` directory
- Optimize images for web

### 9.3 Cache Strategy
- Set appropriate cache headers
- Use versioned filenames for static assets

## 10. Collaboration

### 10.1 Git Workflow
- Use feature branches for new functionality
- Pull requests for code review
- Semantic versioning

### 10.2 Commit Messages
- Follow Conventional Commits specification
- Example: `feat: add language switcher`

### 10.3 Code Review
- Self-review before committing
- Team review for major changes
- Focus on code quality and consistency

## 11. Security

### 11.1 Input Validation
- Sanitize user input
- Prevent XSS attacks

### 11.2 Dependencies
- Keep dependencies up to date
- Remove unused dependencies

### 11.3 HTTPS
- Ensure all resources are loaded via HTTPS

## 12. Performance

### 12.1 Loading Speed
- Minimize HTTP requests
- Use lazy loading for images
- Optimize critical rendering path

### 12.2 Runtime Performance
- Avoid unnecessary DOM manipulations
- Use event delegation
- Optimize animations

## 13. Accessibility

### 13.1 Semantic HTML
- Use proper HTML elements for their intended purpose
- Add ARIA attributes where necessary

### 13.2 Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Test with screen readers

### 13.3 Color Contrast
- Maintain sufficient color contrast
- Support for high contrast mode

## 14. Troubleshooting

### 14.1 Common Issues
- **CSS not loading**: Check file paths and network requests
- **i18n not working**: Verify translation keys and file paths
- **Version switching issues**: Check URL parameters and redirect logic

### 14.2 Debugging Tips
- Use browser developer tools
- Check console for errors
- Test in multiple browsers

## 15. Conclusion

Following these guidelines will help maintain a consistent, maintainable, and high-quality codebase. Remember to always prioritize code readability and user experience.

---

**Last Updated**: 2026-03-23