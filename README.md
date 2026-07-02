# Kế Hoạch Dạy Học Theo Tuần - Web Version

**Chuyển đổi từ Google Apps Script sang Web Application độc lập**

## Features

- ✅ Quản lý lịch báo giảng tuần theo tuần
- ✅ Xác thực người dùng (Giáo viên & Admin)
- ✅ Lấy dữ liệu từ Google Sheets
- ✅ Phân quyền Admin & Giáo viên
- ✅ Responsive design (Desktop & Mobile)

## Yêu cầu

- Node.js 16+
- npm hoặc yarn
- Google Sheets API credentials

## Installation

```bash
# Clone
git clone https://github.com/thithao05kg/KHDHTHEOTUAN.git
cd KHDHTHEOTUAN
git checkout web-version

# Install
npm install

# Setup environment
cp .env.example .env

# Get Google Sheets credentials
# Download from: https://console.cloud.google.com/
# Save as: credentials.json

# Run
npm start
```

Open: http://localhost:3000

## Google Sheets Setup

1. Create service account in Google Cloud Console
2. Download JSON credentials
3. Share your Google Sheets with service account email
4. Add spreadsheet ID to .env

## Data Flow

```
Web Frontend → API Routes → Google Sheets Service → Google Sheets
```

## API Endpoints

- `POST /api/auth/login` - Login
- `GET /api/schedule/get-list-data` - Get all data
- `POST /api/schedule/load-week` - Load week schedule
- `POST /api/schedule/save` - Save schedule

## Project Structure

```
├── server.js                 # Entry point
├── config/
│   └── googleSheets.js      # Google Sheets service
├── api/
│   ├── routes/              # API routes
│   └── controllers/         # Business logic
└── public/
    ├── index.html           # Frontend
    ├── js/                  # Client JS
    └── css/                 # Styles
```

## License

MIT
