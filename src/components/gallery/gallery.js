/**
 * Gallery Component Logic (Optimized)
 * 相册组件逻辑（优化版）- 节点地图
 */

class Gallery {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.map = null;
    this.connectionsSvg = null;
    this.images = images;
    this.nodes = [];
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.init();
  }

  /**
   * 初始化相册
   */
  init() {
    this.map = document.getElementById('gallery-map');
    this.connectionsSvg = document.getElementById('gallery-connections');

    // 添加渐变定义
    this.addGradientDef();

    // 初始化节点
    this.initNodes();

    // 初始化连线
    this.initConnections();

    // 初始化拖拽
    this.initDrag();

    // 初始化缩放
    this.initZoom();

    // 初始化重置按钮
    this.initReset();

    // 初始化边界指示
    this.addBoundaryIndicator();

    // 初始化模态框
    this.initModal();
  }

  /**
   * 添加 SVG 渐变定义
   */
  addGradientDef() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:var(--color-primary);stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:var(--color-secondary);stop-opacity:0.1" />
      </linearGradient>
    `;
    this.connectionsSvg.appendChild(defs);
  }

  /**
   * 初始化节点
   */
  initNodes() {
    // 清空现有节点
    const existingNodes = this.map.querySelectorAll('.gallery-node');
    existingNodes.forEach(node => node.remove());

    // 创建新节点
    this.images.forEach((image, index) => {
      const node = this.createNode(image, index);
      this.nodes.push(node);
      this.map.appendChild(node);
    });
  }

  /**
   * 创建单个节点
   */
  createNode(image, index) {
    const node = document.createElement('div');
    node.className = `gallery-node anim-${(index % 5) + 1}`;
    node.dataset.id = image.id;

    // 优化随机位置分布（使用黄金螺旋避免聚集）
    const position = this.getOptimizedPosition(index, this.images.length);
    node.style.left = `${position.x}px`;
    node.style.top = `${position.y}px`;

    node.innerHTML = `
      <div class="gallery-node-inner">
        <img src="${image.src}" alt="${image.title}">
      </div>
      <div class="node-tooltip">${image.title}</div>
    `;

    // Hover 事件：高亮相关连线
    node.addEventListener('mouseenter', () => {
      this.highlightConnections(node);
    });

    node.addEventListener('mouseleave', () => {
      this.clearHighlights();
    });

    // 点击事件
    node.addEventListener('click', () => {
      this.openModal(image);
    });

    return node;
  }

  /**
   * 获取优化后的随机位置
   */
  getOptimizedPosition(index, total) {
    const padding = 200;
    const width = 2000 - padding * 2;
    const height = 2000 - padding * 2;
    
    // 使用黄金螺旋分布
    const angle = index * 2.4; // 黄金角度
    const radius = 100 + (index * 40) % 700;
    
    const x = padding + width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
    const y = padding + height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 100;

    return { x: Math.max(padding, Math.min(2000 - padding - 150, x)), y: Math.max(padding, Math.min(2000 - padding - 150, y)) };
  }

  /**
   * 初始化连线
   */
  initConnections() {
    this.connectionsSvg.innerHTML = '';
    this.addGradientDef();
    this.drawConnections();
  }

  /**
   * 绘制连线
   */
  drawConnections() {
    // 清空现有线条
    const existingLines = this.connectionsSvg.querySelectorAll('line');
    existingLines.forEach(line => line.remove());

    // 为每个节点连接到最近的 1-2 个节点
    this.nodes.forEach((node, i) => {
      const node1 = this.nodes[i];
      const x1 = parseFloat(node1.style.left) + 75;
      const y1 = parseFloat(node1.style.top) + 75;

      // 找到最近的节点
      const distances = this.nodes
        .map((n, j) => {
          if (i === j) return { index: j, distance: Infinity };
          const x2 = parseFloat(n.style.left) + 75;
          const y2 = parseFloat(n.style.top) + 75;
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          return { index: j, distance };
        })
        .filter(d => d.distance < 600)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 2); // 只连接最近的 2 个

      // 绘制连线
      distances.forEach(d => {
        const node2 = this.nodes[d.index];
        const x2 = parseFloat(node2.style.left) + 75;
        const y2 = parseFloat(node2.style.top) + 75;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.dataset.from = i;
        line.dataset.to = d.index;
        this.connectionsSvg.appendChild(line);
      });
    });
  }

  /**
   * 高亮相关连线
   */
  highlightConnections(node) {
    const nodeIndex = this.nodes.indexOf(node);
    const lines = this.connectionsSvg.querySelectorAll('line');
    
    lines.forEach(line => {
      if (parseInt(line.dataset.from) === nodeIndex || parseInt(line.dataset.to) === nodeIndex) {
        line.classList.add('highlighted');
      }
    });
  }

  /**
   * 清除高亮
   */
  clearHighlights() {
    const lines = this.connectionsSvg.querySelectorAll('line');
    lines.forEach(line => {
      line.classList.remove('highlighted');
    });
  }

  /**
   * 初始化拖拽
   */
  initDrag() {
    const wrapper = document.querySelector('.gallery-map-wrapper');

    wrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('.control-btn')) return;
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      wrapper.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.lastMouseX;
      const deltaY = e.clientY - this.lastMouseY;

      this.translateX += deltaX;
      this.translateY += deltaY;

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;

      this.updateTransform();
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      wrapper.style.cursor = 'grab';
    });

    // 触摸支持
    wrapper.addEventListener('touchstart', (e) => {
      if (e.target.closest('.control-btn')) return;
      this.isDragging = true;
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
    });

    wrapper.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const deltaX = e.touches[0].clientX - this.lastMouseX;
      const deltaY = e.touches[0].clientY - this.lastMouseY;

      this.translateX += deltaX;
      this.translateY += deltaY;

      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;

      this.updateTransform();
    });

    wrapper.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  /**
   * 初始化缩放
   */
  initZoom() {
    const wrapper = document.querySelector('.gallery-map-wrapper');

    // 滚轮缩放
    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.max(0.5, Math.min(2, this.scale + delta));

      this.scale = newScale;
      this.updateTransform();
    });

    // 按钮缩放
    document.getElementById('zoom-in').addEventListener('click', () => {
      this.scale = Math.min(2, this.scale + 0.1);
      this.updateTransform();
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
      this.scale = Math.max(0.5, this.scale - 0.1);
      this.updateTransform();
    });
  }

  /**
   * 更新变换
   */
  updateTransform() {
    this.map.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }

  /**
   * 初始化重置按钮
   */
  initReset() {
    document.getElementById('reset-view').addEventListener('click', () => {
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.updateTransform();
    });
  }

  /**
   * 添加边界指示器
   */
  addBoundaryIndicator() {
    const wrapper = document.querySelector('.gallery-map-wrapper');
    const indicator = document.createElement('div');
    indicator.className = 'boundary-indicator';
    indicator.textContent = 'Drag to explore • Scroll to zoom';
    wrapper.appendChild(indicator);
  }

  /**
   * 初始化模态框
   */
  initModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    });

    this.modal = modal;
    this.modalImage = modalImage;
    this.modalTitle = modalTitle;
    this.modalDesc = modalDesc;
  }

  /**
   * 打开模态框
   */
  openModal(image) {
    this.modalImage.src = image.src;
    this.modalTitle.textContent = image.title;
    this.modalDesc.textContent = image.description || '';
    this.modal.classList.add('active');
  }
}

// 导出
export { Gallery };
