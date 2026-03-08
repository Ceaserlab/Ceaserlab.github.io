# Development Guidelines

This document outlines the development standards and best practices for the Ceaserlab.github.io project.

## 📁 Project Structure

```
Ceaserlab.github.io/
├── versions/                 # Independent version directories
│   ├── 1.0.0/               # Version 1.0.0 (Archived)
│   │   ├── index.html       # Complete HTML for this version
│   │   ├── style.css        # Complete CSS for this version
│   │   └── script.js        # Complete JavaScript for this version
│   ├── 1.0.1/               # Version 1.0.1 (Archived)
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── 1.0.2/               # Version 1.0.2 (Current)
│       ├── index.html
│       ├── style.css
│       └── script.js
├── assets/                  # Shared resources (images, data files)
│   ├── images/
│   └── data/
├── locales/                 # Shared translation files (optional)
├── index.html               # Redirects to latest version
└── docs/                    # Documentation
```

## 🎯 Core Principles

### 1. **Independent Versions**
Each version is a **completely standalone** implementation:
- **Separate HTML, CSS, and JS files**
- **No shared dependencies** between versions
- **Full isolation** - changes to one version do not affect others

### 2. **Version Semantics**
- Follow Semantic Versioning: `MAJOR.MINOR.PATCH`
- **MAJOR** (X.0.0): Major redesign, breaking changes
- **MINOR** (1.X.0): New features, significant updates
- **PATCH** (1.0.X): Bug fixes, minor improvements

### 3. **File Organization**
Each version directory must contain exactly three files:
- `index.html` - The complete HTML structure
- `style.css` - All styles for this version
- `script.js` - All JavaScript logic for this version

## 🚀 Creating a New Version

### Step 1: Create Version Directory
```bash
# Example: Creating version 1.1.0
mkdir versions/1.1.0
```

### Step 2: Copy from Latest Version
```bash
# On Windows
copy versions\1.0.2\index.html versions\1.1.0\
copy versions\1.0.2\style.css versions\1.1.0\
copy versions\1.0.2\script.js versions\1.1.0\

# On Unix/Linux/macOS
cp versions/1.0.2/index.html versions/1.1.0/
cp versions/1.0.2/style.css versions/1.1.0/
cp versions/1.0.2/script.js versions/1.1.0/
```

### Step 3: Update Version Configuration
Edit `versions/1.1.0/script.js` and update the `versionConfig`:

```javascript
const versionConfig = {
  currentVersion: {
    id: '1.1.0',
    date: 'YYYY-MM-DD',  // Use release date
    name: 'Version Name',
    description: 'Brief description of changes',
  },

  versions: [
    {
      id: '1.1.0',
      date: 'YYYY-MM-DD',
      name: 'Version Name',
      description: 'Brief description',
      archived: false,  // New versions are not archived
    },
    {
      id: '1.0.2',
      date: '2026-03-08',
      name: 'In Development',
      description: 'Version 1.0.2 - Under Development',
      archived: true,  // Mark older versions as archived
    },
    // ... include all previous versions in reverse chronological order
  ],
  // ... rest of configuration
};
```

### Step 4: Update Root Redirect
Edit `index.html` in the project root to redirect to the new version:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0; url=/versions/1.1.0/">
  <title>Ceaserzhao - Redirecting</title>
  <script>
    window.location.replace('/versions/1.1.0/');
  </script>
</head>
<body>
  <p>Redirecting to <a href="/versions/1.1.0/">Ceaserzhao Website</a>...</p>
