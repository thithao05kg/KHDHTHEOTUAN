import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class GoogleSheetsService {
  constructor() {
    this.sheets = null;
    this.auth = null;
    this.mainSpreadsheetId = process.env.MAIN_SPREADSHEET_ID || '1xE1-IB-Mj3L9lsazgXtB_LyNuO-5qWXNpShKqc9Z_qc';
    this.fileInChungId = process.env.FILE_IN_CHUNG_ID || '1bUC-WkDBmn1rruCHIWWGG7xolgRkkkfeGxfdpQ7EF-I';
  }

  async initialize() {
    try {
      const keyFile = path.join(__dirname, '../credentials.json');
      
      if (!fs.existsSync(keyFile)) {
        console.warn('credentials.json not found');
        return false;
      }

      const credentials = JSON.parse(fs.readFileSync(keyFile));
      
      this.auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheets = google.sheets({
        version: 'v4',
        auth: this.auth
      });

      console.log('Google Sheets API initialized');
      return true;
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
      return false;
    }
  }

  async getGiaoVienData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.mainSpreadsheetId,
        range: 'giaovien!A2:M'
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error getting GiaoVien data:', error);
      return [];
    }
  }

  async getMonHocData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.mainSpreadsheetId,
        range: 'monhoc!A2:B'
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error getting MonHoc data:', error);
      return [];
    }
  }

  async getScheduleData(spreadsheetId, tuan) {
    try {
      const startRow = 5 + (tuan - 1) * 61;
      const range = `laylich!J${startRow}:O${startRow + 59}`;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error getting schedule data:', error);
      return [];
    }
  }
}

const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
