/**
 * Version 1.0.1 Main Script
 * Swiss Style Version - Complete standalone implementation
 */

// ==================== i18n System ====================
const translations = {
  en: {
    "nav.home": "Home",
    "nav.history": "History",
    "nav.github": "GitHub",
    "hero.name": "Ceaserzhao",
    "hero.intro1": "I'm ceaserzhao, a dreamer. My mind is filled with countless wild ideas every day, and I hope one day they will become reality.",
    "hero.intro2": "Strictly speaking, I belong to Gen A, but I prefer to call myself Gen Z, or Gen TS (a concept I created myself).",
    "hero.intro3": "I learn many things simultaneously.",
    "hero.intro4": "Singapore advocates for PI-shaped talents (broad knowledge base with two areas of expertise). Haha, but I hope to become an RT (Roman TWO). In fact, I haven't figured out the exact definition of RT talents, but the bottom of Roman Two is connected, which might be the boundary between chaos and order, haha.",
    "motto1.content": "I know the singularity won't descend — it's hidden in my past. I believe I can transcend my current neorowprine and examine the game I'm in from a spectator's perspective. I will tell my story to the world.",
    "motto2.content": "McDonald's conquered yellow, Coca-Cola conquered red. May you and I conquer blue-green together. I call it Yka.",
    "organization.title": "My Organizations",
    "organization.oasis.name": "Oasis Company",
    "organization.oasis.description": "Founded in 6th grade, it was just a pretend game back then (but it still is now)",
    "organization.idiotz.name": "3idiotz",
    "organization.idiotz.description": "Named after the Bollywood movie 3 Idiots (me and two Indian friends)",
    "facts.title": "More Facts About Me",
    "facts.fields": "Fields I Explore",
    "facts.tools": "Tools / Programming Languages / Systems I Use",
    "facts.languages": "Languages I Speak",
    "facts.music": "My Top 5 Singers",
    "projects.title": "My Projects (Doing)",
    "projects.urconomy.name": "Urconomy",
    "projects.urconomy.description": "A book I'm writing about economics, sociology, AI, and politics. Started writing in January 2025, expected to complete in mid-2026. The book has 9 chapters.",
    "projects.wocon.name": "Wocon",
    "projects.wocon.description": "A travel app that helps you find your travel companions. Web version is now live.",
    "projects.oermos.name": "Oermos",
    "projects.oermos.description": "An email app custom-built for Oasis Company",
    "projects.apsuck.name": "APSUCK",
    "projects.apsuck.description": "Helps AP students access quality materials and online practice, mainly for AP CSA and AP Calculus BC. FIVE FIVE FIVE!!!!!!!!!!!!!!!",
    "projects.biosurf.name": "Biosurf",
    "projects.biosurf.description": "A browser custom-built for machines",
    "timeline.title": "Timeline",
    "timeline.items.0.event": "I founded Oasis Company",
    "timeline.items.1.event": "natwd became my brother",
    "timeline.items.2.event": "qolar bear became my brother",
    "timeline.items.3.event": "zhang lixing became my brother",
    "timeline.items.4.event": "comet became my brother",
    "timeline.items.5.event": "Started writing \"Urconomy\"",
    "timeline.items.6.event": "\"THE origin\" was founded",
    "timeline.items.7.event": "rudy (atix), tkm4 became my brothers",
    "timeline.items.8.event": "Araf became my brother",
    "timeline.items.9.event": "Entered high school",
    "timeline.items.10.event": "Started developing Wocon",
    "timeline.items.11.event": "Created this website",
    "timeline.items.12.event": "Started developing AMAR ENGINE",
    "contact.title": "Leave Something For Me",
    "contact.placeholder": "Your message...",
    "contact.submit": "Send",
    "contact.message": "Please enter a message",
    "ending.content": "Let's build the Oasisverse from here",
    "ending.footer": "© 2026 Oasis Company",
    "view-all": "View All",
    "Version History": "Version History"
  },
  zh: {
    "nav.home": "首页",
    "nav.history": "历史",
    "nav.github": "GitHub",
    "hero.name": "Ceaserzhao",
    "hero.intro1": "在这里，灵感不再漂泊",
    "hero.intro2": "严格上来说，我算是 A 世代，但是我更喜欢把自己称为 Z 世代，或是 TS 世代（这是一个我自创的概念）。",
    "hero.intro3": "我会同时学很多东西。",
    "hero.intro4": "新加坡提倡人们称为 PI 型人才（即涉猎广泛且有两个精通的领域）。哈哈，而我希望我成为 RT（Roman TWO）。事实上，我都没有搞清楚 RT 人才的准确定义，但 Roman Two 的底部是连起来的，这或许就是混沌与秩序的边界，哈哈。",
    "motto1.content": "我知道奇点并不会降临——它隐藏在我的过去。我相信我可以超越我所处的 neorowprine，以旁观者的视角来审视我所处的游戏。我会向世界讲述我的故事。",
    "motto2.content": "麦当劳征服了黄色，可口可乐征服了红色。愿你我一起征服蓝绿色。我叫它 Yka。",
    "organization.title": "我的组织",
    "organization.oasis.name": "Oasis Company",
    "organization.oasis.description": "创办于六年级，当时他还只是一个过家家游戏（不过现在依然是）",
    "organization.idiotz.name": "3idiotz",
    "organization.idiotz.description": "这个名字来源于宝莱坞电影 3 Idiots（即我和两个印度哥们）",
    "facts.title": "更多关于我的事实",
    "facts.fields": "我探索的领域",
    "facts.tools": "我使用的工具 / 编程语言 / 系统",
    "facts.languages": "我会说的语言",
    "facts.music": "我最喜欢的五位歌手",
    "projects.title": "我的项目（进行中）",
    "projects.urconomy.name": "Urconomy",
    "projects.urconomy.description": "我正在写的一本书，关于经济学、社会学、AI 和政治。2025 年 1 月开始写作，预计 2026 年年中完成。这本书共有 9 章。",
    "projects.wocon.name": "Wocon",
    "projects.wocon.description": "一款旅行应用，帮助你找到旅伴。网页版已经上线。",
    "projects.oermos.name": "Oermos",
    "projects.oermos.description": "为 Oasis Company 定制的邮件应用",
    "projects.apsuck.name": "APSUCK",
    "projects.apsuck.description": "帮助 AP 学生获取优质材料和在线练习，主要针对 AP CSA 和 AP Calculus BC。FIVE FIVE FIVE！！！！！！！！！",
    "projects.biosurf.name": "Biosurf",
    "projects.biosurf.description": "为机器定制的浏览器",
    "timeline.title": "时间线",
    "timeline.items.0.event": "我创立了 Oasis Company",
    "timeline.items.1.event": "natwd 成了我的兄弟",
    "timeline.items.2.event": "qolar bear 成了我的兄弟",
    "timeline.items.3.event": "张立星成了我的兄弟",
    "timeline.items.4.event": "comet 成了我的兄弟",
    "timeline.items.5.event": "开始写《Urconomy》",
    "timeline.items.6.event": "\"THE origin\" 成立",
    "timeline.items.7.event": "rudy (atix), tkm4 成了我的兄弟",
    "timeline.items.8.event": "Araf 成了我的兄弟",
    "timeline.items.9.event": "进入高中",
    "timeline.items.10.event": "开始开发 Wocon",
    "timeline.items.11.event": "创建了这个网站",
    "timeline.items.12.event": "开始开发 AMAR ENGINE",
    "contact.title": "留点什么给我",
    "contact.placeholder": "你的消息...",
    "contact.submit": "发送",
    "contact.message": "请输入消息",
    "ending.content": "让我们从这里建设 Oasisverse",
    "ending.footer": "© 2026 Oasis Company",
    "view-all": "查看全部",
    "Version History": "版本历史"
  }
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

let currentLanguage = 'en';

const i18n = {
  t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },

  setLanguage(code) {
    currentLanguage = code;
    localStorage.setItem('language', code);
    this.updateTranslations();
  },

  getLanguage() {
    return currentLanguage;
  },

  getAllLanguages() {
    return languages;
  },

  updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
  }
};