</body>
</html>
```

### Step 5: Update Previous Versions
For each previous version (except the very first version 1.0.0), update their `script.js` to mark them as archived:

```javascript
// In versions/1.0.2/script.js, versions/1.0.1/script.js, etc.
const versionConfig = {
  currentVersion: {
    id: '1.0.2',  // Keep this as is - each page shows itself as current
    // ... rest of currentVersion config
  },
  versions: [
    {
      id: '1.0.2',
      date: '2026-03-08',
      name: 'In Development',
      description: 'Version 1.0.2 - Under Development',
      archived: true,  // Changed to true since it's now an old version
    },
    // ... rest of versions
  ],
};
```

### Step 6: Test
1. Access root URL (`/`) - should redirect to new version
2. Access new version directly (`/versions/1.1.0/`)
3. Test version switching in navigation dropdown
4. Test all features (language switch, navigation, etc.)
5. Check for console errors

## 📝 Code Standards

### HTML
- Use semantic HTML5 elements
- Include proper meta tags (viewport, description, theme-color)
- Maintain consistent indentation (2 spaces or 4 spaces)
- Include accessible alt text for images
- Use proper heading hierarchy (h1 → h2 → h3)

### CSS
- Use consistent naming conventions (kebab-case for classes)
- Organize styles with clear comments:
  ```css
  /* ==================== Section Name ==================== */
  /* Subsection */
  .class-name { }
  ```
- Use CSS variables for colors and spacing
- Maintain responsive design principles
- Follow Swiss Style principles (clean, grid-based, readable)

### JavaScript
- Use modern ES6+ syntax
- Use strict mode: `'use strict';`
- Organize code with clear section comments:
  ```javascript
  // ==================== Section Name ====================
  ```
- Use const/let instead of var
- Write functions that are self-contained
- Avoid global namespace pollution
- Add meaningful comments for complex logic

## 🔍 Quality Assurance

### Before Committing
1. **Lint Check**: Run linter on all modified files
2. **Cross-Browser Test**: Test on multiple browsers (Chrome, Firefox, Safari, Edge)
3. **Responsive Test**: Test on different screen sizes (mobile, tablet, desktop)
4. **Feature Test**: Test all interactive features
5. **Link Check**: Verify all internal and external links work

### Code Review Checklist
- [ ] Version configuration is updated correctly
- [ ] All three files (HTML, CSS, JS) are present and functional
- [ ] No console errors or warnings
- [ ] Navigation and version switching work correctly
- [ ] All translations are correct
- [ ] Images and assets load properly
- [ ] Design follows established style guidelines

## 🌐 Internationalization (i18n)

The project supports multiple languages. When adding new content:

1. **Add translations to all languages** in the `translations` object
2. **Keep translations consistent** across all supported languages
3. **Use descriptive keys** (e.g., `"nav.home"`, `"hero.intro1"`)
4. **Test language switching** for all supported languages

Currently supported languages:
- English (en)
- Chinese (zh)
- Spanish (es)
- Hindi (hi)
- Arabic (ar)

## 🎨 Design Guidelines

### Swiss Style Principles
- **Grid System**: Use 12-column grid layout
- **Typography**: Clean, readable fonts (Inter, Roboto, etc.)
- **Colors**: Use the brand blue-green (#00a67e) as primary color
- **Hierarchy**: Clear visual hierarchy with font weights and spacing
- **Whitespace**: Generous whitespace for readability
- **Simplicity**: Minimalist design, avoid unnecessary decorations

## 📦 Assets Management

### Images
- Store all images in `assets/images/`
- Use descriptive filenames (e.g., `profile-photo.jpg`, `project-screenshot.png`)
- Optimize images for web (compress, appropriate dimensions)
- Use modern formats (WebP, AVIF) when browser support allows

### Data Files
- Store shared data in `assets/data/`
- Use JSON format for structured data
- Keep data files version-independent when possible

## 🔄 Version Release Process

1. **Development Phase**
   - Create new version directory
   - Copy from latest version
   - Update version config with "In Development" status

2. **Testing Phase**
   - Test all features
   - Fix bugs
   - Refactor code if needed

3. **Release Phase**
   - Update version name from "In Development" to release name
   - Update release date
   - Mark previous versions as archived
   - Update root redirect

4. **Documentation**
   - Update CHANGELOG.md
   - Document breaking changes
   - Update VERSIONS.md if needed

## 📊 Version History Management

### Version Status
- **In Development**: `archived: false`, name: "In Development"
- **Released**: `archived: false`, name: "Release Name"
- **Archived**: `archived: true`

### When to Archive a Version
- A new version has been released
- The version is no longer actively maintained
- The version is considered a historical version

### Example Version Configurations

**New Version (In Development)**:
```javascript
{
  id: '1.1.0',
  date: '2026-04-01',
  name: 'In Development',
  description: 'Version 1.1.0 - Under Development',
  archived: false,
}
```

**Released Version**:
```javascript
{
  id: '1.1.0',
  date: '2026-04-15',
  name: 'Feature Update',
  description: 'Added new gallery features and improved navigation',
  archived: false,
}
```

**Archived Version**:
```javascript
{
  id: '1.0.2',
  date: '2026-03-08',
  name: 'In Development',
  description: 'Version 1.0.2 - Under Development',
  archived: true,
}
```

## 🤝 Contributing

### Git Workflow
1. Create a new branch for each version or feature
2. Commit changes with descriptive messages
3. Test thoroughly before pushing
4. Use pull requests for code review

### Commit Message Format
```
feat(version): add new version 1.1.0
fix(nav): correct version switching bug
style(css): improve responsive design
docs(readme): update development guidelines
```

## 📚 Related Documents

- `CHANGELOG.md` - Detailed change history
- `VERSIONS.md` - Version architecture overview
- `REFACTOR_SUMMARY.md` - Summary of recent refactoring

## 🆘 Troubleshooting

### Common Issues

**Version switching not working**
- Check `versionConfig` in `script.js`
- Verify version IDs match directory names
- Ensure no JavaScript errors in console

**Styles not loading**
- Verify CSS file path in HTML
- Check for CSS syntax errors
- Clear browser cache

**Translations missing**
- Ensure all keys exist in all languages
- Check translation object structure
- Verify language switching logic

**Images not displaying**
- Check image paths are correct
- Verify files exist in `assets/images/`
- Check image permissions

---

**Last Updated**: 2026-03-08  
**Maintained By**: Ceaserzhao  
**Project**: Ceaserlab.github.io
