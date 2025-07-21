# 🔐 TÀI KHOẢN ĐĂNG NHẬP HỆ THỐNG

## 📋 TỔNG QUAN

Hệ thống quản lý tiệm bánh ngọt có 2 loại giao diện với các tài khoản đăng nhập khác nhau:

1. **🛍️ Giao diện Khách hàng** - Cho người mua hàng
2. **⚙️ Giao diện Quản trị** - Cho nhân viên và quản lý

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
- **SĐT:** 0901234567

#### **Khách hàng 2:**
- **Email:** `customer2@email.com`
- **Password:** `123456`
- **Tên:** Trần Thị B
- **SĐT:** 0912345678

#### **Khách hàng 3:**
- **Email:** `customer3@email.com`
- **Password:** `123456`
- **Tên:** Lê Văn C
- **SĐT:** 0923456789

### **📝 Đăng Ký Mới:**
Khách hàng có thể đăng ký tài khoản mới với:
- Họ và tên
- Email (unique)
- Số điện thoại
- Mật khẩu (tối thiểu 6 ký tự)
- Đồng ý điều khoản sử dụng

### **🔑 Tính Năng Đăng Nhập:**
- **Tab Login/Register:** Chuyển đổi dễ dàng
- **Form Validation:** Kiểm tra real-time
- **Social Login:** Google, Facebook (UI ready)
- **Remember Me:** Lưu trạng thái đăng nhập
- **Forgot Password:** Link quên mật khẩu

---

## ⚙️ GIAO DIỆN QUẢN TRỊ

### **🌐 URL Truy Cập:**
```
http://localhost:5173/admin/login
```

### **👨‍💼 TÀI KHOẢN ADMIN:**

#### **Super Admin:**
- **Username:** `admin`
- **Password:** `admin123`
- **Vai trò:** Administrator
- **Quyền hạn:** Toàn quyền
- **Truy cập:** Tất cả modules

**Quyền của Admin:**
- ✅ Quản lý tài khoản nhân viên
- ✅ Quản lý sản phẩm
- ✅ Quản lý hóa đơn
- ✅ Xem báo cáo
- ✅ Cài đặt hệ thống
- ✅ In hóa đơn

### **👨‍💼 TÀI KHOẢN MANAGER:**

#### **Quản lý 1:**
- **Username:** `quanly`
- **Password:** `quanly123`
- **Vai trò:** Manager
- **Tên:** Nguyễn Quản Lý
- **Email:** quanly@tiembanh.com

#### **Quản lý 2:**
- **Username:** `manager1`
- **Password:** `manager123`
- **Vai trò:** Manager
- **Tên:** Trần Thị Quản Lý
- **Email:** manager1@tiembanh.com

**Quyền của Manager:**
- ❌ Quản lý tài khoản nhân viên
- ✅ Quản lý sản phẩm
- ✅ Quản lý hóa đơn
- ✅ Xem báo cáo
- ❌ Cài đặt hệ thống
- ✅ In hóa đơn

### **👨‍💻 TÀI KHOẢN STAFF:**

#### **Nhân viên 1:**
- **Username:** `nhanvien1`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Lê Văn Nhân Viên
- **Email:** nhanvien1@tiembanh.com

#### **Nhân viên 2:**
- **Username:** `nhanvien2`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Phạm Thị Nhân Viên
- **Email:** nhanvien2@tiembanh.com

#### **Nhân viên 3:**
- **Username:** `nhanvien3`
- **Password:** `nhanvien123`
- **Vai trò:** Staff
- **Tên:** Hoàng Văn Nhân Viên
- **Email:** nhanvien3@tiembanh.com

**Quyền của Staff:**
- ❌ Quản lý tài khoản nhân viên
- ❌ Quản lý sản phẩm
- ✅ Quản lý hóa đơn (chỉ xem và cập nhật)
- ❌ Xem báo cáo
- ❌ Cài đặt hệ thống
- ✅ In hóa đơn

---

## 🔄 CHUYỂN HƯỚNG THEO VAI TRÒ

### **Sau khi đăng nhập thành công:**

#### **Admin:**
```
/admin/login → /admin/dashboard
```
- Truy cập: Dashboard tổng quan
- Có thể vào tất cả modules

#### **Manager:**
```
/admin/login → /admin/dashboard
```
- Truy cập: Dashboard tổng quan
- Không thể vào quản lý tài khoản

#### **Staff:**
```
/admin/login → /admin/dashboard/orders
```
- Truy cập: Trực tiếp trang quản lý hóa đơn
- Chỉ có quyền xem và cập nhật đơn hàng

