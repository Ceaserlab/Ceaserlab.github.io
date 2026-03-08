# Version Architecture Documentation

## 📁 New Structure

The project now uses **truly independent versions**, each with its own complete set of HTML, CSS, and JS files.

```
project/
├── index.html                      # Redirects to latest version
├── history.html                    # Version history page
├── versions/                       # All versions
│   ├── 1.0.0/                    # Version 1.0.0 (Initial Release)
│   │   ├── index.html            # Complete HTML for v1.0.0
│   │   ├── style.css             # Styles for v1.0.0
│   │   └── script.js             # JavaScript for v1.0.0
│   └── 1.0.1/                    # Version 1.0.1 (Current)
│       ├── index.html            # Complete HTML for v1.0.1
│       ├── style.css             # Styles for v1.0.1 (Swiss Style)
│       └── script.js             # JavaScript for v1.0.1
├── assets/                        # Shared assets
│   ├── images/
│   └── data/
├── locales/                       # Shared translations (if needed)
└── src/                          # Legacy shared components (optional)
```

## 🎯 Key Features

### 1. True Independence
- Each version has **its own complete set** of HTML, CSS, and JS
- No shared dependencies between versions
- Each version can be **fully modified independently**

### 2. Easy Navigation
- Root URL `/` redirects to latest version
- Direct version access:
  - `https://yourdomain.com/versions/1.0.1/` (Latest)
  - `https://yourdomain.com/versions/1.0.0/` (History)

### 3. Version Switching
- Navigation bar dropdown allows quick version switching
- Smooth transition animation when switching versions
- "Current" badge indicates the latest version

### 4. Scalability
- Adding a new version is simple:
  1. Create new directory: `versions/2.0.0/`
  2. Copy `index.html`, `style.css`, `script.js`
  3. Modify as needed
  4. Update version config in navbar dropdown

## 📋 Version Details

### Version 1.0.0 - Initial Release
- **Date**: 2026-01-22
- **Style**: Minimalist, lightweight
- **Timeline**: Events up to website creation (2026.01.22)
- **Features**:
  - Basic responsive design
  - Multi-language support (English, Chinese)
  - Theme switching (dark/light)
  - Gallery component
  - Contact form

### Version 1.0.1 - Swiss Style Refactor
- **Date**: 2026-02-19
- **Style**: Swiss International Style (严格的国际主义风格)
- **Timeline**: Events up to AMAR ENGINE development (2026.02.10)
- **Features**:
  - 12-column grid system
  - Inter font
  - Teal theme (#00a67e)
  - Geometric design elements
  - Stronger typography hierarchy
  - All v1.0.0 features

## 🔄 Migration Guide

### To Add a New Version

```bash
# 1. Create new version directory
mkdir versions/2.0.0

# 2. Copy from latest version
cp versions/1.0.1/index.html versions/2.0.0/
cp versions/1.0.1/style.css versions/2.0.0/
cp versions/1.0.1/script.js versions/2.0.0/

# 3. Modify files as needed
# Edit versions/2.0.0/index.html
# Edit versions/2.0.0/style.css
# Edit versions/2.0.1/script.js

# 4. Update index.html redirect to point to new version
# Edit index.html to redirect to /versions/2.0.0/

# 5. Update version config in all versions' script.js
# Add new version to versionConfig.versions array
```

### To Update the Current Version

```bash
# 1. Edit the latest version files
# Edit versions/1.0.1/index.html
# Edit versions/1.0.1/style.css
# Edit versions/1.0.1/script.js

# 2. Test changes locally
# Open versions/1.0.1/index.html in browser

# 3. Deploy to GitHub Pages
# git add versions/1.0.1/
# git commit -m "Update version 1.0.1"
# git push
```

## 🌐 URLs

- **Home (Latest)**: `https://yourdomain.com/` → redirects to `/versions/1.0.1/`
- **Version 1.0.1**: `https://yourdomain.com/versions/1.0.1/`
- **Version 1.0.0**: `https://yourdomain.com/versions/1.0.0/`
- **History Page**: `https://yourdomain.com/history.html`

## 📝 Notes

- All versions share the same `assets/` directory (images, data files)
- Each version includes its own complete i18n translations
- Theme and language preferences are stored in localStorage and persist across versions
- The history dropdown in navbar shows all available versions
- Current version is marked with a "Current" badge

## 🚀 Deployment

For GitHub Pages deployment:

1. Push all changes to GitHub
2. GitHub Pages will automatically build from the root directory
3. The root `index.html` will redirect visitors to the latest version
4. Each version is accessible via its own path

## 🔧 Maintenance

- **To modify a specific version**: Edit files in that version's directory
- **To add shared assets**: Add to `assets/` directory
- **To update global settings**: Update each version's files independently
- **To remove a version**: Delete the version directory and update navbar configs

---

**Version Architecture Status**: ✅ Active

Last Updated: 2026-03-03
Current Latest Version: 1.0.1 (Swiss Style Refactor)
