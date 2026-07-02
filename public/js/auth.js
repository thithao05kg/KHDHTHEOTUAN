const DOM = {
  loginScreen: document.getElementById('loginScreen'),
  appMainForm: document.getElementById('appMainForm'),
  loginNam: document.getElementById('login_nam'),
  loginTruong: document.getElementById('login_truong'),
  loginGv: document.getElementById('login_gv'),
  loginPass: document.getElementById('login_pass'),
  chkNhoDangNhap: document.getElementById('chkNhoDangNhap'),
  togglePass: document.getElementById('togglePass'),
  frmDangNhap: document.getElementById('frmDangNhap'),
  btnLogout: document.getElementById('btnLogout'),
  userDisplayName: document.getElementById('userDisplayName'),
  loadingOverlay: document.getElementById('loadingOverlay')
};

let currentUser = null;
let nguonDuLieuForm = { namHoc: [], banDoHeThong: {}, monHoc: [], lopHoc: [] };

document.addEventListener('DOMContentLoaded', () => {
  initializeAuth();
});

async function initializeAuth() {
  try {
    utils.showLoading(DOM.loadingOverlay, 'Đang tải danh mục...');
    nguonDuLieuForm = await api.getListData();
    loadLoginData();
    utils.hideLoading(DOM.loadingOverlay);
  } catch (error) {
    console.error('Error loading data:', error);
    utils.hideLoading(DOM.loadingOverlay);
  }

  DOM.frmDangNhap.addEventListener('submit', handleLogin);
  DOM.togglePass.addEventListener('click', togglePassword);
  DOM.loginNam.addEventListener('change', () => updateTruongList());
  DOM.loginTruong.addEventListener('change', () => updateGvList());
  DOM.btnLogout.addEventListener('click', handleLogout);

  loadSavedLoginInfo();
}

function loadLoginData() {
  const frag = document.createDocumentFragment();
  frag.appendChild(new Option('-- Chọn Năm học --', ''));
  nguonDuLieuForm.namHoc.forEach(nam => 
    frag.appendChild(new Option(nam, nam))
  );
  DOM.loginNam.innerHTML = '';
  DOM.loginNam.appendChild(frag);
}

function updateTruongList() {
  const nam = DOM.loginNam.value;
  if (!nam || !nguonDuLieuForm.banDoHeThong[nam]) return;
  
  const frag = document.createDocumentFragment();
  frag.appendChild(new Option('-- Chọn Trường học --', ''));
  Object.keys(nguonDuLieuForm.banDoHeThong[nam]).forEach(truong => 
    frag.appendChild(new Option(truong, truong))
  );
  DOM.loginTruong.innerHTML = '';
  DOM.loginTruong.appendChild(frag);
}

function updateGvList() {
  const nam = DOM.loginNam.value;
  const truong = DOM.loginTruong.value;
  
  if (!nam || !truong || !nguonDuLieuForm.banDoHeThong[nam]?.[truong]) return;
  
  const frag = document.createDocumentFragment();
  frag.appendChild(new Option('-- Chọn Giáo viên --', ''));
  nguonDuLieuForm.banDoHeThong[nam][truong].forEach(gv => 
    frag.appendChild(new Option(gv.ten, gv.ten))
  );
  DOM.loginGv.innerHTML = '';
  DOM.loginGv.appendChild(frag);
}

async function handleLogin(event) {
  event.preventDefault();
  
  const nam = DOM.loginNam.value;
  const truong = DOM.loginTruong.value;
  const giaovien = DOM.loginGv.value;
  const matKhau = DOM.loginPass.value;

  if (!nam || !truong || !giaovien) {
    alert('Vui lòng chọn đầy đủ thông tin');
    return;
  }

  try {
    utils.showLoading(DOM.loadingOverlay, 'Đang xác thực...');
    const result = await api.login(nam, truong, giaovien, matKhau);
    
    if (result.success) {
      currentUser = {
        nam, truong, giaovien,
        token: result.token,
        isAdmin: result.isAdmin
      };
      
      saveLoginInfo();
      showMainApp();
    } else {
      alert(result.message || 'Đăng nhập thất bại');
    }
  } catch (error) {
    alert('Lỗi đăng nhập: ' + (error.message || 'Không xác định'));
  } finally {
    utils.hideLoading(DOM.loadingOverlay);
  }
}

function togglePassword() {
  const type = DOM.loginPass.type === 'password' ? 'text' : 'password';
  DOM.loginPass.type = type;
  DOM.togglePass.classList.toggle('fa-eye');
  DOM.togglePass.classList.toggle('fa-eye-slash');
}

function saveLoginInfo() {
  if (DOM.chkNhoDangNhap.checked) {
    utils.saveToStorage('login_nam', DOM.loginNam.value);
    utils.saveToStorage('login_truong', DOM.loginTruong.value);
    utils.saveToStorage('login_gv', DOM.loginGv.value);
    utils.saveToStorage('login_pass', DOM.loginPass.value);
    utils.saveToStorage('login_remember', true);
  } else {
    utils.removeFromStorage('login_nam');
    utils.removeFromStorage('login_truong');
    utils.removeFromStorage('login_gv');
    utils.removeFromStorage('login_pass');
    utils.saveToStorage('login_remember', false);
  }
}

function loadSavedLoginInfo() {
  const remember = utils.getFromStorage('login_remember');
  if (remember) {
    DOM.chkNhoDangNhap.checked = true;
    DOM.loginPass.value = utils.getFromStorage('login_pass') || '';
    
    const nam = utils.getFromStorage('login_nam');
    const truong = utils.getFromStorage('login_truong');
    const gv = utils.getFromStorage('login_gv');
    
    if (nam) DOM.loginNam.value = nam;
    if (truong) setTimeout(() => { DOM.loginTruong.value = truong; }, 100);
    if (gv) setTimeout(() => { DOM.loginGv.value = gv; }, 200);
  }
}

function showMainApp() {
  utils.hide(DOM.loginScreen);
  utils.show(DOM.appMainForm);
  utils.setText(DOM.userDisplayName, currentUser.giaovien);
  
  if (typeof initializeApp === 'function') {
    initializeApp();
  }
}

async function handleLogout() {
  if (!confirm('Bạn có chắc chắn muốn đăng xuất?')) return;
  
  currentUser = null;
  DOM.loginPass.value = '';
  utils.show(DOM.loginScreen);
  utils.hide(DOM.appMainForm);
}
