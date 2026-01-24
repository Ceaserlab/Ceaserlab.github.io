/**
 * Storage Utilities
 * 本地存储封装 - 提供类型安全的存储操作
 */

class Storage {
  constructor(prefix = 'ceaser-') {
    this.prefix = prefix;
  }

  /**
   * 生成完整的 key
   */
  _getKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * 设置数据
   * @param {string} key - 键名
   * @param {*} value - 值（会自动序列化为 JSON）
   * @returns {boolean} 是否成功
   */
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this._getKey(key), serialized);
      return true;
    } catch (error) {
      console.error(`Storage.set error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * 获取数据
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值
   * @returns {*} 存储的值或默认值
   */
  get(key, defaultValue = null) {
    try {
      const serialized = localStorage.getItem(this._getKey(key));
      if (serialized === null) {
        return defaultValue;
      }
      return JSON.parse(serialized);
    } catch (error) {
      console.error(`Storage.get error for key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * 删除数据
   * @param {string} key - 键名
   * @returns {boolean} 是否成功
   */
  remove(key) {
    try {
      localStorage.removeItem(this._getKey(key));
      return true;
    } catch (error) {
      console.error(`Storage.remove error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * 清空所有前缀数据
   * @returns {boolean} 是否成功
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage.clear error:', error);
      return false;
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key - 键名
   * @returns {boolean}
   */
  has(key) {
    return localStorage.getItem(this._getKey(key)) !== null;
  }

  /**
   * 获取所有带前缀的键
   * @returns {string[]}
   */
  keys() {
    const allKeys = Object.keys(localStorage);
    return allKeys.filter(key => key.startsWith(this.prefix));
  }
}

// 导出单例实例
export const storage = new Storage();
