/**
 * Theme Configuration
 * 主题配置
 */

export const themeConfig = {
  // 默认主题
  defaultTheme: 'dark', // 'light' or 'dark'

  // 支持的主题
  themes: {
    light: {
      name: 'Light',
      primary: '#00a67e', // Yka blue-green
      secondary: '#10a37f', // OpenAI green
      background: '#ffffff',
      surface: '#f7f7f8',
      text: '#202123',
      textSecondary: '#6e6e80',
      border: '#e5e5e5',
    },
    dark: {
      name: 'Dark',
      primary: '#00a67e', // Yka blue-green
      secondary: '#10a37f', // OpenAI green
      background: '#343541',
      surface: '#444654',
      text: '#ececf1',
      textSecondary: '#c5c5d2',
      border: '#565869',
    },
  },

  // 主题切换配置
  switch: {
    localStorageKey: 'ceaser-theme',
    systemThemeDetection: true, // 检测系统主题
  },
};
