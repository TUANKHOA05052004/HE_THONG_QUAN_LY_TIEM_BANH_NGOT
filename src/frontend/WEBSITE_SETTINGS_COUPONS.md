# ⚙️ HỆ THỐNG CÀI ĐẶT WEBSITE VÀ MÃ GIẢM GIÁ

## 📋 TỔNG QUAN

Đã tạo hoàn chỉnh hệ thống quản lý cài đặt website và mã giảm giá cho admin, cho phép tùy chỉnh logo, thông tin liên hệ, khuyến mãi và tạo mã giảm giá cho khách hàng.

## ✨ TÍNH NĂNG CHÍNH

### **1. ⚙️ Website Settings Management**

#### **General Settings:**
- **Site Name:** Tên website (hiển thị trong header)
- **Logo:** Emoji hoặc text logo
- **Tagline:** Slogan/mô tả ngắn
- **Live Preview:** Xem trước logo trong admin

#### **Contact Information:**
- **Address:** Địa chỉ cửa hàng
- **Phone:** Số điện thoại cố định
- **Mobile:** Số điện thoại di động
- **Email:** Email chính và email đặt hàng
- **Business Hours:** Giờ mở/đóng cửa và ngày làm việc

#### **Promotional Banners:**
- **Dynamic Promotions:** Thêm/sửa/xóa khuyến mãi
- **Active/Inactive:** Bật/tắt khuyến mãi
- **Content Management:** Title, subtitle, CTA button

### **2. 🎫 Coupon Management System**

#### **Coupon Types:**
- **Percentage Discount:** Giảm theo phần trăm (%)
- **Fixed Amount:** Giảm số tiền cố định (VND)
- **Min Order Value:** Giá trị đơn hàng tối thiểu
- **Max Discount:** Giảm tối đa (cho % discount)

#### **Usage Controls:**
- **Usage Limit:** Giới hạn số lần sử dụng
- **Date Range:** Thời gian hiệu lực
- **Active/Inactive:** Trạng thái hoạt động
- **Usage Tracking:** Theo dõi số lần đã sử dụng

#### **Coupon Features:**
- **Auto Code Generation:** Tạo mã tự động
- **Duplicate Prevention:** Kiểm tra mã trùng lặp
- **Status Management:** Active, Inactive, Expired, Upcoming
- **Advanced Search:** Tìm kiếm và lọc mã

## 🔄 DATA FLOW & INTEGRATION

### **Admin → Customer Integration:**

#### **Website Settings Flow:**
```
WebsiteSettings → localStorage.websiteSettings → Customer Components
- Logo/Site Name → CustomerHeader
- Contact Info → ContactPage
- Promotions → HomePage banners
```

#### **Coupon System Flow:**
```
CouponManagement → localStorage.discountCoupons → Customer Checkout
- Create coupon → Available for customer use
- Edit coupon → Updates apply immediately
- Deactivate → No longer usable
- Delete → Removed from system
```

### **Data Structures:**

#### **Website Settings:**
```javascript
const websiteSettings = {
  // General
  siteName: 'Sweet Bakery',
  logo: '🧁',
  tagline: 'Bánh ngọt tươi ngon mỗi ngày',
  
  // Contact
  address: '123 Đường ABC, Quận 1, TP.HCM',
  phone: '(028) 1234 5678',
  mobile: '0901 234 567',
  email: 'info@sweetbakery.com',
  orderEmail: 'order@sweetbakery.com',
  
  // Business Hours
  openTime: '07:00',
  closeTime: '22:00',
  workDays: 'Thứ 2 - Chủ nhật',
  
  // Promotions
  promotions: [
    {
      id: 1,
      title: 'Giảm 20% cho đơn hàng đầu tiên',
      subtitle: 'Dành cho khách hàng mới đăng ký',
      cta: 'Đăng ký ngay',
      isActive: true
    }
  ]
};
```

#### **Coupon Data:**
```javascript
const coupon = {
  id: 1625097600000,
  code: 'WELCOME20',
  name: 'Chào mừng khách hàng mới',
  description: 'Giảm 20% cho đơn hàng đầu tiên',
  type: 'percentage', // 'percentage' | 'fixed'
  value: 20,
  minOrderValue: 200000,
  maxDiscount: 100000,
  usageLimit: 100,
  usedCount: 15,
  startDate: '2024-07-01T00:00:00.000Z',
  endDate: '2024-12-31T23:59:59.000Z',
  isActive: true,
  createdAt: '2024-07-01T10:00:00.000Z',
  updatedAt: '2024-07-14T15:30:00.000Z'
};
```

## 🎨 UI/UX FEATURES

### **1. ⚙️ Website Settings Interface**

#### **Tabbed Navigation:**
```
┌─────────────────────────────────────────────────────────────┐
│ [🏢 Thông Tin Chung] [📞 Thông Tin Liên Hệ] [🎉 Khuyến Mãi] │
├─────────────────────────────────────────────────────────────┤
│ Tab Content Area                                            │
│ - Form fields với validation                                │
│ - Live preview cho logo                                     │
│ - Dynamic promotion management                              │
└─────────────────────────────────────────────────────────────┘
```

#### **Live Preview:**
- **Logo Preview:** Xem trước logo trong header format
- **Contact Preview:** Hiển thị thông tin liên hệ formatted
- **Promotion Cards:** Preview khuyến mãi như customer thấy

### **2. 🎫 Coupon Management Interface**

#### **Stats Dashboard:**
```
┌─────────────────────────────────────────────────────────────┐
│ [🎫 Tổng: 25] [✅ Hoạt động: 12] [⏰ Hết hạn: 8] [📊 Sử dụng: 156] │
└─────────────────────────────────────────────────────────────┘
```

