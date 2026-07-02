const utils = {
  formatDate: (date, format = 'dd/mm/yyyy') => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    return format.replace('dd', day).replace('mm', month).replace('yyyy', year);
  },

  parseDate: (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
  },

  saveToStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  getFromStorage: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  removeFromStorage: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  show: (element) => {
    if (element) element.style.display = 'block';
  },

  hide: (element) => {
    if (element) element.style.display = 'none';
  },

  toggle: (element) => {
    if (element) element.style.display = element.style.display === 'none' ? 'block' : 'none';
  },

  setText: (element, text) => {
    if (element) element.textContent = text;
  },

  getValue: (element) => {
    if (element) return element.value;
    return '';
  },

  setValue: (element, value) => {
    if (element) element.value = value;
  },

  showLoading: (overlay, text = 'Đang tải dữ liệu...') => {
    if (overlay) {
      const loadingText = overlay.querySelector('#loadingText');
      if (loadingText) loadingText.textContent = text;
      overlay.style.display = 'flex';
    }
  },

  hideLoading: (overlay) => {
    if (overlay) overlay.style.display = 'none';
  }
};
