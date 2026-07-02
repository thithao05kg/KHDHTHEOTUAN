const API_BASE = window.location.origin + '/api';

const api = {
  login: async (nam, truong, giaovien, matKhau) => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        nam, truong, giaovien, matKhau
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getListData: async () => {
    try {
      const response = await axios.get(`${API_BASE}/schedule/get-list-data`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  loadWeek: async (nam, truong, giaovien, tuan) => {
    try {
      const response = await axios.post(`${API_BASE}/schedule/load-week`, {
        nam, truong, giaovien, tuan
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  saveSchedule: async (nam, truong, giaovien, thongTinThoiGian, dataGrid, mangMaTranAnBuoi) => {
    try {
      const response = await axios.post(`${API_BASE}/schedule/save`, {
        nam, truong, giaovien, thongTinThoiGian, dataGrid, mangMaTranAnBuoi
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
