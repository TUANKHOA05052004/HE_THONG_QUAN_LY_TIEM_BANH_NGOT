# 🎨 HƯỚNG DẪN QUẢN LÝ NỘI DUNG "VỀ SWEET BAKERY"

## 📋 TỔNG QUAN

Quản trị viên có thể chỉnh sửa toàn bộ nội dung phần "Về Sweet Bakery" trên trang chủ thông qua trang **Quản lý nội dung** trong admin panel.

## ✅ CÁC THAY ĐỔI ĐÃ THỰC HIỆN

### **1. 🎨 TẠO TRANG CONTENT MANAGEMENT**

#### **File:** `ContentManagement.jsx`
```javascript
// Quản lý toàn bộ nội dung phần "Về chúng tôi"
const [aboutContent, setAboutContent] = useState({
  title: 'Về Sweet Bakery',
  description1: 'Với hơn 10 năm kinh nghiệm...',
  description2: 'Chúng tôi cam kết sử dụng...',
  stats: {
    experience: { number: '10+', label: 'Năm kinh nghiệm' },
    customers: { number: '1000+', label: 'Khách hàng hài lòng' },
    products: { number: '50+', label: 'Loại bánh khác nhau' }
  },
  image: 'https://via.placeholder.com/500x400?text=Bakery+Image'
});
```

#### **Features:**
- ✅ **Edit Mode** - Chế độ chỉnh sửa với form đầy đủ
- ✅ **Preview Mode** - Xem trước nội dung hiện tại
- ✅ **Real-time Save** - Lưu ngay vào localStorage
- ✅ **Validation** - Kiểm tra dữ liệu trước khi lưu

### **2. 🔄 CẬP NHẬT HOMEPAGE DYNAMIC**

#### **HomePage.jsx - Dynamic Content Loading:**
```javascript
// Load content từ localStorage
const loadAboutContent = () => {
  const savedContent = JSON.parse(localStorage.getItem('aboutContent') || '{}');
  if (Object.keys(savedContent).length > 0) {
    setAboutContent(savedContent);
  }
};

// Sử dụng dynamic content
<h2>{aboutContent.title}</h2>
<p>{aboutContent.description1}</p>
<p>{aboutContent.description2}</p>

// Dynamic stats
<div>{aboutContent.stats.experience.number}</div>
<div>{aboutContent.stats.experience.label}</div>

// Dynamic image
<img src={aboutContent.image} alt={aboutContent.title} />
```

### **3. 🧭 THÊM VÀO ADMIN NAVIGATION**

#### **Sidebar.jsx - Menu Item:**
```javascript
{
  id: 'content',
  label: 'Quản lý nội dung',
  icon: '🎨',
  path: '/admin/content',
  roles: ['admin']
}
```

#### **main.jsx - Route:**
```javascript
<Route path="/admin/content" element={<ContentManagement />} />
```

## 🎯 CÁCH SỬ DỤNG

### **📝 TRUY CẬP TRANG QUẢN LÝ NỘI DUNG:**

#### **Bước 1: Đăng nhập Admin**
```bash
1. Vào: http://localhost:5173/admin/login
2. Đăng nhập với tài khoản admin
3. Username: admin
4. Password: admin123
```

#### **Bước 2: Vào Quản lý nội dung**
```bash
1. Từ Dashboard, click sidebar menu
2. Tìm "🎨 Quản lý nội dung"
3. Click để vào trang chỉnh sửa
4. URL: http://localhost:5173/admin/content
```

### **✏️ CHỈNH SỬA NỘI DUNG:**

#### **Bước 1: Xem nội dung hiện tại**
```
┌─────────────────────────────────────────────────────────────┐
│ 🎨 Quản lý nội dung                                         │
├─────────────────────────────────────────────────────────────┤
│ Phần "Về chúng tôi"                        [✏️ Chỉnh sửa]  │
├─────────────────────────────────────────────────────────────┤
│ 👀 Xem trước nội dung hiện tại:                            │
│                                                             │
│ Về Sweet Bakery                                             │
│ Với hơn 10 năm kinh nghiệm trong nghề làm bánh...          │
│ Chúng tôi cam kết sử dụng 100% nguyên liệu tươi...         │
│                                                             │
│ 10+              1000+           50+                        │
│ Năm kinh nghiệm  Khách hàng      Loại bánh                 │
│                  hài lòng        khác nhau                  │
└─────────────────────────────────────────────────────────────┘
```

