# 💬 QUẢN LÝ TIN NHẮN LIÊN HỆ KHÁCH HÀNG

## 📋 TỔNG QUAN

Đã tạo hoàn chỉnh hệ thống quản lý tin nhắn liên hệ từ khách hàng trong giao diện quản trị với đầy đủ tính năng theo dõi, phân loại và xử lý tin nhắn.

## ✨ TÍNH NĂNG CHÍNH

### **1. 📞 Customer Contact Form (ContactPage)**

#### **Form Fields:**
- **Họ và tên** (required)
- **Email** (required)
- **Số điện thoại** (optional)
- **Chủ đề** (optional)
- **Tin nhắn** (required)

#### **Data Structure:**
```javascript
const messageData = {
  id: Date.now(),
  name: 'Nguyễn Văn A',
  email: 'customer@email.com',
  phone: '0901234567',
  subject: 'Hỏi về sản phẩm',
  message: 'Nội dung tin nhắn...',
  createdAt: '2024-07-14T10:30:00.000Z',
  status: 'new',        // new, read, replied
  priority: 'normal'    // low, normal, high
};
```

#### **Storage:**
- **localStorage key:** `customerMessages`
- **Auto-save:** Tin nhắn được lưu ngay khi submit
- **Validation:** Required fields validation
- **Success feedback:** Alert confirmation

### **2. 💬 Admin Message Management**

#### **Dashboard Stats:**
```
┌─────────────────────────────────────────────────────────────┐
│ [💬 Tổng: 25] [🆕 Mới: 8] [👁️ Đã đọc: 12] [✅ Đã trả lời: 5] │
└─────────────────────────────────────────────────────────────┘
```

#### **Features:**
- **Real-time stats** với click-to-filter
- **Search functionality** across all fields
- **Status filtering:** All, New, Read, Replied
- **Priority filtering:** All, High, Normal, Low
- **Sortable table** với newest first

### **3. 🔍 Advanced Search & Filtering**

#### **Search Fields:**
- Customer name
- Email address
- Subject line
- Message content

#### **Filter Options:**
```javascript
// Status Filter
const statusOptions = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'new', label: 'Mới' },
  { value: 'read', label: 'Đã đọc' },
  { value: 'replied', label: 'Đã trả lời' }
];

// Priority Filter
const priorityOptions = [
  { value: 'all', label: 'Tất cả mức độ' },
  { value: 'high', label: 'Cao' },
  { value: 'normal', label: 'Bình thường' },
  { value: 'low', label: 'Thấp' }
];
```

### **4. 📊 Message Table Display**

#### **Table Columns:**
- **Khách Hàng:** Name, email, phone
- **Chủ Đề:** Subject + message preview
- **Thời Gian:** Formatted datetime
- **Trạng Thái:** Dropdown selector với colors
- **Mức Độ:** Priority dropdown với colors
- **Thao Tác:** View, Delete buttons

#### **Visual Indicators:**
```javascript
// Status Colors
const statusColors = {
  new: { bg: '#dbeafe', color: '#3b82f6' },      // Blue
  read: { bg: '#fef3c7', color: '#f59e0b' },     // Orange
  replied: { bg: '#d1fae5', color: '#10b981' }   // Green
};

// Priority Colors
const priorityColors = {
  low: { bg: '#f3f4f6', color: '#6b7280' },      // Gray
  normal: { bg: '#dbeafe', color: '#3b82f6' },   // Blue
  high: { bg: '#fee2e2', color: '#ef4444' }      // Red
};
```

### **5. 👁️ Message Detail Modal**

#### **Modal Features:**
- **Full message display** với formatting
- **Customer information** complete view
- **Status management** inline editing
- **Priority management** inline editing
- **Quick actions:** Mark as replied, Delete
- **Responsive design** mobile-friendly

#### **Modal Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Chi Tiết Tin Nhắn                                      [✕] │
├─────────────────────────────────────────────────────────────┤
│ [Họ tên: Nguyễn Văn A]    [Thời gian: 14/07/2024 10:30]    │
│ [Email: customer@email.com] [SĐT: 0901234567]              │
│ [Chủ đề: Hỏi về sản phẩm]                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Nội dung tin nhắn đầy đủ với formatting...             │ │
│ │ Có thể nhiều dòng và giữ nguyên line breaks            │ │
│ └─────────────────────────────────────────────────────────┘ │
│ [Trạng thái: Mới ▼] [Mức độ: Bình thường ▼]               │
│                    [✅ Đánh dấu đã trả lời] [🗑️ Xóa]      │
└─────────────────────────────────────────────────────────────┘
```

### **6. 🎯 Status Management**

#### **Status Workflow:**
```
New → Read → Replied
 ↓     ↓       ↓
