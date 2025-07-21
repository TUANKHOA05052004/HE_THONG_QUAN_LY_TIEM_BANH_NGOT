# 🔐 TÀI KHOẢN ĐĂNG NHẬP HỆ THỐNG

## 📋 TỔNG QUAN

Hệ thống quản lý tiệm bánh ngọt có 2 giao diện riêng biệt:

1. **🛍️ Giao diện Khách hàng** - Cho người mua hàng (giữ nguyên)
2. **⚙️ Giao diện Quản trị** - Chỉ 2 vai trò: **Quản trị viên** và **Nhân viên**

---

## 🛍️ GIAO DIỆN KHÁCH HÀNG

### **🌐 URL Truy Cập:**
```
http://localhost:5173/customer/login
```

### **👤 Tài Khoản Demo:**

#### **Khách hàng 1:**
- **Email:** `customer1@email.com`
- **Password:** `123456`
- **Tên:** Nguyễn Văn A

#### **Khách hàng 2:**
- **Email:** `customer2@email.com`
- **Password:** `123456`
- **Tên:** Trần Thị B

#### **Khách hàng 3:**
- **Email:** `customer3@email.com`
- **Password:** `123456`
- **Tên:** Lê Văn C

### **🔑 Tính Năng Khách Hàng:**
- ✅ Đăng ký tài khoản mới
- ✅ Đăng nhập/đăng xuất
- ✅ Duyệt sản phẩm
- ✅ Thêm vào giỏ hàng
- ✅ Thanh toán đơn hàng
- ✅ Theo dõi đơn hàng
- ✅ Quản lý thông tin cá nhân

---

## ⚙️ GIAO DIỆN QUẢN TRỊ (2 VAI TRÒ)

### **🌐 URL Truy Cập:**
```
http://localhost:5173/admin/login
```

### **👨‍💼 VAI TRÒ 1: QUẢN TRỊ VIÊN**

#### **Tài khoản Quản trị viên:**

**Admin 1:**
- **Username:** `admin`
- **Password:** `admin123`
- **Vai trò:** Administrator
- **Tên:** Quản trị viên chính

**Admin 2:**
- **Username:** `admin2`
- **Password:** `admin123`
- **Vai trò:** Administrator
- **Tên:** Quản trị viên phụ

#### **🔑 Quyền hạn Quản trị viên:**
- ✅ **Quản lý tài khoản nhân viên** (thêm/sửa/xóa)
- ✅ **Quản lý sản phẩm** (thêm/sửa/xóa/danh mục)
- ✅ **Quản lý hóa đơn** (xem/cập nhật/in)
- ✅ **Xem báo cáo** (doanh thu/thống kê)
- ✅ **Cài đặt hệ thống** (cấu hình chung)
- ✅ **Toàn quyền truy cập** tất cả modules

#### **📍 Chuyển hướng sau đăng nhập:**
```
/admin/login → /admin/dashboard
```
- Truy cập Dashboard tổng quan
- Thấy tất cả menu: Accounts, Products, Orders

### **👨‍💻 VAI TRÒ 2: NHÂN VIÊN**

#### **Tài khoản Nhân viên:**

**Nhân viên 1:**
- **Username:** `nhanvien1`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Nguyễn Văn Nhân Viên

**Nhân viên 2:**
- **Username:** `nhanvien2`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Trần Thị Nhân Viên

**Nhân viên 3:**
- **Username:** `nhanvien3`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Lê Văn Nhân Viên

#### **🔑 Quyền hạn Nhân viên:**
- ❌ **Quản lý tài khoản** (không được phép)
- ❌ **Quản lý sản phẩm** (không được phép)
- ✅ **Quản lý hóa đơn** (chỉ xem và cập nhật trạng thái)
- ❌ **Xem báo cáo** (không được phép)
- ❌ **Cài đặt hệ thống** (không được phép)
- ✅ **In hóa đơn** (được phép)

#### **📍 Chuyển hướng sau đăng nhập:**
```
/admin/login → /admin/dashboard/orders
```
- Truy cập trực tiếp trang quản lý hóa đơn
- Chỉ thấy menu Orders

---

## 🛡️ PHÂN QUYỀN CHI TIẾT

### **Route Protection:**

#### **Chỉ Quản trị viên:**
```javascript
/admin/dashboard/accounts  → Cần role: ['admin']
/admin/dashboard/products  → Cần role: ['admin'] 
/admin/dashboard/reports   → Cần role: ['admin']
```

#### **Cả Quản trị viên & Nhân viên:**
```javascript
/admin/dashboard          → Cần role: ['admin', 'staff']
/admin/dashboard/orders   → Cần role: ['admin', 'staff']
```

#### **Public (Khách hàng):**
```javascript
/                         → Trang chủ
/shop                     → Sản phẩm
/product/:id              → Chi tiết sản phẩm
/cart                     → Giỏ hàng (cần login)
/checkout                 → Thanh toán (cần login)
```

---

## 🧪 HƯỚNG DẪN TEST

