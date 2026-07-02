# Hướng dẫn Đóng góp

## Code of Conduct

Chúng tôi cam kết duy trì một cộng đồng tôn trọng, bao dung và an toàn.

## Cách Đóng Góp

### 1. Fork Repository

```bash
# Click Fork button trên GitHub
```

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/KHDHTHEOTUAN.git
cd KHDHTHEOTUAN
```

### 3. Create Feature Branch

```bash
git checkout -b feature/your-feature
```

### 4. Make Changes

- Code theo chuẩn
- Thêm comments khi cần
- Test thay đổi

### 5. Commit Changes

```bash
git commit -m "feat: add your feature"
# hoặc
git commit -m "fix: fix bug description"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature
```

### 7. Create Pull Request

- Mô tả thay đổi rõ ràng
- Reference issues nếu có
- Đợi review

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - Feature mới
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactor
- `test` - Tests
- `chore` - Maintenance

### Ví dụ

```
feat(schedule): add export to PDF

Implements PDF export functionality for weekly schedule.

Closes #123
```

## Reporting Bugs

Khi report bug, hãy cung cấp:

1. **Mô tả lỗi**: Lỗi gì xảy ra
2. **Steps to reproduce**: Cách lặp lại lỗi
3. **Expected behavior**: Kết quả mong đợi
4. **Actual behavior**: Kết quả thực tế
5. **Screenshots**: Nếu có
6. **Environment**: OS, browser, Node version

## Requesting Features

Khi yêu cầu feature:

1. **Tiêu đề**: Mô tả rõ feature
2. **Mô tả**: Giải thích use case
3. **Lợi ích**: Tại sao cần feature này
4. **Ví dụ**: Nếu có

## Style Guide

### JavaScript

```javascript
// ✅ Good
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const result = await api.save(data);
    showSuccess('Saved successfully');
  } catch (error) {
    showError(error.message);
  }
};

// ❌ Bad
function handleSubmit(event) {
  event.preventDefault();
  api.save(data).then(result => {
    alert('OK');
  });
}
```

### CSS

```css
/* ✅ Good */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

/* ❌ Bad */
.btn-primary {
  background: #1a73e8;
  color: #fff;
  padding: 8px 16px;
}
```

## Testing

Nhớ test thay đổi của bạn:

```bash
# Start server
npm start

# Test locally
# - Mở http://localhost:3000
# - Test đăng nhập
# - Test các feature thay đổi
# - Kiểm tra responsive
```

## Documentation

- Update README nếu thay đổi hành vi
- Update SETUP_GUIDE nếu có step mới
- Add comments cho complex logic

## Questions?

- Hỏi trên Issues
- Email: thithao05kg@gmail.com
- SĐT: 0988297959

Cảm ơn đã đóng góp! 🙏
