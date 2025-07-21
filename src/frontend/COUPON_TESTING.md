# 🎫 KIỂM TRA TÍNH NĂNG MÃ GIẢM GIÁ

## 📋 TỔNG QUAN

Hướng dẫn chi tiết để kiểm tra tính năng quản lý mã giảm giá đã được hoàn thiện với modal form, bảng hiển thị và tất cả chức năng CRUD.

## ✅ CHECKLIST KIỂM TRA

### **1. 🎫 Truy Cập Coupon Management**

#### **Test Navigation:**
```bash
1. Vào: http://localhost:5173/admin/login
2. Login với admin account
3. Sidebar: Click "🎫 Mã giảm giá"
4. Kiểm tra: URL chuyển đến /admin/coupons
5. Kiểm tra: Page load thành công
```

#### **Expected Results:**
- ✅ Page title: "🎫 Quản Lý Mã Giảm Giá"
- ✅ Stats cards hiển thị: Tổng, Hoạt động, Hết hạn, Sử dụng
- ✅ Search bar và filter dropdown
- ✅ Button "➕ Tạo Mã Giảm Giá"
- ✅ Empty state nếu chưa có mã nào

### **2. ➕ Tạo Mã Giảm Giá Mới**

#### **Test Create Coupon:**
```bash
1. Click "➕ Tạo Mã Giảm Giá"
2. Kiểm tra: Modal mở với title "➕ Tạo Mã Giảm Giá"
3. Kiểm tra: Form fields hiển thị đầy đủ
4. Kiểm tra: Default values được set
```

#### **Form Fields Test:**
```bash
1. Mã Giảm Giá: 
   - Input field với placeholder "WELCOME20"
   - Button "🎲 Tạo Mã" để generate random code
   - Auto uppercase khi nhập

2. Tên Mã Giảm Giá:
   - Required field
   - Placeholder: "Chào mừng khách hàng mới"

3. Loại Giảm Giá:
   - Dropdown: "Phần trăm (%)" và "Số tiền cố định (VND)"
   - Default: "Phần trăm (%)"

4. Mô Tả:
   - Textarea với placeholder
   - Optional field

5. Giá Trị Giảm:
   - Required number field
   - Suffix "%" hoặc "VND" theo loại
   - Max 100 cho percentage

6. Đơn Hàng Tối Thiểu:
   - Optional number field
   - Placeholder: "200000"

7. Giảm Tối Đa:
   - Chỉ hiển thị khi type = "percentage"
   - Optional field

8. Giới Hạn Sử Dụng:
   - Optional number field
   - Placeholder: "100 (0 = không giới hạn)"

9. Ngày Bắt Đầu/Kết Thúc:
   - Required datetime-local fields
   - Default: now và +1 month

10. Kích Hoạt:
    - Checkbox với default checked
```

#### **Test Form Validation:**
```bash
1. Submit form trống → Required field errors
2. Nhập mã đã tồn tại → "Mã giảm giá này đã tồn tại!"
3. Percentage > 100 → Browser validation
4. End date < Start date → Logic validation
```

#### **Test Create Flow:**
```bash
1. Điền form hợp lệ:
   - Code: "WELCOME20"
   - Name: "Chào mừng khách hàng mới"
   - Type: "Phần trăm (%)"
   - Value: "20"
   - Min Order: "100000"
   - Max Discount: "50000"
   - Usage Limit: "100"
   - Start: Today
   - End: Next month
   - Active: Checked

2. Click "➕ Tạo Mã"
3. Kiểm tra: Success alert "Tạo mã giảm giá thành công!"
4. Kiểm tra: Modal đóng
5. Kiểm tra: Mã mới xuất hiện trong table
6. Kiểm tra: Stats cards cập nhật
```

### **3. 📊 Hiển Thị Bảng Mã Giảm Giá**

#### **Test Table Display:**
```bash
1. Kiểm tra table headers:
   - Mã Giảm Giá | Thông Tin | Giá Trị | Sử Dụng | Thời Hạn | Trạng Thái | Thao Tác

2. Kiểm tra table row data:
   - Code: Monospace font, background highlight
   - Name: Bold text dưới code
   - Description: Truncated với ellipsis
   - Min order value hiển thị nếu có
   - Value: Format % hoặc currency
   - Max discount hiển thị cho percentage
   - Usage: Current/Limit với progress bar
   - Date range: Formatted Vietnamese
   - Status: Color-coded badges
   - Actions: Edit, Toggle, Delete buttons
```

#### **Test Status Indicators:**
```bash
1. Tạo mã với các trạng thái khác nhau:
   - 🟢 Đang hoạt động: Active + trong thời hạn
   - 🔵 Sắp diễn ra: Start date trong tương lai
   - 🔴 Hết hạn: End date đã qua
   - 🟡 Hết lượt: Used count >= Usage limit
   - ⚫ Tạm dừng: isActive = false

2. Kiểm tra màu sắc và text đúng
```

### **4. ✏️ Sửa Mã Giảm Giá**

#### **Test Edit Flow:**
```bash
1. Click "✏️ Sửa" trên một mã
2. Kiểm tra: Modal mở với title "✏️ Sửa Mã Giảm Giá"
3. Kiểm tra: Form được pre-fill với data hiện tại
4. Kiểm tra: Dates được format đúng cho datetime-local
5. Sửa một số fields
6. Click "💾 Cập Nhật"
7. Kiểm tra: Success alert "Cập nhật mã giảm giá thành công!"
8. Kiểm tra: Changes reflected trong table
```

### **5. ⏸️ Toggle Status**