// ==================== Theme Manager ====================
const themeManager = {
  getTheme() {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon();
  },

  toggle() {
    const current = this.getTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  updateThemeIcon() {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const theme = this.getTheme();

    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    }
  }
};

// ==================== Version Config ====================
const versionConfig = {
  currentVersion: {
    id: '1.0.1',
    date: '2026-02-19',
    name: 'Swiss Style Refactor',
    description: 'Refactored website style to Swiss Style and updated timeline content',
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

// ==================== Navbar ====================
class Navbar {
  constructor() {
    this.initElements();
    this.init();
  }

  initElements() {
    this.navbar = document.getElementById('navbar');
    this.languageSwitcher = document.getElementById('language-switcher');
    this.languageDropdown = document.getElementById('language-dropdown');
    this.currentLanguageFlag = document.getElementById('current-language-flag');
    this.currentLanguageName = document.getElementById('current-language-name');
    this.themeToggle = document.getElementById('theme-toggle');
    this.historyDropdown = document.getElementById('history-dropdown');
    this.historyMenu = document.getElementById('history-menu');
    this.versionDropdownList = document.getElementById('version-dropdown-list');
  }

  async init() {
    this.initLanguageSwitcher();
    this.initThemeToggle();
    this.initHistoryDropdown();
    this.initActiveLink();
    this.initTranslations();
  }

  initLanguageSwitcher() {
    this.updateCurrentLanguage();
    this.generateLanguageOptions();

    if (this.languageSwitcher) {
      this.languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(this.languageSwitcher, this.languageDropdown);
      });
    }

    document.addEventListener('click', () => {
      this.closeDropdown(this.languageSwitcher, this.languageDropdown);
    });
  }

  updateCurrentLanguage() {
    const lang = languages.find(l => l.code === currentLanguage);
    if (lang && this.currentLanguageFlag && this.currentLanguageName) {
      this.currentLanguageFlag.textContent = lang.flag;
      this.currentLanguageName.textContent = lang.name;
    }
  }

  generateLanguageOptions() {
    if (!this.languageDropdown) return;

    this.languageDropdown.innerHTML = '';
    languages.forEach(lang => {
      const button = document.createElement('button');
      button.className = `dropdown-item ${lang.code === currentLanguage ? 'selected' : ''}`;
      button.innerHTML = `
        <span>${lang.flag}</span>
        <span>${lang.name}</span>
      `;
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        i18n.setLanguage(lang.code);
        this.closeDropdown(this.languageSwitcher, this.languageDropdown);
      });
      this.languageDropdown.appendChild(button);
    });
  }

  initHistoryDropdown() {
    this.generateVersionList();

    if (this.historyDropdown) {
      this.historyDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(this.historyDropdown, this.historyMenu);
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.history-dropdown')) {
        this.closeDropdown(this.historyDropdown, this.historyMenu);
      }
    });
  }

  generateVersionList() {
    if (!this.versionDropdownList) return;

    this.versionDropdownList.innerHTML = '';
    const sortedVersions = [...versionConfig.versions].reverse();

    sortedVersions.forEach(version => {
      const isCurrent = version.id === versionConfig.currentVersion.id;
      const item = document.createElement('div');
      item.className = 'version-dropdown-item';

      item.innerHTML = `
        <span class="version-id">${version.id}</span>
        <span class="version-date">${version.date}</span>
        <span class="version-name">${version.name}</span>
        ${isCurrent ? '<span class="version-badge current">Current</span>' : ''}
      `;

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDropdown(this.historyDropdown, this.historyMenu);

        if (isCurrent) {
          window.location.href = '/versions/1.0.1/';
        } else {
          this.switchToVersion(version);
        }
      });

      this.versionDropdownList.appendChild(item);
    });
  }

  switchToVersion(version) {
    this.showVersionTransition(version);
  }

  showVersionTransition(version) {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'version-transition';
    transitionElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `;

    const lineLeft = document.createElement('div');
    lineLeft.style.cssText = `
      position: absolute;
      top: 0;
      left: -50%;
      width: 50%;
      height: 100%;
      background-color: ${versionConfig.transition.colors.lineLeft};
      transition: transform ${versionConfig.transition.animationDuration}ms ease-in-out;
    `;

    const lineRight = document.createElement('div');
    lineRight.style.cssText = `
      position: absolute;
      top: 0;
      right: -50%;
      width: 50%;
      height: 100%;
      background-color: ${versionConfig.transition.colors.lineRight};
      transition: transform ${versionConfig.transition.animationDuration}ms ease-in-out;
    `;

    const brandText = document.createElement('div');
    brandText.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      font-weight: bold;
      color: ${versionConfig.transition.colors.text};
      opacity: 0;
      transition: opacity ${versionConfig.transition.animationDuration / 2}ms ease-in-out;
      transition-delay: ${versionConfig.transition.animationDuration / 2}ms;
    `;
    brandText.textContent = 'ceaserlab';

    transitionElement.appendChild(lineLeft);
    transitionElement.appendChild(lineRight);
    transitionElement.appendChild(brandText);
    document.body.appendChild(transitionElement);

    setTimeout(() => {
      lineLeft.style.transform = 'translateX(100%)';
      lineRight.style.transform = 'translateX(-100%)';

      setTimeout(() => {
        brandText.style.opacity = '1';

        setTimeout(() => {
          brandText.style.opacity = '0';

          setTimeout(() => {
            lineLeft.style.transform = 'translateX(200%)';
            lineRight.style.transform = 'translateX(-200%)';

            setTimeout(() => {
              window.location.href = `/versions/${version.id}/`;
            }, versionConfig.transition.animationDuration / 2);
          }, versionConfig.transition.animationDuration / 2);
        }, versionConfig.transition.animationDuration / 2);
      }, versionConfig.transition.animationDuration);
    }, 100);
  }

  toggleDropdown(trigger, menu) {
    const isActive = trigger.classList.contains('active');
    this.closeAllDropdowns();
    if (!isActive) {
      trigger.classList.add('active');
    }
  }

  closeDropdown(trigger, menu) {
    trigger.classList.remove('active');
  }

  closeAllDropdowns() {
    this.languageSwitcher.classList.remove('active');
    this.historyDropdown.classList.remove('active');
  }

  initThemeToggle() {
    this.updateThemeIcon();

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        themeManager.toggle();
      });
    }
  }

  updateThemeIcon() {
    themeManager.updateThemeIcon();
  }

  initActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.navbar.querySelectorAll('.nav-link');

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath || (currentPath === '/versions/1.0.1/' && link.getAttribute('href') === '/versions/1.0.1/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initTranslations() {
    const elements = this.navbar.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.t(key);
    });
  }
}

