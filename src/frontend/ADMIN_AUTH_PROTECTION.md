# 🔐 BẢO VỆ GIAO DIỆN ADMIN - YÊU CẦU ĐĂNG NHẬP

## 🎯 **MỤC TIÊU**
Áp dụng hệ thống bảo vệ tương tự customer cho **giao diện admin** - mặc định khi truy cập sẽ chuyển đến trang login nếu chưa đăng nhập.

## 📋 **CÁC THAY ĐỔI ĐÃ THỰC HIỆN**

### **1. 🛡️ Cập nhật ProtectedRoute Component**

**File:** `src/main.jsx`

```javascript
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  try {
    JSON.parse(user); // Kiểm tra dữ liệu user có hợp lệ không
    return children;
  } catch (error) {
    // Nếu dữ liệu user bị lỗi, xóa và chuyển về login
    localStorage.removeItem('user');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};
```

### **2. 🔄 Cập nhật RoleProtectedRoute Component**

```javascript
// Role-based Route Component
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  try {
    const userData = JSON.parse(user);
    if (!allowedRoles.includes(userData.role)) {
      // Chuyển hướng về trang phù hợp với vai trò
      const redirectPath = userData.role === 'staff' ? '/admin/dashboard/orders' : '/admin/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  } catch (error) {
    // Nếu dữ liệu user bị lỗi, xóa và chuyển về login
    localStorage.removeItem('user');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};
```

### **3. 🔄 Cập nhật Admin Routes**

**Trước:** Một số routes không được bảo vệ
```javascript
<Route path="/admin/dashboard" element={<NewDashboard />} />
<Route path="/admin/customers" element={<CustomerManagement />} />
```

**Sau:** Tất cả routes đều được bảo vệ với phân quyền
```javascript
<Route path="/admin/dashboard" element={
  <ProtectedRoute>
    <NewDashboard />
  </ProtectedRoute>
} />
<Route path="/admin/customers" element={
  <RoleProtectedRoute allowedRoles={['admin']}>
    <CustomerManagement />
  </RoleProtectedRoute>
} />
```

### **4. 🔑 Cập nhật LoginForm**

**Thêm auto-redirect nếu đã đăng nhập:**
```javascript
useEffect(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userData = JSON.parse(user);
      // Nếu đã đăng nhập, chuyển hướng về trang trước đó hoặc dashboard
      const from = location.state?.from?.pathname || getRedirectPath(userData.role);
      navigate(from, { replace: true });
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
}, [navigate, location]);
```

**Cập nhật redirect sau login:**
```javascript
// Xác định trang chuyển hướng dựa trên vai trò hoặc trang trước đó
const from = location.state?.from?.pathname;
const redirectPath = from || getRedirectPath(data.user.role);

// Delay một chút để người dùng thấy thông báo thành công
setTimeout(() => {
  navigate(redirectPath, { replace: true });
}, 2000);
```

## 🛡️ **PHÂN QUYỀN CHI TIẾT**

### **✅ Admin Only Routes (Chỉ Quản trị viên):**
- `/admin/dashboard` - Dashboard tổng quan
- `/admin/customers` - Quản lý khách hàng
- `/admin/products` - Quản lý sản phẩm
- `/admin/categories` - Quản lý danh mục
- `/admin/coupons` - Quản lý mã giảm giá
- `/admin/settings` - Cài đặt website
- `/admin/reports` - Báo cáo
- `/admin/dashboard/accounts` - Quản lý tài khoản (legacy)
- `/admin/dashboard/products` - Quản lý sản phẩm (legacy)

### **✅ Admin & Staff Routes (Cả hai vai trò):**
- `/admin/orders` - Quản lý đơn hàng
- `/admin/messages` - Quản lý tin nhắn
- `/admin/dashboard/orders` - Quản lý đơn hàng (legacy)

### **🔓 Public Routes (Không cần đăng nhập):**
- `/admin` - Redirect to login
- `/admin/login` - Trang đăng nhập admin

## 🔄 **FLOW HOẠT ĐỘNG**

### **1. Truy cập bất kỳ admin route nào:**
```
User truy cập /admin/products
↓
RoleProtectedRoute kiểm tra localStorage.user
↓
Nếu KHÔNG có → Navigate to /admin/login (với state.from = /admin/products)
Nếu CÓ nhưng role không phù hợp → Navigate to appropriate dashboard
Nếu CÓ và role phù hợp → Hiển thị ProductManagement
```

### **2. Đăng nhập thành công:**
```
User đăng nhập tại /admin/login
↓
Lưu thông tin vào localStorage.user
↓
Navigate về location.state.from hoặc getRedirectPath(role)
```

### **3. Role-based redirect:**
```
Admin → /admin/dashboard (Dashboard tổng quan)
Staff → /admin/dashboard/orders (Chỉ quản lý đơn hàng)
```

## ✅ **TÍNH NĂNG ĐẠT ĐƯỢC**

### **🔐 Bảo mật nâng cao:**
- ✓ Tất cả admin routes yêu cầu đăng nhập
- ✓ Phân quyền chi tiết theo role (admin/staff)
- ✓ Tự động xóa dữ liệu không hợp lệ
- ✓ Redirect về login nếu chưa đăng nhập

### **🎯 UX tốt:**
- ✓ Nhớ trang trước đó và redirect về sau login
- ✓ Role-based navigation phù hợp với quyền hạn
- ✓ Không cần đăng nhập lại nếu đã có session

### **🔄 Navigation mượt mà:**
- ✓ Sử dụng React Router navigate với proper state
- ✓ Replace history để tránh back button issues
- ✓ Consistent error handling

## 🧪 **TESTING**

### **Test Case 1: Admin truy cập khi chưa đăng nhập**
1. Xóa localStorage.user
2. Truy cập http://localhost:5173/admin/products
3. **Expected:** Chuyển đến /admin/login
4. Đăng nhập với admin account
5. **Expected:** Chuyển về /admin/products

### **Test Case 2: Staff truy cập admin-only route**
1. Đăng nhập với staff account
2. Truy cập http://localhost:5173/admin/products
3. **Expected:** Chuyển đến /admin/dashboard/orders

### **Test Case 3: Đã đăng nhập**
1. Có localStorage.user hợp lệ
2. Truy cập bất kỳ admin route nào
3. **Expected:** Hiển thị trang bình thường (nếu có quyền)

### **Test Case 4: Role-based redirect**
1. Đăng nhập với admin → Expected: /admin/dashboard
2. Đăng nhập với staff → Expected: /admin/dashboard/orders

## 📝 **GHI CHÚ**

- **Session Storage:** Sử dụng localStorage.user
- **Role System:** admin (full access) và staff (limited access)
- **Data Validation:** Kiểm tra JSON.parse để đảm bảo dữ liệu hợp lệ
- **Error Handling:** Tự động xóa dữ liệu lỗi và redirect về login
- **Legacy Support:** Giữ nguyên các legacy dashboard routes

---

**🎉 Hoàn thành:** Hệ thống bảo vệ giao diện admin đã được thiết lập thành công với phân quyền chi tiết!
