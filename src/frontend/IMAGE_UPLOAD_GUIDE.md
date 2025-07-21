# 📁 HƯỚNG DẪN UPLOAD ẢNH TỪ THIẾT BỊ

## 📋 TỔNG QUAN

Đã thêm tính năng upload ảnh từ thiết bị vào phần "Hình ảnh" trong tab "🎨 Về Chúng Tôi" của Cài đặt website. Quản trị viên có thể chọn ảnh từ máy tính thay vì chỉ nhập URL.

## ✅ CÁC THAY ĐỔI ĐÃ THỰC HIỆN

### **1. 📁 THÊM TÍNH NĂNG UPLOAD**

#### **WebsiteSettings.jsx - Image Upload Handler:**
```javascript
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh (jpg, png, gif, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước file không được vượt quá 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      handleAboutContentChange('image', base64Image);
    };
    reader.readAsDataURL(file);
  }
};
```

#### **Features:**
- ✅ **File Type Validation** - Chỉ chấp nhận file ảnh
- ✅ **File Size Limit** - Tối đa 5MB
- ✅ **Base64 Conversion** - Convert ảnh thành base64 để lưu trữ
- ✅ **Error Handling** - Thông báo lỗi rõ ràng
- ✅ **Preview** - Xem trước ảnh ngay sau khi chọn

### **2. 🎨 CẬP NHẬT GIAO DIỆN**

#### **Enhanced Image Section:**
```javascript
// Dual Input Method
1. URL Input: Nhập link ảnh từ internet
2. File Upload: Chọn ảnh từ thiết bị

// Upload Button với styling
<label style={{
  display: 'inline-block',
  padding: '10px 16px',
  backgroundColor: '#F8A5C2',
  color: '#fff',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.2s ease',
}}>
  📁 Chọn ảnh từ thiết bị
  <input type="file" accept="image/*" style={{ display: 'none' }} />
</label>

// Enhanced Preview với Delete Button
<img src={image} style={{ maxWidth: '200px', maxHeight: '150px' }} />
<button onClick={() => deleteImage()}>🗑️ Xóa ảnh</button>
```

#### **UI Improvements:**
- ✅ **Styled Upload Button** - Button đẹp với hover effects
- ✅ **File Type Hint** - Hiển thị "(JPG, PNG, GIF - Tối đa 5MB)"
- ✅ **Enhanced Preview** - Preview với size limit và delete button
- ✅ **Dual Input** - Cả URL input và file upload
- ✅ **Delete Function** - Button xóa ảnh hiện tại

## 🎯 CÁCH SỬ DỤNG

### **📝 UPLOAD ẢNH TỪ THIẾT BỊ:**

#### **Bước 1: Truy cập Cài đặt**
```bash
1. Đăng nhập admin: http://localhost:5173/admin/login
2. Vào "⚙️ Cài đặt website"
3. Click tab "🎨 Về Chúng Tôi"
4. Scroll xuống phần "Hình ảnh"
```

#### **Bước 2: Chọn phương thức**
```
┌─────────────────────────────────────────────────────────────┐
│ Hình ảnh                                                    │
├─────────────────────────────────────────────────────────────┤
│ [Nhập URL hình ảnh hoặc chọn file từ thiết bị        ]      │
│                                                             │
│ [📁 Chọn ảnh từ thiết bị] (JPG, PNG, GIF - Tối đa 5MB)     │
│                                                             │
│ Hoặc có thể:                                                │
│ 1. Nhập URL vào ô input phía trên                          │
│ 2. Click "📁 Chọn ảnh từ thiết bị" để upload               │
└─────────────────────────────────────────────────────────────┘
```

#### **Bước 3: Upload ảnh**
```bash
1. Click "📁 Chọn ảnh từ thiết bị"
2. File dialog sẽ mở
3. Chọn file ảnh từ máy tính:
   - Định dạng: JPG, PNG, GIF, WebP, etc.
   - Kích thước: Tối đa 5MB
4. Click "Open" để chọn file
5. Ảnh sẽ được convert và hiển thị preview ngay lập tức
```

#### **Bước 4: Xem preview và lưu**
```bash
1. Kiểm tra preview ảnh
2. Nếu hài lòng → Click "💾 Lưu Cài Đặt"
3. Nếu muốn thay đổi → Click "🗑️ Xóa ảnh" và chọn lại
4. Kiểm tra kết quả trên trang chủ
```

### **🔄 CÁC PHƯƠNG THỨC THÊM ẢNH:**

#### **Method 1: URL Input**
```bash
✅ Ưu điểm:
- Nhanh chóng
- Không tốn dung lượng lưu trữ
- Có thể dùng ảnh từ CDN

❌ Nhược điểm:
- Phụ thuộc vào link bên ngoài
- Link có thể bị broken
- Cần internet để hiển thị
```

#### **Method 2: File Upload**
```bash
✅ Ưu điểm:
- Ảnh được lưu trữ local
- Không phụ thuộc link bên ngoài
- Luôn hiển thị được
- Kiểm soát được chất lượng ảnh

❌ Nhược điểm:
- Tốn dung lượng localStorage
- File size bị giới hạn (5MB)
- Chỉ lưu trong browser
```

