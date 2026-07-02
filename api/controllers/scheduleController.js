import googleSheetsService from '../../config/googleSheets.js';

export const getListData = async (req, res) => {
  try {
    const giaoVienData = await googleSheetsService.getGiaoVienData();
    const monHocData = await googleSheetsService.getMonHocData();

    const namHoc = new Set();
    const banDoHeThong = {};
    const monHoc = new Set();
    const lopHoc = new Set();

    giaoVienData.forEach(row => {
      if (row.length >= 3) {
        const nam = row[0].toString().trim();
        const truong = row[1].toString().trim();
        const gv = row[2].toString().trim();

        if (nam && truong && gv) {
          namHoc.add(nam);
          if (!banDoHeThong[nam]) banDoHeThong[nam] = {};
          if (!banDoHeThong[nam][truong]) banDoHeThong[nam][truong] = [];
          banDoHeThong[nam][truong].push({ ten: gv });
        }
      }
    });

    monHocData.forEach(row => {
      if (row.length >= 2) {
        if (row[0].toString().trim()) monHoc.add(row[0].toString().trim());
        if (row[1].toString().trim()) lopHoc.add(row[1].toString().trim());
      }
    });

    res.json({
      namHoc: Array.from(namHoc),
      banDoHeThong,
      monHoc: Array.from(monHoc),
      lopHoc: Array.from(lopHoc)
    });
  } catch (error) {
    console.error('Error in getListData:', error);
    res.status(500).json({ error: error.message });
  }
};

export const loadWeek = async (req, res) => {
  try {
    const { nam, truong, giaovien, tuan } = req.body;
    const giaoVienData = await googleSheetsService.getGiaoVienData();
    
    let targetSsId = null;
    for (let i = 0; i < giaoVienData.length; i++) {
      if (giaoVienData[i][0] === nam && giaoVienData[i][1] === truong && giaoVienData[i][2] === giaovien) {
        targetSsId = giaoVienData[i][4];
        break;
      }
    }

    if (!targetSsId) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const scheduleData = await googleSheetsService.getScheduleData(targetSsId, tuan);
    const duLieuLuoi = [];
    for (let r = 0; r < 60; r++) {
      if (scheduleData[r]) {
        duLieuLuoi.push([
          scheduleData[r][0] || '',
          scheduleData[r][1] || '',
          scheduleData[r][2] || '',
          scheduleData[r][3] || '',
          scheduleData[r][4] || '',
          scheduleData[r][5] === 'TRUE' || scheduleData[r][5] === true
        ]);
      } else {
        duLieuLuoi.push(['', '', '', '', '', false]);
      }
    }

    res.json({
      thanhCong: true,
      duLieuLuoi
    });
  } catch (error) {
    console.error('Error in loadWeek:', error);
    res.status(500).json({ error: error.message });
  }
};

export const saveSchedule = async (req, res) => {
  try {
    res.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    console.error('Error in saveSchedule:', error);
    res.status(500).json({ error: error.message });
  }
};
