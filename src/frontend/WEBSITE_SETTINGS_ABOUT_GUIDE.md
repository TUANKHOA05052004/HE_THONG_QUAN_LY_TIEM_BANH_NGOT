# ⚙️ HƯỚNG DẪN CHỈNH SỬA "VỀ SWEET BAKERY" TRONG CÀI ĐẶT WEBSITE

## 📋 TỔNG QUAN

Quản trị viên có thể chỉnh sửa toàn bộ nội dung phần "Về Sweet Bakery" trên trang chủ thông qua tab **"🎨 Về Chúng Tôi"** trong trang **Cài đặt website**.

## ✅ CÁC THAY ĐỔI ĐÃ THỰC HIỆN

### **1. 🎨 TÍCH HỢP VÀO WEBSITE SETTINGS**

#### **WebsiteSettings.jsx - Thêm tab mới:**
```javascript
// Thêm aboutContent vào settings state
aboutContent: {
  title: 'Về Sweet Bakery',
  description1: 'Với hơn 10 năm kinh nghiệm...',
  description2: 'Chúng tôi cam kết sử dụng...',
  stats: {
    experience: { number: '10+', label: 'Năm kinh nghiệm' },
    customers: { number: '1000+', label: 'Khách hàng hài lòng' },
    products: { number: '50+', label: 'Loại bánh khác nhau' }
  },
  image: 'https://via.placeholder.com/500x400?text=Bakery+Image'
}

// Thêm tab "🎨 Về Chúng Tôi"
<button
  style={tabStyle(activeTab === 'about')}
  onClick={() => setActiveTab('about')}
>
  🎨 Về Chúng Tôi
</button>
```

#### **Features được thêm:**
- ✅ **Tab "Về Chúng Tôi"** - Tab riêng trong Website Settings
- ✅ **Form chỉnh sửa đầy đủ** - Tất cả fields có thể edit
- ✅ **Preview real-time** - Xem trước ngay khi chỉnh sửa
- ✅ **Image preview** - Hiển thị ảnh khi nhập URL
- ✅ **Data persistence** - Lưu vào localStorage riêng

### **2. 🔄 CẬP NHẬT DATA HANDLING**

#### **Load & Save Logic:**
```javascript
// Load settings bao gồm aboutContent
const loadSettings = () => {
  const savedSettings = JSON.parse(localStorage.getItem('websiteSettings') || '{}');
  const savedAboutContent = JSON.parse(localStorage.getItem('aboutContent') || '{}');
  
  // Merge data
  
  if (Object.keys(savedAboutContent).length > 0) {
    updatedSettings.aboutContent = savedAboutContent;
  }
};

// Save riêng biệt
const saveSettings = () => {
  const { aboutContent, ...websiteSettings } = settings;
  localStorage.setItem('websiteSettings', JSON.stringify(websiteSettings));
  localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
};
```

#### **Change Handlers:**
```javascript
// Handle about content changes
const handleAboutContentChange = (field, value) => {
  setSettings(prev => ({
    ...prev,
    aboutContent: { ...prev.aboutContent, [field]: value }
  }));
};

// Handle stats changes
const handleAboutStatChange = (statKey, field, value) => {
  setSettings(prev => ({
    ...prev,
    aboutContent: {
      ...prev.aboutContent,
      stats: {
        ...prev.aboutContent.stats,
        [statKey]: { ...prev.aboutContent.stats[statKey], [field]: value }
      }
    }
  }));
};
```

### **3. 🧭 NAVIGATION CLEANUP**

#### **Removed:**
- ❌ ContentManagement.jsx file
- ❌ /admin/content route
- ❌ "Quản lý nội dung" menu item

#### **Integrated into:**
- ✅ WebsiteSettings.jsx tab system
- ✅ /admin/settings route
- ✅ "⚙️ Cài đặt website" menu

## 🎯 CÁCH SỬ DỤNG

### **📝 TRUY CẬP TRANG CÀI ĐẶT:**

#### **Bước 1: Đăng nhập Admin**
```bash
1. Vào: http://localhost:5173/admin/login
2. Đăng nhập với tài khoản admin
3. Username: admin
4. Password: admin123
```

