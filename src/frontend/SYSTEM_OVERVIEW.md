# 🧁 HỆ THỐNG QUẢN LÝ TIỆM BÁNH NGỌT

## 📋 TỔNG QUAN HỆ THỐNG

Hệ thống quản lý tiệm bánh ngọt được thiết kế với giao diện hiện đại, thân thiện và đầy đủ tính năng để quản lý toàn bộ hoạt động của tiệm bánh.

## 🎨 THIẾT KẾ GIAO DIỆN

### **Màu sắc chủ đạo:**
- **Màu chính:** #F8A5C2 (Hồng nhạt bánh ngọt)
- **Màu phụ:** #FF85A2 (Hồng đậm)
- **Màu nền:** #f9fafb (Trắng xám nhẹ)
- **Màu text:** #1f2937 (Xám đen)

### **Phong cách:**
- Modern & Clean Design
- Responsive Layout
- Gradient Backgrounds
- Card-based Components
- Smooth Animations

## 🏗️ CẤU TRÚC HỆ THỐNG

### **1. 🔐 Trang Đăng nhập**
- **File:** `src/pages/LoginForm.jsx`
- **Tính năng:**
  - Đăng nhập bằng username/email + password
  - Giao diện gradient đẹp mắt
  - Validation form
  - Responsive design

### **2. 📊 Dashboard Chính**
- **File:** `src/pages/Dashboard.jsx`
- **Tính năng:**
  - Thống kê tổng quan (sản phẩm, đơn hàng, doanh thu, người dùng)
  - Hoạt động gần đây
  - Thao tác nhanh
  - Cards với gradient đẹp mắt

### **3. 👥 Quản lý Tài khoản**
- **File:** `src/pages/AccountManagement.jsx`
- **Quyền truy cập:** Chỉ Admin
- **Tính năng:**
  - Danh sách tài khoản dạng bảng
  - Thêm/sửa/xóa tài khoản
  - Tìm kiếm và lọc theo vai trò
  - Modal form đẹp mắt
  - Phân quyền: Admin, Manager, Staff

### **4. 🧁 Quản lý Sản phẩm**
- **File:** `src/pages/ProductManagement.jsx`
- **Quyền truy cập:** Admin & Manager
- **Tính năng:**
  - Hiển thị sản phẩm dạng grid cards
  - Thêm/sửa/xóa sản phẩm
  - Upload hình ảnh
  - Quản lý danh mục (bánh kem, cupcake, bánh quy, etc.)
  - Quản lý tồn kho
  - Tìm kiếm và lọc

### **5. 📋 Quản lý Hóa đơn**
- **File:** `src/pages/OrderManagement.jsx`
- **Quyền truy cập:** Tất cả vai trò
- **Tính năng:**
  - Danh sách hóa đơn dạng bảng
  - Chi tiết hóa đơn trong modal
  - Cập nhật trạng thái đơn hàng
  - Thống kê doanh thu
  - Tìm kiếm và lọc theo ngày, trạng thái
  - In hóa đơn

## 🧩 COMPONENTS TÁI SỬ DỤNG

### **UI Components:**
- **Card** (`src/components/ui/Card.jsx`): Container đẹp mắt
- **Table** (`src/components/ui/Table.jsx`): Bảng dữ liệu responsive
- **Modal** (`src/components/ui/Modal.jsx`): Popup với animation
- **FormField** (`src/components/ui/FormField.jsx`): Input, Select, Textarea

### **Layout Components:**
- **Sidebar** (`src/components/layout/Sidebar.jsx`): Menu điều hướng
- **Header** (`src/components/layout/Header.jsx`): Header với breadcrumb

## 🔐 PHÂN QUYỀN HỆ THỐNG

### **Admin (Quản trị viên):**
- ✅ Tất cả quyền
- ✅ Quản lý tài khoản
- ✅ Quản lý sản phẩm
- ✅ Quản lý hóa đơn
- ✅ Xem báo cáo
- ✅ Cài đặt hệ thống

### **Manager (Quản lý):**
- ❌ Quản lý tài khoản
- ✅ Quản lý sản phẩm
- ✅ Quản lý hóa đơn
- ✅ Xem báo cáo
- ❌ Cài đặt hệ thống

### **Staff (Nhân viên):**
- ❌ Quản lý tài khoản
- ❌ Quản lý sản phẩm
- ✅ Quản lý hóa đơn (chỉ xem và cập nhật)
- ❌ Xem báo cáo
- ❌ Cài đặt hệ thống

## 🚀 ROUTING & NAVIGATION

```javascript
/                           → Redirect to /login
/login                      → Trang đăng nhập
/dashboard                  → Dashboard chính (Protected)
/dashboard/accounts         → Quản lý tài khoản (Admin only)
/dashboard/products         → Quản lý sản phẩm (Admin & Manager)
/dashboard/orders           → Quản lý hóa đơn (All roles)
```

## 📱 RESPONSIVE DESIGN

- **Desktop:** Full layout với sidebar
- **Tablet:** Sidebar có thể thu gọn
- **Mobile:** Sidebar overlay, cards responsive

## 🎯 TÍNH NĂNG NỔI BẬT

### **1. Giao diện đẹp mắt:**
- Gradient backgrounds
- Smooth animations
- Modern card design
- Consistent color scheme

### **2. User Experience:**
- Intuitive navigation
- Quick actions
- Real-time updates
- Loading states

### **3. Functionality:**
- CRUD operations
- Search & Filter
- Role-based access
- Data validation

### **4. Performance:**
- Optimized components
- Lazy loading
- Efficient state management

## 🔧 CÔNG NGHỆ SỬ DỤNG

- **Frontend:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Inline Styles (Custom)
- **Icons:** Unicode Emojis
- **State:** React Hooks (useState, useEffect)

## 📦 CẤU TRÚC THỦ MUC

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── ui/
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── Modal.jsx
│   │   └── FormField.jsx
│   └── [existing components]
├── pages/
│   ├── LoginForm.jsx
│   ├── Dashboard.jsx
│   ├── AccountManagement.jsx
│   ├── ProductManagement.jsx
│   └── OrderManagement.jsx
├── api/
│   └── Login.js
└── main.jsx
```

## 🎨 DEMO DATA

Hệ thống đã được tích hợp sẵn dữ liệu mẫu để demo:
- **Tài khoản:** admin, quanly, nhanvien1-3
- **Sản phẩm:** Các loại bánh ngọt đa dạng
- **Hóa đơn:** Đơn hàng mẫu với các trạng thái khác nhau

## 🚀 HƯỚNG DẪN CHẠY

1. **Khởi động Frontend:**
   ```bash
   cd src/frontend
   npm run dev
   ```

2. **Khởi động Backend:**
   ```bash
   cd src/backend
   npm run dev
   ```

3. **Truy cập:** http://localhost:5173

4. **Đăng nhập:**
   - Username: `admin` | Password: `admin123`
   - Username: `quanly` | Password: `quanly123`
   - Username: `nhanvien1` | Password: `nhanvien123`

## 🎉 KẾT LUẬN

Hệ thống quản lý tiệm bánh ngọt đã được thiết kế hoàn chỉnh với:
- ✅ Giao diện đẹp mắt, hiện đại
- ✅ Tính năng đầy đủ cho quản lý tiệm bánh
- ✅ Phân quyền rõ ràng
- ✅ Responsive design
- ✅ Code clean và có thể mở rộng

**Hệ thống sẵn sàng để sử dụng và có thể dễ dàng tùy chỉnh theo nhu cầu cụ thể!** 🧁✨
