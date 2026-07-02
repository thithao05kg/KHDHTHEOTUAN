import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './api/routes/auth.js';
import scheduleRoutes from './api/routes/schedule.js';
import googleSheetsService from './config/googleSheets.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let isGoogleSheetsReady = false;

(async () => {
  isGoogleSheetsReady = await googleSheetsService.initialize();
  if (!isGoogleSheetsReady) {
    console.warn('Google Sheets API not initialized');
  }
})();

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    googleSheetsReady: isGoogleSheetsReady
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/schedule', scheduleRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('Kế Hoạch Dạy Học Theo Tuần - Web');
  console.log('========================================');
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`${isGoogleSheetsReady ? 'OK' : 'WARNING'}: Google Sheets API`);
  console.log('========================================\n');
});

export default app;
