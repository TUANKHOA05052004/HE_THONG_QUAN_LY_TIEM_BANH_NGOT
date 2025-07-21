# 🔐 TÀI KHOẢN ĐĂNG NHẬP HỆ THỐNG (2 VAI TRÒ)

## 📋 TỔNG QUAN

Hệ thống được đơn giản hóa với 2 loại giao diện và 2 vai trò chính:

1. **🛍️ Giao diện Khách hàng** - Cho người mua hàng
2. **⚙️ Giao diện Quản trị** - Cho quản trị viên và nhân viên

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

### **📝 Đăng Ký Mới:**
Khách hàng có thể đăng ký tài khoản mới với đầy đủ thông tin.

---

## ⚙️ GIAO DIỆN QUẢN TRỊ

### **🌐 URL Truy Cập:**
```
http://localhost:5173/admin/login
```

### **👨‍💼 VAI TRÒ 1: QUẢN TRỊ VIÊN (ADMIN)**

#### **Quản trị viên 1:**
- **Username:** `admin`
- **Password:** `admin123`
- **Vai trò:** Administrator
- **Tên:** Quản trị viên chính

#### **Quản trị viên 2:**
- **Username:** `admin2`
- **Password:** `admin123`
- **Vai trò:** Administrator
- **Tên:** Quản trị viên phụ

**🔑 Quyền hạn Quản trị viên:**
- ✅ **Quản lý tài khoản nhân viên** (thêm/sửa/xóa)
- ✅ **Quản lý sản phẩm** (thêm/sửa/xóa/danh mục)
- ✅ **Quản lý hóa đơn** (xem/cập nhật/in)
- ✅ **Xem báo cáo** (doanh thu/thống kê)
- ✅ **Cài đặt hệ thống** (cấu hình chung)
- ✅ **Toàn quyền truy cập** tất cả modules

### **👨‍💻 VAI TRÒ 2: NHÂN VIÊN (STAFF)**

#### **Nhân viên 1:**
- **Username:** `nhanvien1`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Nguyễn Văn Nhân Viên

#### **Nhân viên 2:**
- **Username:** `nhanvien2`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Trần Thị Nhân Viên

#### **Nhân viên 3:**
- **Username:** `nhanvien3`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Lê Văn Nhân Viên

**🔑 Quyền hạn Nhân viên:**
- ❌ **Quản lý tài khoản** (không được phép)
- ❌ **Quản lý sản phẩm** (không được phép)
- ✅ **Quản lý hóa đơn** (chỉ xem và cập nhật trạng thái)
- ❌ **Xem báo cáo** (không được phép)
- ❌ **Cài đặt hệ thống** (không được phép)
- ✅ **In hóa đơn** (được phép)

---

## 🔄 CHUYỂN HƯỚNG THEO VAI TRÒ

### **Sau khi đăng nhập admin:**

#### **Quản trị viên:**
```
/admin/login → /admin/dashboard
```
- **Truy cập:** Dashboard tổng quan với tất cả modules
- **Menu hiển thị:** Accounts, Products, Orders, Reports

#### **Nhân viên:**
```
/admin/login → /admin/dashboard/orders
```
- **Truy cập:** Trực tiếp trang quản lý hóa đơn
- **Menu hiển thị:** Chỉ Orders
- **Hạn chế:** Không thấy menu Accounts, Products, Reports

#### **Khách hàng:**
```
/customer/login → /
```
- **Truy cập:** Trang chủ cửa hàng
- **Tính năng:** Mua sắm, đặt hàng, theo dõi đơn hàng

---

## 🛡️ PHÂN QUYỀN CHI TIẾT

### **Route Protection:**

#### **Chỉ Quản trị viên:**
```javascript
/admin/dashboard/accounts  → Cần role: ['admin']
/admin/dashboard/products  → Cần role: ['admin'] 
/admin/dashboard/reports   → Cần role: ['admin']
/admin/settings           → Cần role: ['admin']
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

## 🧪 TESTING ACCOUNTS

### **🔧 Test Quản trị viên:**
```bash
URL: http://localhost:5173/admin/login
Username: admin
Password: admin123

