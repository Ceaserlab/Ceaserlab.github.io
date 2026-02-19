/**
 * Version Configuration
 * 版本历史配置
 */

export const versionConfig = {
  // 当前版本
  currentVersion: {
    id: '1.0.1',
    date: '2026-02-19',
    name: 'Swiss Style Refactor',
    description: 'Refactored website style to Swiss Style and updated timeline content',
  },

  // 版本列表（从旧到新）
  versions: [
    {
      id: '1.0.0',
      date: '2026-01-22',
      name: 'Initial Release',
      description: 'First public release of ceaserzhao website',
      archived: false,
    },
    {
      id: '1.0.1',
      date: '2026-02-19',
      name: 'Swiss Style Refactor',
      description: 'Refactored website style to Swiss Style and updated timeline content',
      archived: false,
    },
    // 新版本只需在此添加，保持高扩展性
  ],

  // 版本切换配置
  transition: {
    animationDuration: 1500, // ms
    colors: {
      lineLeft: '#00a67e', // 蓝绿线条左
      lineRight: '#10a37f', // 蓝绿线条右
      text: '#ffffff',
    },
  },
};
