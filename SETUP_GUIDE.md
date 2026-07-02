# 🚀 Setup Guide - Kế Hoạch Dạy Học Theo Tuần (Web Version)

## Yêu cầu

- Node.js 16+
- npm hoặc yarn
- Google Sheets API credentials
- Google Sheets với dữ liệu

## 1️⃣ Clone Repository

```bash
git clone https://github.com/thithao05kg/KHDHTHEOTUAN.git
cd KHDHTHEOTUAN
git checkout web-version
```

## 2️⃣ Cài đặt Dependencies

```bash
npm install
```

## 3️⃣ Setup Google Sheets API

### Bước A: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới
3. Enable Google Sheets API
4. Enable Google Drive API

### Bước B: Tạo Service Account

1. Vào **Service Accounts** trong Google Cloud Console
2. Tạo service account mới
3. Tạo JSON key
4. Download và lưu là `credentials.json` ở thư mục gốc dự án

### Bước C: Chia sẻ Google Sheets

1. Lấy email service account từ file `credentials.json`
2. Chia sẻ Google Sheets với email này
3. Cấp quyền Editor

## 4️⃣ Cấu hình Environment

```bash
# Copy file mẫu
cp .env.example .env

# Chỉnh sửa .env
PORT=3000
MAIN_SPREADSHEET_ID=your_spreadsheet_id_here
FILE_IN_CHUNG_ID=your_file_id_here
```

### Lấy Spreadsheet ID

- Mở Google Sheets
- URL sẽ như: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
- Copy phần `SPREADSHEET_ID`

## 5️⃣ Chạy Server

```bash
# Development
npm run dev

# Production
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## 6️⃣ Đăng nhập

1. Mở browser: `http://localhost:3000`
2. Đăng nhập với thông tin từ Google Sheets
3. Thao tác bình thường

## 📁 Cấu trúc Dự án

```
KHDHTHEOTUAN/
├── config/
│   └── googleSheets.js       # Google Sheets service
├── api/
│   ├── controllers/          # Business logic
│   │   ├── scheduleController.js
│   │   ├── authController.js
│   │   └── ppctController.js
│   └── routes/               # API endpoints
│       ├── schedule.js
│       └── auth.js
├── public/
│   ├── index.html            # Frontend
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── api.js
│       ├── utils.js
│       └── grid.js
├── server.js                 # Entry point
├── package.json
├── .env.example
└── credentials.json          # (Không commit)
```

## 🔐 Google Sheets Structure

### giaovien sheet

| Cột | Tên | Mô tả |
|-----|-----|-------|
| A | Năm học | School year |
| B | Trường học | School |
| C | Tên giáo viên | Teacher name |
| D | (Dự trữ) | Reserved |
| E | ID file riêng | Personal file ID |
| F | Ngày bắt đầu | Start date |
| G | Tết từ | Holiday start |
| H | Tết đến | Holiday end |
| I | (Dự trữ) | Reserved |
| J | Từ ngày | Week start |
| K | Đến ngày | Week end |
| L | Mật khẩu | Password |
| M | Admin | Admin flag ("x") |

### monhoc sheet

| Cột | Tên | Mô tả |
|-----|-----|-------|
| A | Môn học | Subject |
| B | Lớp học | Class |

## 🔗 API Endpoints

### Authentication

```bash
POST /api/auth/login
Body: {
  "nam": "2024-2025",
  "truong": "Trường THCS A",
  "giaovien": "Nguyễn Văn A",
  "matKhau": "password123"
}
```

### Schedule

```bash
GET /api/schedule/get-list-data
POST /api/schedule/load-week
POST /api/schedule/save
```

## 🐛 Troubleshooting

### "Cannot find credentials.json"

→ Download service account JSON từ Google Cloud Console

### "Permission denied" error

→ Chia sẻ Google Sheets với service account email

### "Cannot load data"

→ Kiểm tra Google Sheets API đã enable
→ Xác verify Spreadsheet ID trong .env

### Port đã được sử dụng

```bash
# Sử dụng port khác
PORT=3001 npm start
```

## 📱 Responsive Design

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)

## 🚀 Deployment

### Heroku

```bash
heroku create your-app-name
heroku config:set MAIN_SPREADSHEET_ID=your_id
heroku config:set FILE_IN_CHUNG_ID=your_id

# Upload credentials.json
echo 'credentials.json' >> .gitignore
heroku config:set GOOGLE_CREDENTIALS=@credentials.json

git push heroku web-version:main
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t khdhtheotuan .
docker run -p 3000:3000 khdhtheotuan
```

## 📞 Hỗ trợ

SĐT: 0988297959

## 📄 Giấy phép

MIT
