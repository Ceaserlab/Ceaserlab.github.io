/**
 * Version Config for Version 1.0.3
 */

const versionConfig = {
  currentVersion: {
    id: '1.0.3',
    date: '2026-04-01',
    name: 'The Dreambuilder Awakens',
    description: 'A transformative update with animated hero text and project pull-out drawers',
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
      archived: true,
    },
    {
      id: '1.0.3',
      date: '2026-04-01',
      name: 'The Dreambuilder Awakens',
      description: 'A transformative update with animated hero text and project pull-out drawers',
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