// ==================== Gallery ====================
class Gallery {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.images = images;
    if (this.container) {
      this.render();
    }
  }

  render() {
    const section = document.createElement('section');
    section.className = 'gallery-section section';
    section.innerHTML = `
      <div class="container">
        <h2 data-i18n="gallery.title">Gallery</h2>
        <div class="gallery-grid">
          ${this.images.map(img => `
            <div class="gallery-item">
              <img src="${img.src}" alt="${img.alt}" loading="lazy">
              <div class="gallery-caption">${img.caption || ''}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const afterSection = document.querySelector('.timeline-section');
    if (afterSection && afterSection.parentNode) {
      afterSection.parentNode.insertBefore(section, afterSection.nextSibling);
    }
  }
}

// ==================== Main Page ====================
class HomePage {
  constructor() {
    this.init();
  }

  async init() {
    new Navbar();
    await this.initGallery();
    this.initContactForm();
    this.initTimelineScroll();

    // Load saved language
    const savedLang = localStorage.getItem('language') || 'en';
    i18n.setLanguage(savedLang);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    themeManager.setTheme(savedTheme);
  }

  async initGallery() {
    try {
      const response = await fetch('/assets/data/gallery-data.json');
      const data = await response.json();
      new Gallery('gallery-container', data.images);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    }
  }

  initContactForm() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (sendButton) {
      sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();

        if (!message) {
          alert(i18n.t('contact.message') || 'Please enter a message');
          return;
        }

        alert('Thank you for your message! This is a demo, so the message is not actually sent.');
        messageInput.value = '';
      });
    }
  }

  initTimelineScroll() {
    const container = document.getElementById('timeline-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!container || !scrollLeftBtn || !scrollRightBtn) return;

    const scrollAmount = 400;

    scrollLeftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    container.addEventListener('wheel', (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  }
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
  new HomePage();
});