🆕    👁️      ✅
```

#### **Auto Status Updates:**
- **New → Read:** Khi admin click "Xem" tin nhắn
- **Manual Updates:** Admin có thể thay đổi status bất kỳ
- **Stats Update:** Real-time cập nhật số liệu

#### **Priority Management:**
- **Default:** Normal priority cho tin nhắn mới
- **Manual Setting:** Admin có thể thay đổi priority
- **Visual Indicators:** Color coding theo priority

### **7. 📱 Responsive Design**

#### **Desktop View:**
- Full table với tất cả columns
- Large modal với 2-column layout
- Hover effects và transitions
- Keyboard navigation support

#### **Mobile View:**
- Responsive table với horizontal scroll
- Single column modal layout
- Touch-friendly buttons
- Optimized spacing

### **8. 🔐 Access Control**

#### **Role Permissions:**
```javascript
// Sidebar menu item
{
  id: 'messages',
  label: 'Tin nhắn liên hệ',
  icon: '💬',
  path: '/admin/messages',
  roles: ['admin', 'staff']  // Both admin and staff can access
}
```

#### **Features by Role:**
- **Admin:** Full access - view, edit, delete
- **Staff:** Full access - view, edit, delete
- **Customer:** Only send messages via contact form

## 🔄 DATA FLOW

### **Customer → Admin Flow:**
```
ContactPage → localStorage.customerMessages → MessageManagement
1. Customer fills contact form
2. Data saved to localStorage with metadata
3. Admin sees message in management interface
4. Admin can view, update status, reply, delete
```

### **Real-time Updates:**
```javascript
// Message creation
const newMessage = {
  id: Date.now(),
  ...formData,
  createdAt: new Date().toISOString(),
  status: 'new',
  priority: 'normal'
};

// Stats calculation
const stats = {
  total: messages.length,
  new: messages.filter(m => m.status === 'new').length,
  read: messages.filter(m => m.status === 'read').length,
  replied: messages.filter(m => m.status === 'replied').length
};
```

## 🧪 TESTING SCENARIOS

### **Test 1: Customer Contact Flow**
```bash
1. Customer: Vào /contact
2. Điền form liên hệ đầy đủ
3. Submit form
4. Kiểm tra: Success message hiển thị
5. Admin: Vào /admin/messages
6. Kiểm tra: Tin nhắn mới xuất hiện với status "Mới"
```

### **Test 2: Admin Message Management**
```bash
1. Admin: Vào /admin/messages
2. Kiểm tra: Stats cards hiển thị đúng số liệu
3. Click "Tin Nhắn Mới" → Filter to new messages
4. Click "Xem" tin nhắn → Modal mở, status auto-change to "read"
5. Change priority to "High" → Visual update
6. Mark as "Replied" → Stats update
```

### **Test 3: Search & Filter**
```bash
1. Admin: Search customer name → Results filter
2. Filter by status "Đã đọc" → Show only read messages
3. Filter by priority "Cao" → Show only high priority
4. Clear filters → Show all messages
5. Sort by newest → Verify chronological order
```

### **Test 4: Message Detail Modal**
```bash
1. Click "Xem" tin nhắn → Modal opens
2. Kiểm tra: Full customer info displayed
3. Kiểm tra: Message content với line breaks
4. Change status → Dropdown updates
5. Change priority → Color updates
6. Click "Đánh dấu đã trả lời" → Status changes
7. Close modal → Table updates
```

### **Test 5: Delete Functionality**
```bash
1. Click "Xóa" trong table → Confirm dialog
2. Confirm delete → Message removed
3. Stats update → Numbers decrease
4. Delete from modal → Modal closes, table updates
5. Verify localStorage → Message actually removed
```

## 📊 ADMIN DASHBOARD INTEGRATION

### **Navigation:**
```
Admin Sidebar:
├── 📊 Tổng quan
├── 📋 Quản lý đơn hàng
├── 👥 Quản lý khách hàng
├── 🧁 Quản lý sản phẩm
├── 📂 Quản lý danh mục
├── 💬 Tin nhắn liên hệ  ← NEW
├── 👤 Quản lý tài khoản
└── 📈 Báo cáo
```

### **Route Integration:**
```javascript
<Route path="/admin/messages" element={<MessageManagement />} />
```

## 🎉 KẾT QUẢ

### **Customer Experience:**
- ✅ **Professional contact form** với validation
- ✅ **Success feedback** sau khi gửi
- ✅ **Responsive design** trên mọi thiết bị
- ✅ **Easy to use** interface

### **Admin Experience:**
- ✅ **Complete message management** system
- ✅ **Real-time stats** và filtering
- ✅ **Detailed message view** với modal
- ✅ **Status workflow** management
- ✅ **Priority system** cho organization
- ✅ **Search functionality** powerful
- ✅ **Responsive admin interface**

### **Technical Features:**
- ✅ **localStorage integration** persistent data
- ✅ **Real-time updates** khi thay đổi
- ✅ **Role-based access** control
- ✅ **Modern UI/UX** với animations
- ✅ **Mobile-optimized** responsive design

## 🚀 DEMO

### **Customer Contact:**
```bash
1. Vào: http://localhost:5173/contact
2. Điền form liên hệ
3. Submit → Success message
```

### **Admin Management:**
```bash
1. Vào: http://localhost:5173/admin/messages
2. View stats dashboard
3. Search và filter messages
4. Click "Xem" để view detail
5. Manage status và priority
6. Delete messages
```

**Hệ thống quản lý tin nhắn liên hệ đã hoàn chỉnh với đầy đủ tính năng chuyên nghiệp!** 💬✨
