/**
 * Site Configuration
 * 站点基础配置
 */

export const siteConfig = {
  name: 'ceaserzhao',
  description: 'Personal website of ceaserzhao',
  githubUrl: 'https://github.com/Ceaserlab/Ceaserlab.github.io',
  githubRepo: 'git@github.com:Ceaserlab/Ceaserlab.github.io.git',

  // 社交链接
  social: {
    github: 'https://github.com/Ceaserlab',
    email: '', // 待添加
  },

  // 页面配置
  pages: {
    home: '/',
    history: '/history.html',
  },

  // UI 配置
  ui: {
    // 版本切换动画配置
    versionTransition: {
      enabled: true,
      animationDuration: 1500, // ms
      brandText: 'ceaserlab',
    },
  },
};