#### **Coupon Table:**
```
┌─────────────────────────────────────────────────────────────┐
│ Mã | Thông Tin | Giá Trị | Sử Dụng | Thời Hạn | Trạng Thái | Thao Tác │
├─────────────────────────────────────────────────────────────┤
│ WELCOME20 | Chào mừng... | 20% | 15/100 | 01/07-31/12 | [Hoạt động] | [Sửa][Dừng][Xóa] │
│ SUMMER50  | Khuyến mãi... | 50k | 45/∞   | 01/06-31/08 | [Hết hạn]   | [Sửa][Kích hoạt][Xóa] │
└─────────────────────────────────────────────────────────────┘
```

#### **Smart Status Indicators:**
- **🟢 Đang hoạt động:** Active và trong thời hạn
- **🔵 Sắp diễn ra:** Chưa đến ngày bắt đầu
- **🟡 Hết lượt:** Đã sử dụng hết usage limit
- **🔴 Hết hạn:** Quá ngày kết thúc
- **⚫ Tạm dừng:** Admin tắt manually

### **3. 📱 Responsive Design**

#### **Desktop (>1024px):**
- Full form layout với 2-3 columns
- Large preview areas
- Complete table với all columns

#### **Tablet (768px-1024px):**
- Responsive grid layout
- Stacked form fields
- Horizontal scroll table

#### **Mobile (<768px):**
- Single column forms
- Simplified table view
- Touch-friendly buttons

## 🔐 ACCESS CONTROL

### **Role Permissions:**

#### **Website Settings:**
```javascript
{
  id: 'settings',
  label: 'Cài đặt website',
  icon: '⚙️',
  path: '/admin/settings',
  roles: ['admin'] // Chỉ admin mới được truy cập
}
```

#### **Coupon Management:**
```javascript
{
  id: 'coupons',
  label: 'Mã giảm giá',
  icon: '🎫',
  path: '/admin/coupons',
  roles: ['admin', 'staff'] // Cả admin và staff
}
```

## 🧪 TESTING SCENARIOS

### **Test 1: Website Settings Update**
```bash
1. Admin: Vào /admin/settings
2. Tab "Thông Tin Chung": Đổi logo từ 🧁 → 🍰
3. Tab "Thông Tin Chung": Đổi site name → "My Bakery"
4. Click "Lưu Cài Đặt"
5. Customer: Vào homepage
6. Kiểm tra: Header hiển thị logo và tên mới
```

### **Test 2: Contact Info Update**
```bash
1. Admin: Tab "Thông Tin Liên Hệ"
2. Cập nhật địa chỉ, SĐT, email
3. Lưu settings
4. Customer: Vào /contact
5. Kiểm tra: Thông tin liên hệ cập nhật đúng
```

### **Test 3: Promotion Management**
```bash
1. Admin: Tab "Khuyến Mãi"
2. Click "Thêm Khuyến Mãi"
3. Nhập title, subtitle, CTA
4. Kích hoạt promotion
5. Lưu settings
6. Customer: Vào homepage
7. Kiểm tra: Banner khuyến mãi hiển thị
```

### **Test 4: Coupon Creation**
```bash
1. Admin: Vào /admin/coupons
2. Click "Tạo Mã Giảm Giá"
3. Nhập thông tin: NEWUSER20, 20%, min 100k
4. Set thời hạn và usage limit
5. Lưu coupon
6. Customer: Checkout với mã NEWUSER20
7. Kiểm tra: Giảm giá áp dụng đúng
```

### **Test 5: Coupon Status Management**
```bash
1. Admin: View coupon table
2. Click "Dừng" cho active coupon
3. Kiểm tra: Status chuyển "Tạm dừng"
4. Customer: Thử dùng mã
5. Kiểm tra: Mã không còn hoạt động
6. Admin: Click "Kích hoạt"
7. Customer: Thử lại → Mã hoạt động
```

## 🎯 CUSTOMER EXPERIENCE

### **Dynamic Website Updates:**
- **Header:** Logo và site name từ admin settings
- **Contact Page:** Thông tin liên hệ real-time
- **Homepage:** Promotional banners dynamic
- **Checkout:** Coupon system integration

### **Coupon Usage Flow:**
```
Customer enters code → System validates → Apply discount → Show savings
- Check if code exists
- Verify active status
- Check date range
- Validate min order value
- Apply discount (% or fixed)
- Respect max discount limit
- Update usage count
```

## 🎉 KẾT QUẢ

### **Admin Benefits:**
- ✅ **Complete website control** không cần developer
- ✅ **Real-time updates** cho customer interface
- ✅ **Professional coupon system** với advanced features
- ✅ **Easy content management** với intuitive UI
- ✅ **Marketing tools** để thu hút khách hàng

### **Customer Benefits:**
- ✅ **Personalized experience** với custom branding
- ✅ **Up-to-date information** từ admin settings
- ✅ **Discount opportunities** với coupon system
- ✅ **Consistent branding** across all pages

### **Technical Features:**
- ✅ **localStorage integration** cho persistent data
- ✅ **Real-time sync** giữa admin và customer
- ✅ **Role-based access** control
- ✅ **Responsive design** trên mọi thiết bị
- ✅ **Data validation** và error handling
- ✅ **Modern UI/UX** với professional design

## 🚀 DEMO

### **Admin Management:**
```bash
1. Website Settings: /admin/settings
   - Update logo, contact info, promotions
2. Coupon Management: /admin/coupons
   - Create, edit, manage discount codes
```

### **Customer Experience:**
```bash
1. Homepage: Dynamic branding và promotions
2. Contact: Real-time contact information
3. Checkout: Coupon code application
```

**Hệ thống cài đặt website và mã giảm giá đã hoàn chỉnh với đầy đủ tính năng quản lý chuyên nghiệp!** ⚙️🎫✨