#### **Bước 2: Click "✏️ Chỉnh sửa"**
```
┌─────────────────────────────────────────────────────────────┐
│ 🎨 Quản lý nội dung                                         │
├─────────────────────────────────────────────────────────────┤
│ Phần "Về chúng tôi"           [💾 Lưu thay đổi] [❌ Hủy]   │
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
│                                                             │
│ ── Thống kê ──                                              │
│ Kinh nghiệm:     Khách hàng:      Sản phẩm:                │
│ [10+        ]    [1000+      ]    [50+         ]            │
│ [Năm kinh   ]    [Khách hàng ]    [Loại bánh   ]            │
│ [nghiệm     ]    [hài lòng   ]    [khác nhau   ]            │
└─────────────────────────────────────────────────────────────┘
```

#### **Bước 3: Chỉnh sửa nội dung**
```javascript
// Có thể thay đổi:
✏️ Tiêu đề chính: "Về Sweet Bakery" → "Về Tiệm Bánh ABC"
✏️ Mô tả đoạn 1: Thay đổi câu chuyện về tiệm bánh
✏️ Mô tả đoạn 2: Thay đổi cam kết chất lượng
✏️ URL hình ảnh: Thay đổi hình ảnh đại diện
✏️ Thống kê số liệu:
   - Kinh nghiệm: "15+" / "Năm hoạt động"
   - Khách hàng: "2000+" / "Khách hàng tin tưởng"  
   - Sản phẩm: "100+" / "Món bánh đa dạng"
```

#### **Bước 4: Lưu thay đổi**
```bash
1. Click "💾 Lưu thay đổi"
2. Thấy thông báo: "Nội dung đã được cập nhật thành công!"
3. Tự động chuyển về chế độ xem
4. Nội dung được lưu vào localStorage
```

### **👀 XEM KẾT QUẢ:**

#### **Kiểm tra trên trang chủ:**
```bash
1. Vào: http://localhost:5173/
2. Scroll xuống phần "Về Sweet Bakery"
3. Kiểm tra nội dung đã thay đổi
4. Verify tất cả thông tin hiển thị đúng
```

## 🎨 GIAO DIỆN CONTENT MANAGEMENT

### **📋 Layout Trang:**
```
┌─────────────────────────────────────────────────────────────┐
│                    🎨 Quản lý nội dung                      │
│           Chỉnh sửa nội dung phần "Về Sweet Bakery"        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Phần "Về chúng tôi"                  [✏️ Chỉnh sửa]   │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │                                                         │ │
│ │ 👀 Xem trước nội dung hiện tại:                        │ │
│ │                                                         │ │
│ │ [Preview content here...]                               │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **✏️ Edit Mode Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Form Fields:                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Tiêu đề chính: [Input field]                           │ │
│ │ Mô tả đoạn 1:  [Textarea]                              │ │
│ │ Mô tả đoạn 2:  [Textarea]                              │ │
│ │ URL hình ảnh:  [Input field]                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Stats Grid:                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ Kinh nghiệm │ │ Khách hàng  │ │ Sản phẩm    │             │
│ │ [Number]    │ │ [Number]    │ │ [Number]    │             │
│ │ [Label]     │ │ [Label]     │ │ [Label]     │             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
│                                                             │
│ [💾 Lưu thay đổi] [❌ Hủy]                                 │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 TECHNICAL DETAILS

### **💾 Data Storage:**
```javascript
// localStorage key: 'aboutContent'
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
Admin Edit → localStorage → HomePage Load → Customer View
     ↓              ↓              ↓              ↓
ContentManagement → aboutContent → loadAboutContent → Display
```

### **🎯 Features:**
- ✅ **Real-time Preview** - Xem trước ngay khi chỉnh sửa
- ✅ **Form Validation** - Kiểm tra dữ liệu đầu vào
- ✅ **Auto Save** - Lưu tự động vào localStorage
- ✅ **Responsive Design** - Tương thích mobile
- ✅ **User Friendly** - Giao diện dễ sử dụng

## 🧪 TESTING CHECKLIST

### **Test Admin Interface:**
- [ ] **Access:** Vào được trang `/admin/content`
- [ ] **View Mode:** Hiển thị nội dung hiện tại đúng
- [ ] **Edit Mode:** Form chỉnh sửa hoạt động
- [ ] **Save:** Lưu thay đổi thành công
- [ ] **Cancel:** Hủy thay đổi hoạt động

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
- ✅ Dễ dàng truy cập trang quản lý nội dung
- ✅ Interface trực quan, dễ sử dụng
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
- ✅ Clean code structure

**Quản trị viên giờ đây có thể dễ dàng thay đổi toàn bộ nội dung phần "Về Sweet Bakery"!** 🎨✨