#### **Customer:**
```
/customer/login → /
```
- Truy cập: Trang chủ cửa hàng
- Có thể mua sắm và đặt hàng

---

## 🛡️ BẢO MẬT & PHÂN QUYỀN

### **Route Protection:**

#### **Admin Routes:**
```javascript
// Chỉ Admin
/admin/dashboard/accounts → Cần role: ['admin']

// Admin & Manager  
/admin/dashboard/products → Cần role: ['admin', 'manager']

// Tất cả roles
/admin/dashboard/orders → Cần role: ['admin', 'manager', 'staff']
```

#### **Customer Routes:**
```javascript
// Public routes
/ → Trang chủ (không cần đăng nhập)
/shop → Sản phẩm (không cần đăng nhập)
/product/:id → Chi tiết (không cần đăng nhập)

// Protected routes (cần đăng nhập)
/cart → Giỏ hàng
/checkout → Thanh toán
/profile → Thông tin cá nhân
```

### **Session Management:**
- **Admin:** Lưu trong `localStorage.user`
- **Customer:** Lưu trong `localStorage.customer`
- **Auto Logout:** Khi token hết hạn
- **Remember Login:** Checkbox ghi nhớ

---

## 🧪 TESTING ACCOUNTS

### **Quick Test Admin:**
```bash
# Truy cập admin
http://localhost:5173/admin/login

# Đăng nhập nhanh
Username: admin
Password: admin123
```

### **Quick Test Customer:**
```bash
# Truy cập customer
http://localhost:5173/customer/login

# Đăng ký mới hoặc dùng demo
Email: customer1@email.com
Password: 123456
```

### **Test Scenarios:**

#### **1. Test Admin Flow:**
1. Login với `admin/admin123`
2. Truy cập Dashboard → Accounts
3. Thêm/sửa/xóa tài khoản
4. Truy cập Products → Quản lý sản phẩm
5. Truy cập Orders → In hóa đơn

#### **2. Test Manager Flow:**
1. Login với `quanly/quanly123`
2. Truy cập Dashboard (không thấy Accounts)
3. Quản lý Products và Orders
4. Không thể truy cập /admin/dashboard/accounts

#### **3. Test Staff Flow:**
1. Login với `nhanvien1/nhanvien123`
2. Tự động chuyển đến Orders
3. Chỉ có thể xem và cập nhật đơn hàng
4. Không thể truy cập Products hoặc Accounts

#### **4. Test Customer Flow:**
1. Truy cập trang chủ
2. Duyệt sản phẩm → Thêm vào giỏ
3. Login để checkout
4. Hoàn thành đơn hàng

---

## 🔧 MOCK AUTHENTICATION

### **Admin Login Logic:**
```javascript
// File: src/api/Login.js
export const loginUser = async (username, password) => {
  const users = {
    'admin': { role: 'admin', username: 'admin' },
    'quanly': { role: 'manager', username: 'quanly' },
    'nhanvien1': { role: 'staff', username: 'nhanvien1' }
  };
  
  const passwords = {
    'admin': 'admin123',
    'quanly': 'quanly123', 
    'nhanvien1': 'nhanvien123'
  };
  
  if (users[username] && passwords[username] === password) {
    return { user: users[username] };
  }
  throw new Error('Tài khoản hoặc mật khẩu không đúng');
};
```

### **Customer Login Logic:**
```javascript
// Mock customer authentication
const mockCustomers = [
  { email: 'customer1@email.com', password: '123456', name: 'Nguyễn Văn A' },
  { email: 'customer2@email.com', password: '123456', name: 'Trần Thị B' }
];
```

---

## 📝 NOTES

### **Development:**
- Tất cả mật khẩu đều là demo/testing
- Trong production cần hash passwords
- Cần implement JWT tokens
- Cần validation server-side

### **Security:**
- Passwords được hardcode cho demo
- Cần implement proper authentication
- Cần HTTPS trong production
- Cần rate limiting cho login attempts

### **Features Ready:**
- ✅ Role-based routing
- ✅ Protected routes
- ✅ Auto redirect after login
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling

---

## 🎯 SUMMARY

**Tổng cộng có 8 tài khoản demo:**

### **Admin System (5 accounts):**
- 1 Admin: `admin/admin123`
- 2 Managers: `quanly/quanly123`, `manager1/manager123`
- 3 Staff: `nhanvien1-3/nhanvien123`

### **Customer System (3 accounts):**
- 3 Customers: `customer1-3@email.com/123456`
- Unlimited registration available

**Hệ thống authentication hoàn chỉnh với phân quyền rõ ràng!** 🔐✨
