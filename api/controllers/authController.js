import googleSheetsService from '../../config/googleSheets.js';

export const login = async (req, res) => {
  try {
    const { nam, truong, giaovien, matKhau } = req.body;
    const giaoVienData = await googleSheetsService.getGiaoVienData();

    let foundTeacher = null;
    for (let i = 0; i < giaoVienData.length; i++) {
      if (giaoVienData[i][0] === nam && giaoVienData[i][1] === truong && giaoVienData[i][2] === giaovien) {
        foundTeacher = giaoVienData[i];
        break;
      }
    }

    if (!foundTeacher) {
      return res.status(401).json({ success: false, message: 'Teacher not found' });
    }

    const storedPassword = foundTeacher[11] || '';
    const isPasswordValid = matKhau === storedPassword || storedPassword === '';

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const isAdmin = (foundTeacher[12] || '').toLowerCase() === 'x';
    const token = 'token_' + Date.now();

    res.json({
      success: true,
      token,
      isAdmin,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