### **🔧 Test Quản trị viên:**
```bash
URL: http://localhost:5173/admin/login
Username: admin
Password: admin123

Kết quả:
✅ Truy cập được tất cả modules
✅ Thấy menu: Dashboard, Accounts, Products, Orders
✅ Có thể thêm/sửa/xóa tài khoản nhân viên
✅ Có thể quản lý sản phẩm
✅ Có thể xem báo cáo
✅ Có thể in hóa đơn
```

### **👨‍💻 Test Nhân viên:**
```bash
URL: http://localhost:5173/admin/login
Username: nhanvien1
Password: nhanvien123

Kết quả:
✅ Chuyển thẳng đến /admin/dashboard/orders
✅ Chỉ thấy menu: Orders
❌ Không thể truy cập /admin/dashboard/accounts
❌ Không thể truy cập /admin/dashboard/products
✅ Chỉ có thể xem và cập nhật đơn hàng
✅ Có thể in hóa đơn
```

### **🛍️ Test Khách hàng:**
```bash
URL: http://localhost:5173/customer/login
Email: customer1@email.com
Password: 123456

Kết quả:
✅ Chuyển về trang chủ /
✅ Có thể duyệt sản phẩm
✅ Có thể thêm vào giỏ hàng
✅ Có thể thanh toán
✅ Có thể theo dõi đơn hàng
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### **1. Login API (Updated):**
```javascript
// src/api/Login.js
const users = {
  // QUẢN TRỊ VIÊN
  'admin': { role: 'admin', name: 'Quản trị viên chính' },
  'admin2': { role: 'admin', name: 'Quản trị viên phụ' },
  
  // NHÂN VIÊN  
  'nhanvien1': { role: 'staff', name: 'Nguyễn Văn Nhân Viên' },
  'nhanvien2': { role: 'staff', name: 'Trần Thị Nhân Viên' },
  'nhanvien3': { role: 'staff', name: 'Lê Văn Nhân Viên' }
};
```

### **2. Redirect Logic:**
```javascript
// src/pages/LoginForm.jsx
const getRedirectPath = (userRole) => {
  switch (userRole) {
    case 'admin':
      return '/admin/dashboard'; // Quản trị viên → Dashboard
    case 'staff':
      return '/admin/dashboard/orders'; // Nhân viên → Orders
    default:
      return '/admin/dashboard';
  }
};
```

### **3. Route Protection:**
```javascript
// src/main.jsx
// Chỉ Admin
<Route path="/admin/dashboard/accounts" element={
  <RoleProtectedRoute allowedRoles={['admin']}>
    <AccountManagement />
  </RoleProtectedRoute>
} />

// Admin & Staff
<Route path="/admin/dashboard/orders" element={
  <RoleProtectedRoute allowedRoles={['admin', 'staff']}>
    <OrderManagement />
  </RoleProtectedRoute>
} />
```

### **4. Role Options (Updated):**
```javascript
// src/pages/AccountManagement.jsx
const roleOptions = [
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'staff', label: 'Nhân viên' }
];
```

---

## 📊 TỔNG KẾT TÀI KHOẢN

### **Hệ thống Admin (5 tài khoản):**
- **2 Quản trị viên:** `admin/admin123`, `admin2/admin123`
- **3 Nhân viên:** `nhanvien1-3/nhanvien123`

### **Hệ thống Customer (3+ tài khoản):**
- **3 Demo:** `customer1-3@email.com/123456`
- **Unlimited:** Đăng ký không giới hạn

### **Phân quyền rõ ràng:**
- **Admin:** Toàn quyền (Accounts + Products + Orders)
- **Staff:** Chỉ quản lý đơn hàng (Orders only)
- **Customer:** Mua sắm và đặt hàng

---

## 🎯 DEMO NHANH

### **Admin Demo:**
1. Vào: http://localhost:5173/admin/login
2. Login: `admin/admin123`
3. Thấy tất cả menu → Có thể quản lý accounts, products, orders

### **Staff Demo:**
1. Vào: http://localhost:5173/admin/login  
2. Login: `nhanvien1/nhanvien123`
3. Chuyển thẳng đến Orders → Chỉ quản lý đơn hàng

### **Customer Demo:**
1. Vào: http://localhost:5173/
2. Duyệt sản phẩm → Thêm vào giỏ → Checkout
3. Login: `customer1@email.com/123456`

---

## ✅ KẾT LUẬN

**Hệ thống đã được đơn giản hóa:**

### **Giao diện Admin:**
- ✅ **2 vai trò rõ ràng:** Quản trị viên & Nhân viên
- ✅ **Phân quyền chặt chẽ:** Admin toàn quyền, Staff chỉ orders
- ✅ **Route protection:** Bảo mật theo vai trò
- ✅ **Auto redirect:** Chuyển hướng phù hợp

### **Giao diện Customer:**
- ✅ **Giữ nguyên:** Đầy đủ tính năng e-commerce
- ✅ **Unlimited accounts:** Đăng ký không giới hạn
- ✅ **Full shopping:** Từ browse đến checkout

**Hệ thống quản lý tiệm bánh ngọt với phân quyền 2 tầng hoàn chỉnh!** 🔐🧁✨