#### **Test Status Toggle:**
```bash
1. Mã đang active → Click "⏸️ Dừng"
2. Kiểm tra: Status chuyển "Tạm dừng"
3. Kiểm tra: Button chuyển "▶️ Kích hoạt"
4. Click "▶️ Kích hoạt"
5. Kiểm tra: Status chuyển về "Đang hoạt động"
6. Kiểm tra: Stats cards cập nhật
```

### **6. 🗑️ Xóa Mã Giảm Giá**

#### **Test Delete Flow:**
```bash
1. Click "🗑️ Xóa" trên một mã
2. Kiểm tra: Confirm dialog "Bạn có chắc muốn xóa mã giảm giá này?"
3. Click "Cancel" → Không xóa
4. Click "OK" → Mã bị xóa
5. Kiểm tra: Mã biến mất khỏi table
6. Kiểm tra: Stats cards cập nhật
```

### **7. 🔍 Search & Filter**

#### **Test Search:**
```bash
1. Tạo nhiều mã với tên khác nhau
2. Search "WELCOME" → Chỉ hiển thị mã có chứa "WELCOME"
3. Search email → Tìm trong description
4. Clear search → Hiển thị tất cả
```

#### **Test Filter:**
```bash
1. Filter "Đang hoạt động" → Chỉ active coupons
2. Filter "Hết hạn" → Chỉ expired coupons
3. Filter "Tạm dừng" → Chỉ inactive coupons
4. Filter "Sắp diễn ra" → Chỉ upcoming coupons
5. Filter "Tất cả trạng thái" → Hiển thị tất cả
```

### **8. 🎲 Auto Code Generation**

#### **Test Code Generator:**
```bash
1. Trong create modal, click "🎲 Tạo Mã"
2. Kiểm tra: Code field được fill với 8 ký tự random
3. Kiểm tra: Code chỉ chứa A-Z và 0-9
4. Click nhiều lần → Mỗi lần tạo code khác nhau
```

### **9. 👁️ Live Preview**

#### **Test Preview Section:**
```bash
1. Trong modal, điền form data
2. Kiểm tra: Preview section cập nhật real-time
3. Kiểm tra: Format hiển thị đúng:
   - "CODE - Name"
   - "Giảm: 20%" hoặc "Giảm: 50,000₫"
   - "tối đa 100,000₫" cho percentage
   - "Đơn tối thiểu: 200,000₫" nếu có
```

### **10. 📱 Responsive Design**

#### **Test Mobile View:**
```bash
1. Resize browser xuống mobile size
2. Kiểm tra: Table có horizontal scroll
3. Kiểm tra: Modal responsive single column
4. Kiểm tra: Buttons touch-friendly
5. Kiểm tra: Form fields stack properly
```

### **11. 💾 Data Persistence**

#### **Test LocalStorage:**
```bash
1. Tạo vài mã giảm giá
2. Refresh page
3. Kiểm tra: Mã vẫn hiển thị
4. F12 → Application → Local Storage
5. Kiểm tra: Key "discountCoupons" tồn tại
6. Kiểm tra: Data structure đúng format JSON
```

### **12. 📊 Stats Accuracy**

#### **Test Stats Calculation:**
```bash
1. Tạo 5 mã với trạng thái khác nhau:
   - 2 active
   - 1 inactive  
   - 1 expired
   - 1 upcoming

2. Kiểm tra stats cards:
   - Tổng: 5
   - Hoạt động: 2
   - Hết hạn: 1
   - Sử dụng: 0 (chưa có usage)

3. Manually update usedCount trong localStorage
4. Refresh → Kiểm tra usage stats cập nhật
```

## 🐛 COMMON ISSUES & FIXES

### **Issue 1: Modal không mở**
```bash
Fix: Kiểm tra showModal state và onClick handlers
```

### **Issue 2: Form validation không hoạt động**
```bash
Fix: Kiểm tra required attributes và form onSubmit
```

### **Issue 3: Date format lỗi**
```bash
Fix: Kiểm tra toISOString().slice(0, 16) cho datetime-local
```

### **Issue 4: Stats không cập nhật**
```bash
Fix: Kiểm tra loadCoupons() được gọi sau mỗi thay đổi
```

### **Issue 5: Table không responsive**
```bash
Fix: Kiểm tra overflowX: 'auto' trên table container
```

## ✅ FINAL CHECKLIST

- [ ] **Navigation:** Sidebar link hoạt động
- [ ] **Create:** Modal form tạo mã thành công
- [ ] **Read:** Table hiển thị đầy đủ thông tin
- [ ] **Update:** Edit form cập nhật đúng
- [ ] **Delete:** Xóa mã với confirmation
- [ ] **Search:** Tìm kiếm hoạt động
- [ ] **Filter:** Lọc theo status
- [ ] **Stats:** Thống kê chính xác
- [ ] **Status:** Toggle active/inactive
- [ ] **Validation:** Form validation đầy đủ
- [ ] **Preview:** Live preview cập nhật
- [ ] **Generator:** Auto code generation
- [ ] **Responsive:** Mobile-friendly
- [ ] **Persistence:** Data lưu localStorage
- [ ] **Performance:** Load nhanh, smooth UX

## 🎉 SUCCESS CRITERIA

### **Functional Requirements:**
- ✅ CRUD operations hoàn chỉnh
- ✅ Real-time search và filter
- ✅ Status management
- ✅ Data validation
- ✅ Auto code generation

### **UI/UX Requirements:**
- ✅ Professional design
- ✅ Responsive layout
- ✅ Intuitive navigation
- ✅ Clear feedback messages
- ✅ Smooth animations

### **Technical Requirements:**
- ✅ LocalStorage integration
- ✅ Real-time stats
- ✅ Error handling
- ✅ Performance optimization
- ✅ Code maintainability

**Tính năng mã giảm giá đã sẵn sàng cho production!** 🎫✨