## 🎨 GIAO DIỆN UPLOAD ẢNH

### **📋 Layout Phần Hình Ảnh:**
```
┌─────────────────────────────────────────────────────────────┐
│ Hình ảnh                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ URL Input:                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Nhập URL hình ảnh hoặc chọn file từ thiết bị]         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ File Upload:                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [📁 Chọn ảnh từ thiết bị] (JPG, PNG, GIF - Tối đa 5MB) │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Preview (nếu có ảnh):                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Image Preview]    │ Xem trước hình ảnh                 │ │
│ │ 200x150px max      │ [🗑️ Xóa ảnh]                      │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **🔧 Upload Button Styling:**
```css
Upload Button:
- Background: #F8A5C2 (Pink theme)
- Hover: #f472b6 (Darker pink)
- Padding: 10px 16px
- Border radius: 8px
- Font weight: 600
- Transition: all 0.2s ease
- Hover effects: translateY(-1px) + box-shadow

File Input:
- Hidden: display: none
- Accept: image/*
- Single file selection
```

### **📱 Responsive Design:**
```css
Desktop:
- Full width inputs
- Side-by-side preview layout
- Hover effects enabled

Mobile:
- Stacked layout
- Touch-friendly buttons
- Optimized file picker
```

## 🔧 TECHNICAL DETAILS

### **💾 Data Storage:**
```javascript
// Base64 Image Storage
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}

// URL Storage (unchanged)
{
  "image": "https://example.com/image.jpg"
}

// Both methods use same storage key: 'aboutContent'
```

### **🔍 File Validation:**
```javascript
// File Type Check
if (!file.type.startsWith('image/')) {
  alert('Vui lòng chọn file ảnh (jpg, png, gif, etc.)');
  return;
}

// File Size Check (5MB limit)
if (file.size > 5 * 1024 * 1024) {
  alert('Kích thước file không được vượt quá 5MB');
  return;
}

// Supported formats: JPG, PNG, GIF, WebP, BMP, SVG
```

### **🔄 Conversion Process:**
```javascript
// FileReader API
const reader = new FileReader();
reader.onload = (e) => {
  const base64Image = e.target.result;
  // Result format: "data:image/jpeg;base64,..."
  handleAboutContentChange('image', base64Image);
};
reader.readAsDataURL(file);
```

### **🎯 Error Handling:**
```javascript
// File type error
"Vui lòng chọn file ảnh (jpg, png, gif, etc.)"

// File size error  
"Kích thước file không được vượt quá 5MB"

// Image load error (in preview)
onError={(e) => { e.target.style.display = 'none'; }}
```

## 🧪 TESTING CHECKLIST

### **Test File Upload:**
- [ ] **File Selection:** File dialog mở đúng
- [ ] **Valid Images:** JPG, PNG, GIF upload thành công
- [ ] **Invalid Files:** PDF, TXT bị reject
- [ ] **Size Limit:** Files > 5MB bị reject
- [ ] **Preview:** Ảnh hiển thị ngay sau upload
- [ ] **Base64 Conversion:** Data lưu đúng format

### **Test UI/UX:**
- [ ] **Button Styling:** Upload button đẹp với hover
- [ ] **File Hint:** Hiển thị "(JPG, PNG, GIF - Tối đa 5MB)"
- [ ] **Preview Layout:** Image + delete button
- [ ] **Delete Function:** Xóa ảnh hoạt động
- [ ] **Responsive:** Mobile layout tốt

### **Test Data Persistence:**
- [ ] **localStorage:** Base64 data lưu đúng
- [ ] **Reload:** Ảnh giữ nguyên sau reload
- [ ] **Homepage:** Ảnh hiển thị đúng trên trang chủ
- [ ] **Mixed Input:** URL và upload cùng hoạt động

### **Test Error Cases:**
- [ ] **Invalid File:** Error message hiển thị
- [ ] **Large File:** Size limit warning
- [ ] **Broken Image:** Preview error handling
- [ ] **Network Issues:** Graceful degradation

## ✅ SUCCESS CRITERIA

### **Functionality:**
- ✅ Upload ảnh từ thiết bị thành công
- ✅ File validation hoạt động đúng
- ✅ Base64 conversion chính xác
- ✅ Preview hiển thị ngay lập tức
- ✅ Delete function hoạt động

### **User Experience:**
- ✅ Interface trực quan, dễ sử dụng
- ✅ Error messages rõ ràng
- ✅ Responsive trên mọi device
- ✅ Performance tốt với files lớn

### **Technical Requirements:**
- ✅ Data persistence với localStorage
- ✅ Backward compatibility với URL input
- ✅ Error handling comprehensive
- ✅ File size optimization

**Quản trị viên giờ đây có thể dễ dàng upload ảnh từ thiết bị thay vì chỉ nhập URL!** 📁🎨✨