Kết quả:
- Truy cập được tất cả modules
- Thấy menu: Dashboard, Accounts, Products, Orders
- Có thể thêm/sửa/xóa tài khoản nhân viên
- Có thể quản lý sản phẩm
- Có thể xem báo cáo
```

### **👨‍💻 Test Nhân viên:**
```bash
URL: http://localhost:5173/admin/login
Username: nhanvien1
Password: nhanvien123

Kết quả:
- Chuyển thẳng đến /admin/dashboard/orders
- Chỉ thấy menu: Orders
- Không thể truy cập /admin/dashboard/accounts
- Không thể truy cập /admin/dashboard/products
- Chỉ có thể xem và cập nhật đơn hàng
```

### **🛍️ Test Khách hàng:**
```bash
URL: http://localhost:5173/customer/login
Email: customer1@email.com
Password: 123456

Kết quả:
- Chuyển về trang chủ /
- Có thể mua sắm
- Có thể đặt hàng
- Có thể theo dõi đơn hàng
```

---

## 🔧 CẬP NHẬT CODE

### **1. Cập nhật Login API:**
```javascript
// src/api/Login.js
export const loginUser = async (username, password) => {
  const users = {
    // Quản trị viên
    'admin': { role: 'admin', username: 'admin', name: 'Quản trị viên chính' },
    'admin2': { role: 'admin', username: 'admin2', name: 'Quản trị viên phụ' },
    
    // Nhân viên
    'nhanvien1': { role: 'staff', username: 'nhanvien1', name: 'Nguyễn Văn Nhân Viên' },
    'nhanvien2': { role: 'staff', username: 'nhanvien2', name: 'Trần Thị Nhân Viên' },
    'nhanvien3': { role: 'staff', username: 'nhanvien3', name: 'Lê Văn Nhân Viên' }
  };
  
  const passwords = {
    'admin': 'admin123',
    'admin2': 'admin123',
    'nhanvien1': 'nhanvien123',
    'nhanvien2': 'nhanvien123',
    'nhanvien3': 'nhanvien123'
  };
  
  if (users[username] && passwords[username] === password) {
    return { user: users[username] };
  }
  throw new Error('Tài khoản hoặc mật khẩu không đúng');
};
```

### **2. Cập nhật Redirect Logic:**
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

### **3. Cập nhật Route Protection:**
```javascript
// src/main.jsx
// Chỉ Admin
<Route path="/admin/dashboard/accounts" element={
  <RoleProtectedRoute allowedRoles={['admin']}>
    <AccountManagement />
  </RoleProtectedRoute>
} />

<Route path="/admin/dashboard/products" element={
  <RoleProtectedRoute allowedRoles={['admin']}>
    <ProductManagement />
  </RoleProtectedRoute>
} />

// Admin & Staff
<Route path="/admin/dashboard/orders" element={
  <RoleProtectedRoute allowedRoles={['admin', 'staff']}>
    <OrderManagement />
  </RoleProtectedRoute>
} />
```

### **4. Cập nhật Sidebar Menu:**
```javascript
// src/components/layout/Sidebar.jsx
const menuItems = [
  { 
    label: 'Dashboard', 
    path: '/admin/dashboard', 
    icon: '📊',
    roles: ['admin', 'staff'] 
  },
  { 
    label: 'Quản lý Tài khoản', 
    path: '/admin/dashboard/accounts', 
    icon: '👥',
    roles: ['admin'] // Chỉ admin
  },
  { 
    label: 'Quản lý Sản phẩm', 
    path: '/admin/dashboard/products', 
    icon: '🧁',
    roles: ['admin'] // Chỉ admin
  },
  { 
    label: 'Quản lý Hóa đơn', 
    path: '/admin/dashboard/orders', 
    icon: '📋',
    roles: ['admin', 'staff'] // Cả hai
  }
];

// Filter menu theo role
const visibleMenuItems = menuItems.filter(item => 
  item.roles.includes(currentUser.role)
);
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
- **Admin:** Toàn quyền
- **Staff:** Chỉ quản lý đơn hàng
- **Customer:** Mua sắm và đặt hàng

**Hệ thống đã được đơn giản hóa với 2 vai trò chính!** 🔐✨