#### **Bước 2: Vào Cài đặt website**
```bash
1. Từ Dashboard, click sidebar menu
2. Tìm "⚙️ Cài đặt website"
3. Click để vào trang cài đặt
4. URL: http://localhost:5173/admin/settings
```

#### **Bước 3: Chọn tab "Về Chúng Tôi"**
```bash
1. Trong trang Cài đặt website
2. Click tab "🎨 Về Chúng Tôi"
3. Form chỉnh sửa sẽ hiển thị
```

### **✏️ CHỈNH SỬA NỘI DUNG:**

#### **Giao diện tab "Về Chúng Tôi":**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚙️ Cài đặt website                                          │
├─────────────────────────────────────────────────────────────┤
│ [🏢 Thông Tin Chung] [📞 Thông Tin Liên Hệ] [🎉 Khuyến Mãi] [🎨 Về Chúng Tôi] │
├─────────────────────────────────────────────────────────────┤
│ 🎨 Nội dung "Về chúng tôi"                                  │
├─────────────────────────────────────────────────────────────┤
│ Tiêu đề chính:                                              │
│ [Về Sweet Bakery                                    ]       │
│                                                             │
│ Mô tả đoạn 1:                                               │
│ [Với hơn 10 năm kinh nghiệm trong nghề làm bánh...  ]       │
│                                                             │
│ Mô tả đoạn 2:                                               │
│ [Chúng tôi cam kết sử dụng 100% nguyên liệu tươi... ]       │
│                                                             │
│ URL hình ảnh:                                               │
│ [https://example.com/image.jpg                      ]       │
│ [Preview image if valid URL]                               │
│                                                             │
│ 📊 Thống kê                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ Kinh nghiệm │ │ Khách hàng  │ │ Sản phẩm    │             │
│ │ [10+    ]   │ │ [1000+  ]   │ │ [50+    ]   │             │
│ │ [Năm... ]   │ │ [Khách..]   │ │ [Loại..]    │             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
│                                                             │
│ 👀 Xem trước                                                │
│ [Preview của nội dung sẽ hiển thị như trên trang chủ]       │
│                                                             │
│                    [💾 Lưu Cài Đặt]                        │
└─────────────────────────────────────────────────────────────┘
```

#### **Các trường có thể chỉnh sửa:**
```javascript
✏️ Tiêu đề chính: "Về Sweet Bakery"
✏️ Mô tả đoạn 1: Textarea - Câu chuyện về tiệm bánh
✏️ Mô tả đoạn 2: Textarea - Cam kết chất lượng
✏️ URL hình ảnh: Input - Link ảnh đại diện (có preview)
✏️ Thống kê kinh nghiệm:
   - Số liệu: "10+"
   - Nhãn: "Năm kinh nghiệm"
✏️ Thống kê khách hàng:
   - Số liệu: "1000+"
   - Nhãn: "Khách hàng hài lòng"
✏️ Thống kê sản phẩm:
   - Số liệu: "50+"
   - Nhãn: "Loại bánh khác nhau"
```

#### **Bước 4: Lưu thay đổi**
```bash
1. Chỉnh sửa các trường cần thiết
2. Xem preview ở cuối form
3. Click "💾 Lưu Cài Đặt"
4. Thấy thông báo: "Cài đặt đã được lưu thành công!"
5. Nội dung được lưu vào localStorage
```

### **👀 XEM KẾT QUẢ:**

#### **Kiểm tra trên trang chủ:**
```bash
1. Vào: http://localhost:5173/
2. Scroll xuống phần "Về Sweet Bakery"
3. Kiểm tra nội dung đã thay đổi
4. Verify tất cả thông tin hiển thị đúng
```

## 🎨 GIAO DIỆN TAB "VỀ CHÚNG TÔI"

### **📋 Layout Tab:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🎨 Nội dung "Về chúng tôi"                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Basic Information:                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Tiêu đề chính: [Input]                                 │ │
│ │ Mô tả đoạn 1:  [Textarea]                              │ │
│ │ Mô tả đoạn 2:  [Textarea]                              │ │
│ │ URL hình ảnh:  [Input] + [Image Preview]               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 📊 Thống kê:                                                │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ Kinh nghiệm │ │ Khách hàng  │ │ Sản phẩm    │             │
│ │ Số liệu:    │ │ Số liệu:    │ │ Số liệu:    │             │
│ │ [Input]     │ │ [Input]     │ │ [Input]     │             │
│ │ Nhãn:       │ │ Nhãn:       │ │ Nhãn:       │             │
│ │ [Input]     │ │ [Input]     │ │ [Input]     │             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
│                                                             │
│ 👀 Xem trước:                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Live preview của nội dung như trên trang chủ]         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **🔧 Features:**
- ✅ **Real-time Preview** - Xem trước ngay khi chỉnh sửa
- ✅ **Image Preview** - Hiển thị ảnh khi nhập URL hợp lệ
- ✅ **Form Validation** - Kiểm tra dữ liệu đầu vào
- ✅ **Responsive Design** - Tương thích mobile
- ✅ **Grid Layout** - Stats được sắp xếp đẹp mắt

## 🔧 TECHNICAL DETAILS

### **💾 Data Storage:**
```javascript
// localStorage keys:
// 1. 'websiteSettings' - General website settings
// 2. 'aboutContent' - About us content (separate)

// aboutContent structure:
{
  "title": "Về Sweet Bakery",
  "description1": "Với hơn 10 năm kinh nghiệm...",
  "description2": "Chúng tôi cam kết sử dụng...",
  "stats": {
    "experience": { "number": "10+", "label": "Năm kinh nghiệm" },
    "customers": { "number": "1000+", "label": "Khách hàng hài lòng" },
    "products": { "number": "50+", "label": "Loại bánh khác nhau" }
  },
  "image": "https://via.placeholder.com/500x400?text=Bakery+Image"
}
```

### **🔄 Data Flow:**
```
WebsiteSettings Tab → localStorage → HomePage Load → Customer View
        ↓                ↓              ↓              ↓
    Edit Form → aboutContent → loadAboutContent → Display
```

### **🎯 Integration Benefits:**
- ✅ **Centralized Settings** - Tất cả cài đặt ở một nơi
- ✅ **Consistent UI** - Cùng design pattern với các tabs khác
- ✅ **Better UX** - Không cần navigate giữa nhiều trang
- ✅ **Easier Maintenance** - Ít files để quản lý

## 🧪 TESTING CHECKLIST

### **Test Website Settings:**
- [ ] **Access:** Vào được `/admin/settings`
- [ ] **Tab Navigation:** Switch giữa các tabs
- [ ] **About Tab:** Tab "🎨 Về Chúng Tôi" hiển thị
- [ ] **Form Fields:** Tất cả inputs hoạt động
- [ ] **Preview:** Real-time preview cập nhật
- [ ] **Image Preview:** Ảnh hiển thị khi nhập URL
- [ ] **Save:** Lưu thành công với thông báo

### **Test Customer Interface:**
- [ ] **Homepage:** Phần "Về Sweet Bakery" hiển thị
- [ ] **Dynamic Content:** Nội dung thay đổi theo admin
- [ ] **Stats:** Thống kê hiển thị đúng
- [ ] **Image:** Hình ảnh load đúng
- [ ] **Responsive:** Mobile hiển thị tốt

### **Test Data Persistence:**
- [ ] **localStorage:** Data lưu đúng format
- [ ] **Reload:** Nội dung giữ nguyên sau reload
- [ ] **Cross-tab:** Thay đổi sync giữa các tab

## ✅ SUCCESS CRITERIA

### **Admin Experience:**
- ✅ Dễ dàng truy cập trong Cài đặt website
- ✅ Interface nhất quán với các tabs khác
- ✅ Chỉnh sửa nhanh chóng, hiệu quả
- ✅ Xem trước nội dung trước khi lưu

### **Customer Experience:**
- ✅ Nội dung hiển thị chính xác
- ✅ Design đẹp, professional
- ✅ Load nhanh, không lag
- ✅ Responsive trên mọi device

### **Technical Requirements:**
- ✅ Data persistence với localStorage
- ✅ Real-time updates
- ✅ Error handling
- ✅ Clean integration với existing code

**Quản trị viên giờ đây có thể dễ dàng thay đổi nội dung "Về Sweet Bakery" ngay trong Cài đặt website!** ⚙️🎨✨
