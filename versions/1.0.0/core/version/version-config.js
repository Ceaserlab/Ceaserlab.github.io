/**
 * Version Config for Version 1.0.0
 */

const versionConfig = {
  currentVersion: {
    id: '1.0.0',
    date: '2026-01-22',
    name: 'Initial Release',
    description: 'First public release of ceaserzhao website',
  },

  versions: [
    {
      id: '1.0.0',
      date: '2026-01-22',
      name: 'Initial Release',
      description: 'First public release of ceaserzhao website',
      archived: true,
    },
    {
      id: '1.0.1',
      date: '2026-02-19',
      name: 'Swiss Style Refactor',
      description: 'Refactored website style to Swiss Style and updated timeline content',
      archived: true,
    },
    {
      id: '1.0.2',
      date: '2026-03-08',
      name: 'Component-Based Refactor',
      description: 'Refactored website to use component-based architecture',
      archived: false,
    }
  ],

  transition: {
    animationDuration: 1500,
    colors: {
      lineLeft: '#00a67e',
      lineRight: '#10a37f',
      text: '#ffffff',
    },
  }
};

export { versionConfig };