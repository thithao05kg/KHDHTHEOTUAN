const appDOM = {
  namhoc: document.getElementById('namhoc'),
  truonghoc: document.getElementById('truonghoc'),
  giaovien: document.getElementById('giaovien'),
  tuan: document.getElementById('tuan'),
  ngaybatdau: document.getElementById('ngaybatdau'),
  tettu: document.getElementById('tettu'),
  tetden: document.getElementById('tetden'),
  tuan_tungay: document.getElementById('tuan_tungay'),
  tuan_denngay: document.getElementById('tuan_denngay'),
  status: document.getElementById('status'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  btMoi: document.getElementById('btMoi'),
  btLuu: document.getElementById('btLuu'),
  btXemIn: document.getElementById('btXemIn'),
  btInLich: document.getElementById('btInLich')
};

function initializeApp() {
  if (typeof initializeGrids === 'function') {
    initializeGrids();
  }
  
  setupDatePickers();
  setupEventListeners();
  loadInitialData();
}

function setupDatePickers() {
  flatpickr('#ngaybatdau, #tettu, #tetden', {
    dateFormat: 'd/m/Y',
    allowInput: true,
    locale: 'vn',
    disableMobile: true
  });
}

function setupEventListeners() {
  appDOM.btMoi?.addEventListener('click', handleCreateNew);
  appDOM.btLuu?.addEventListener('click', handleSave);
  appDOM.btXemIn?.addEventListener('click', handlePreview);
  appDOM.tuan?.addEventListener('change', handleWeekChange);
}

async function loadInitialData() {
  try {
    updateStatus('Đang tải dữ liệu...');
    
    if (nguonDuLieuForm.namHoc) {
      const frag = document.createDocumentFragment();
      nguonDuLieuForm.namHoc.forEach(nam => 
        frag.appendChild(new Option(nam, nam))
      );
      appDOM.namhoc.innerHTML = '';
      appDOM.namhoc.appendChild(frag);
    }
    
    updateStatus('Sẵn sàng thao tác.');
  } catch (error) {
    updateStatus('Lỗi: ' + error.message);
  }
}

function handleCreateNew() {
  if (!confirm('Bạn có chắc chắn muốn làm mới lưới?')) return;
  
  if (hotInstance) {
    let changes = [];
    for (let r = 0; r < 60; r++) {
      changes.push([r, 2, ''], [r, 3, ''], [r, 4, ''], [r, 5, ''], [r, 6, ''], [r, 7, false]);
    }
    hotInstance.setDataAtCell(changes);
  }
  
  updateStatus('Lưới đã được làm mới.');
}

async function handleSave() {
  const nam = appDOM.namhoc.value;
  const truong = appDOM.truonghoc.value;
  const giaovien = appDOM.giaovien.value;
  
  if (!nam || !truong || !giaovien) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }
  
  try {
    utils.showLoading(appDOM.loadingOverlay, 'Đang lưu dữ liệu...');
    
    const thongTinThoiGian = {
      ngayBatDau: appDOM.ngaybatdau.value,
      tetTu: appDOM.tettu.value,
      tetDen: appDOM.tetden.value,
      tuan: appDOM.tuan.value,
      tuanTuNgay: appDOM.tuan_tungay.value,
      tuanDenNgay: appDOM.tuan_denngay.value
    };
    
    const dataGrid = getGridData();
    const mangMaTranAnBuoi = Array(12).fill(false);
    
    const result = await api.saveSchedule(nam, truong, giaovien, thongTinThoiGian, dataGrid, mangMaTranAnBuoi);
    
    utils.hideLoading(appDOM.loadingOverlay);
    alert('Lưu thành công!');
    updateStatus('Đã lưu lịch báo giảng thành công.');
  } catch (error) {
    utils.hideLoading(appDOM.loadingOverlay);
    alert('Lỗi lưu: ' + error.message);
  }
}

async function handlePreview() {
  alert('Tính năng xem in sẽ được cập nhật trong phiên bản tiếp theo.');
}

function handleWeekChange(event) {
  const week = parseInt(event.target.value);
  if (isNaN(week) || week < 1 || week > 35) {
    alert('Tuần học phải từ 1 đến 35');
    event.target.value = 1;
    return;
  }
  updateStatus(`Chuyển sang tuần ${week}`);
}

function updateStatus(message) {
  if (appDOM.status) {
    appDOM.status.textContent = message;
  }
}

window.initializeApp = initializeApp;
window.updateStatus = updateStatus;
