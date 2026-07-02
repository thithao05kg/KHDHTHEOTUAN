# Architecture & Development Guide

## 🏗️ Architecture

```
┌─────────────────────────┐
│   Frontend (Browser)    │
│  HTML/CSS/JavaScript    │
└────────────┬────────────┘
             │ HTTP/REST
┌────────────▼────────────┐
│   Express Server        │
│   (Node.js)             │
│   - Routes              │
│   - Controllers         │
│   - Middleware          │
└────────────┬────────────┘
             │ Google Sheets API
┌────────────▼────────────┐
│  Google Sheets Service  │
│  - Read                 │
│  - Write                │
│  - Auth                 │
└────────────┬────────────┘
             │
┌────────────▼────────────┐
│   Google Sheets (DB)    │
│   - giaovien            │
│   - monhoc              │
│   - Personal sheets     │
└─────────────────────────┘
```

## 🔄 Data Flow

### Login

1. User nhập thông tin
2. Frontend gọi `POST /api/auth/login`
3. Backend tìm kiếm dữ liệu từ Google Sheets (giaovien sheet)
4. Verify mật khẩu
5. Trả về JWT token
6. Frontend lưu token vào localStorage

### Load Schedule

1. User chọn tuần
2. Frontend gọi `POST /api/schedule/load-week`
3. Backend lấy Spreadsheet ID của giáo viên từ Google Sheets
4. Backend gọi Google Sheets API để lấy dữ liệu tuần
5. Parse dữ liệu và trả về frontend
6. Frontend hiển thị trên grid

### Save Schedule

1. User nhấn Lưu
2. Frontend gọi `POST /api/schedule/save`
3. Backend validate dữ liệu
4. Backend gửi dữ liệu đến Google Sheets
5. Google Sheets cập nhật
6. Trả về success message

## 📝 Adding New Features

### Thêm API Endpoint

1. Tạo controller method

```javascript
// api/controllers/yourController.js
export const yourAction = async (req, res) => {
  try {
    // Your logic
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

2. Thêm route

```javascript
// api/routes/yourRoute.js
import * as yourController from '../controllers/yourController.js';

const router = express.Router();
router.post('/your-endpoint', yourController.yourAction);
export default router;
```

3. Mount route trong server.js

```javascript
import yourRoutes from './api/routes/yourRoute.js';
app.use('/api/your-path', yourRoutes);
```

### Thêm Frontend Function

```javascript
// public/js/yourModule.js
function yourFunction() {
  // Your code
}

// Gọi API
const result = await api.yourEndpoint(params);
```

## 🧪 Testing

### Manual Testing

1. Mở DevTools (F12)
2. Kiểm tra Network tab
3. Kiểm tra Console log

### API Testing

```bash
# Sử dụng curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "nam": "2024-2025",
    "truong": "Trường THCS A",
    "giaovien": "Nguyễn Văn A",
    "matKhau": "password123"
  }'
```

## 📊 Performance Tips

- Cache dữ liệu danh mục trên client
- Sử dụng pagination cho dữ liệu lớn
- Minimize API calls
- Compress CSS/JS trong production

## 🔒 Security

- ✅ Input validation
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ SQL injection prevention (via Google Sheets API)

## 📚 Dependencies

- `express` - Web framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `googleapis` - Google Sheets API
- `axios` - HTTP client (frontend)
- `handsontable` - Data grid
- `flatpickr` - Date picker

## 🔄 Version Control

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat: your feature description"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request
```

## 📖 Code Style

- Use arrow functions
- Use const/let (not var)
- Use async/await (not callbacks)
- Add comments for complex logic
- Use meaningful variable names

## 🚀 Continuous Integration

Setup GitHub Actions for:
- Linting
- Testing
- Deployment

## 📞 Support

Gặp lỗi? Hãy:
1. Kiểm tra Console log
2. Kiểm tra Network requests
3. Xem SETUP_GUIDE.md
4. Liên hệ: 0988297959
