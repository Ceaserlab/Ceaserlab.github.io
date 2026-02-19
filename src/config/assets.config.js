/**
 * Assets Configuration
 * 资产配置 - 集中管理所有资产路径，便于替换
 */

export const assetsConfig = {
  // 图片资产
  images: {
    // 头像
    avatar: {
      default: '/assets/images/avatar/avatar.jpg',
      fallback: '/assets/images/avatar/default.JPG',
      meta: '/assets/images/avatar/meta.png'
    },
    // 相册
    gallery: {
      image1: '/assets/images/gallery/At McDonald\'s with my brothers.JPG',
      image2: '/assets/images/gallery/MYSHGC club.JPG',
      image3: '/assets/images/gallery/The Overpass in Middle School.JPG',
      image4: '/assets/images/gallery/my desktop in school.JPG',
      image5: '/assets/images/gallery/qolar bear.JPG'
    }
  },
  
  // 数据资产
  data: {
    gallery: '/assets/data/gallery-data.json',
    timeline: '/assets/data/timelineadd.md'
  },
  
  // 组件模板
  templates: {
    navbar: '/src/components/navbar/navbar.html',
    gallery: '/src/components/gallery/gallery.html'
  },
  
  // 样式文件
  styles: {
    base: '/src/styles/base.css',
    layout: '/src/styles/layout.css',
    utilities: '/src/styles/utilities.css',
    variables: '/src/styles/variables.css',
    // 组件样式
    components: {
      navbar: '/src/components/navbar/navbar.css',
      gallery: '/src/components/gallery/gallery.css'
    },
    // 页面样式
    pages: {
      home: '/src/pages/home/home.css',
      history: '/src/pages/history/history.css'
    },
    // 版本样式
    versions: {
      '1.0.0': '/src/styles/versions/1.0.0.css'
    }
  },
  
  // 脚本文件
  scripts: {
    // 核心脚本
    core: {
      i18n: '/src/core/i18n/i18n.js',
      storage: '/src/core/storage/storage.js',
      theme: '/src/core/theme/theme-manager.js'
    },
    // 组件脚本
    components: {
      navbar: '/src/components/navbar/navbar.js',
      gallery: '/src/components/gallery/gallery.js'
    },
    // 页面脚本
    pages: {
      home: '/src/pages/home/home.js',
      history: '/src/pages/history/history.js'
    }
  },
  
  // 语言文件
  locales: {
    en: '/locales/en.json',
    zh: '/locales/zh.json',
    es: '/locales/es.json',
    hi: '/locales/hi.json',
    ar: '/locales/ar.json'
  },
  
  /**
   * 获取资产路径
   * @param {string} type - 资产类型
   * @param {string} key - 资产键
   * @returns {string} 资产路径
   */
  get(type, key) {
    const parts = key.split('.');
    let value = this[type];
    
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return null;
      }
    }
    
    return value;
  }
};
