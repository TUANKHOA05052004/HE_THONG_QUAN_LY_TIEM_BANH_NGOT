# 📂 TÍNH NĂNG QUẢN LÝ DANH MỤC SẢN PHẨM

## 📋 TỔNG QUAN

Đã thêm tính năng quản lý danh mục sản phẩm hoàn chỉnh với CRUD operations, tích hợp với quản lý sản phẩm và hệ thống navigation.

## ✨ TÍNH NĂNG CHÍNH

### **1. 📂 Category Management Page**
- **CRUD Operations:** Create, Read, Update, Delete danh mục
- **Dynamic Categories:** Danh mục được load từ localStorage
- **Product Integration:** Tích hợp với product management
- **Status Management:** Active/Inactive categories
- **Search & Filter:** Tìm kiếm danh mục theo tên và mô tả

### **2. 📊 Statistics Dashboard**
```
📂 Tổng Danh Mục (Blue) - Hiển thị tổng số danh mục
✅ Đang Hoạt Động (Green) - Danh mục active
⏸️ Tạm Dừng (Orange) - Danh mục inactive  
🧁 Tổng Sản Phẩm (Purple) - Tổng sản phẩm trong tất cả danh mục
```

### **3. 🔗 Product Integration**
- **Dynamic Dropdowns:** Product form sử dụng danh mục từ CategoryManagement
- **Category Labels:** Hiển thị icon + tên danh mục
- **Active Only:** Chỉ hiển thị danh mục active trong product form
- **Real-time Sync:** Thêm/sửa danh mục → Product form update ngay

## 🗂️ DATA STRUCTURE

### **Category Object:**
```javascript
{
  id: 1,
  name: 'Bánh kem',
  description: 'Các loại bánh kem sinh nhật, bánh kem trang trí',
  icon: '🎂',
  status: 'active', // 'active' | 'inactive'
  createdAt: '2024-01-15T10:30:00Z',
  productCount: 3 // Số sản phẩm trong danh mục
}
```

### **Default Categories:**
```javascript
const initialCategories = [
  { id: 1, name: 'Bánh kem', icon: '🎂', status: 'active', productCount: 3 },
  { id: 2, name: 'Cupcake', icon: '🧁', status: 'active', productCount: 2 },
  { id: 3, name: 'Bánh quy', icon: '🍪', status: 'active', productCount: 2 },
  { id: 4, name: 'Bánh ngọt', icon: '🥐', status: 'active', productCount: 1 },
  { id: 5, name: 'Bánh mì ngọt', icon: '🍞', status: 'inactive', productCount: 0 }
];
```

### **Storage Key:**
```javascript
localStorage.setItem('bakeryCategories', JSON.stringify(categories));
```

## 🎨 UI/UX DESIGN

### **1. Category Table Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📂 Quản Lý Danh Mục                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ [📂 5] [✅ 4] [⏸️ 1] [🧁 8]                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔍 Search...                                          [➕ Thêm Danh Mục]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ Danh Mục    │ Mô Tả              │ Sản Phẩm │ Trạng Thái │ Thao Tác        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎂 Bánh kem │ Các loại bánh kem  │ 🧁 3     │ Hoạt động  │ [✏️] [🗑️]      │
│ 🧁 Cupcake  │ Bánh cupcake nhỏ   │ 🧁 2     │ Hoạt động  │ [✏️] [🗑️]      │
│ 🍪 Bánh quy │ Bánh quy giòn tan  │ 🧁 2     │ Hoạt động  │ [✏️] [🗑️]      │
│ 🥐 Bánh ngọt│ Pastry, croissant  │ 🧁 1     │ Hoạt động  │ [✏️] [🗑️]      │
│ 🍞 Bánh mì  │ Bánh mì ngọt       │ 🧁 0     │ Tạm dừng   │ [✏️] [🗑️]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **2. Add/Edit Modal:**
```
┌─────────────────────────────────────────────────────────────┐
│ Thêm Danh Mục Mới                                      [×] │
├─────────────────────────────────────────────────────────────┤
│ Tên danh mục *     [Bánh kem_________________]              │
│ Icon/Emoji *       [🎂] Chọn emoji đại diện cho danh mục   │
│ Trạng thái         [Hoạt động ▼]                           │
│ Mô tả danh mục     [________________________]              │
│                    [________________________]              │
│                                           [Hủy] [Thêm Mới] │
└─────────────────────────────────────────────────────────────┘
```

### **3. Visual Elements:**
```css
/* Category Icon Display */
.category-icon {
  font-size: 32px;
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Status Badges */
.status-active {
  background: #d1fae5;
  color: #10b981;
  border: 1px solid #10b98140;
}

.status-inactive {
  background: #fef3c7;
  color: #f59e0b;
  border: 1px solid #f59e0b40;
}

/* Product Count Badge */
.product-count {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}
```

## 🔧 TECHNICAL IMPLEMENTATION

### **1. Category Management Functions:**
```javascript
// Load categories from localStorage
const loadCategories = () => {
  const savedCategories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');
  if (savedCategories.length === 0) {
    // Initialize with default categories
    localStorage.setItem('bakeryCategories', JSON.stringify(initialCategories));
  }
  setCategories(savedCategories);
};

// CRUD Operations
const handleSubmit = (e) => {
  e.preventDefault();
  if (editingCategory) {
    // Update existing
    const updatedCategories = categories.map(category =>
      category.id === editingCategory.id ? { ...category, ...formData } : category
    );
  } else {
    // Add new
    const newCategory = { id: Date.now(), ...formData, createdAt: new Date().toISOString(), productCount: 0 };
  }
  localStorage.setItem('bakeryCategories', JSON.stringify(updatedCategories));
};

// Delete with validation
const handleDelete = (categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  if (category.productCount > 0) {
    alert(`Không thể xóa danh mục "${category.name}" vì còn ${category.productCount} sản phẩm.`);
    return;
  }
  // Proceed with deletion
};
```

### **2. Product Integration:**
```javascript
// Get available categories for product form
const getAvailableCategories = () => {
  const savedCategories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');
  return savedCategories.filter(c => c.status === 'active');
};

// Get category label with icon
const getCategoryLabel = (categoryId) => {
  const savedCategories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');
  const category = savedCategories.find(c => c.id.toString() === categoryId.toString());
  return category ? `${category.icon} ${category.name}` : categoryId;
};

// Dynamic dropdown in product form
<select value={formData.category} onChange={handleCategoryChange}>
  <option value="">Chọn danh mục</option>
  {getAvailableCategories().map(category => (
    <option key={category.id} value={category.id}>
      {category.icon} {category.name}
    </option>
  ))}
</select>
```

### **3. Real-time Statistics:**
```javascript
// Calculate stats from categories
const stats = {
  total: categories.length,
  active: categories.filter(c => c.status === 'active').length,
  inactive: categories.filter(c => c.status === 'inactive').length,
  products: categories.reduce((sum, c) => sum + (c.productCount || 0), 0)
};
```

## 🔄 DATA FLOW

### **1. Category → Product Integration:**
```
CategoryManagement → localStorage.bakeryCategories → ProductManagement
Admin adds category → Available in product dropdown immediately
Admin deactivates category → Hidden from product dropdown
Admin deletes category → Removed from product dropdown (if no products)
```

### **2. Product Count Tracking:**
```javascript
// When product is added/edited/deleted, update category productCount
const updateCategoryProductCount = (categoryId, change) => {
  const categories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');
  const updatedCategories = categories.map(cat => 
    cat.id === categoryId 
      ? { ...cat, productCount: Math.max(0, cat.productCount + change) }
      : cat
  );
  localStorage.setItem('bakeryCategories', JSON.stringify(updatedCategories));
};

// Usage:
// Add product: updateCategoryProductCount(categoryId, +1)
// Delete product: updateCategoryProductCount(categoryId, -1)
// Edit product category: updateCategoryProductCount(oldCategoryId, -1) + updateCategoryProductCount(newCategoryId, +1)
```

### **3. Validation Rules:**
```javascript
// Cannot delete category with products
if (category.productCount > 0) {
  alert(`Không thể xóa danh mục "${category.name}" vì còn ${category.productCount} sản phẩm.`);
  return;
}

// Only active categories shown in product form
const availableCategories = categories.filter(c => c.status === 'active');

// Required fields validation
name: required
icon: required, maxLength: 2
status: required (active/inactive)
description: optional
```

## 🧪 TESTING SCENARIOS

### **Test 1: Category CRUD Operations**
```bash
1. Vào: http://localhost:5174/admin/categories
2. Kiểm tra: 4 stats cards hiển thị đúng số liệu
3. Click "➕ Thêm Danh Mục"
4. Điền: Tên="Bánh tart", Icon="🥧", Mô tả="Bánh tart trái cây"
5. Submit → Kiểm tra: Danh mục xuất hiện trong bảng
6. Click "✏️ Sửa" → Edit thông tin → Submit
7. Kiểm tra: Thông tin đã cập nhật
8. Click "🗑️ Xóa" (chỉ danh mục có 0 sản phẩm)
9. Kiểm tra: Danh mục đã bị xóa
```

### **Test 2: Product Integration**
```bash
1. Thêm danh mục mới: "Bánh pizza ngọt" với icon "🍕"
2. Vào: http://localhost:5174/admin/products
3. Click "➕ Thêm Sản Phẩm"
4. Kiểm tra: Dropdown danh mục có "🍕 Bánh pizza ngọt"
5. Chọn danh mục mới → Thêm sản phẩm
6. Quay lại Categories → Kiểm tra: Product count = 1
7. Xóa sản phẩm → Quay lại Categories
8. Kiểm tra: Product count = 0
```

### **Test 3: Status Management**
```bash
1. Sửa danh mục "Bánh kem" → Status = "Tạm dừng"
2. Vào Product Management
3. Kiểm tra: "Bánh kem" không xuất hiện trong dropdown
4. Sửa lại Status = "Hoạt động"
5. Kiểm tra: "Bánh kem" xuất hiện lại trong dropdown
```

### **Test 4: Delete Validation**
```bash
1. Thử xóa danh mục có sản phẩm (VD: "Bánh kem" có 3 sản phẩm)
2. Kiểm tra: Alert "Không thể xóa danh mục... vì còn 3 sản phẩm"
3. Button "🗑️ Xóa" bị disabled (opacity 0.5)
4. Xóa hết sản phẩm trong danh mục
5. Kiểm tra: Button "🗑️ Xóa" enabled, có thể xóa danh mục
```

### **Test 5: Search & Filter**
```bash
1. Search "bánh kem" → Chỉ hiện danh mục có từ khóa
2. Search "giòn" → Hiện "Bánh quy" (từ mô tả)
3. Clear search → Hiện tất cả danh mục
4. Test empty state khi không tìm thấy
```

## 📱 RESPONSIVE DESIGN

### **Desktop (>1024px):**
- Full table layout với 5 columns
- Large category icons (48x48px)
- Hover effects trên table rows
- Modal 500px width

### **Tablet (768px-1024px):**
- Responsive table với horizontal scroll
- Medium icons (40x40px)
- Touch-friendly buttons
- Modal responsive width

### **Mobile (<768px):**
- Card layout thay vì table
- Small icons (32x32px)
- Full-screen modal
- Stacked form layout

## 🎯 BUSINESS LOGIC

### **1. Category Lifecycle:**
```
Create → Active → (Can be used in products)
Active → Inactive → (Hidden from product dropdown, existing products keep category)
Inactive → Active → (Available again in product dropdown)
Active/Inactive → Delete → (Only if productCount = 0)
```

### **2. Product-Category Relationship:**
```
One-to-Many: One category can have many products
Required: Every product must have a category
Cascade: Deleting category requires moving/deleting all products first
Status: Only active categories available for new products
```

### **3. Data Consistency:**
```javascript
// Ensure data consistency between categories and products
const syncCategoryProductCounts = () => {
  const products = JSON.parse(localStorage.getItem('bakeryProducts') || '[]');
  const categories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');
  
  const updatedCategories = categories.map(category => ({
    ...category,
    productCount: products.filter(p => p.category === category.id).length
  }));
  
  localStorage.setItem('bakeryCategories', JSON.stringify(updatedCategories));
};
```

## 🎉 KẾT QUẢ

### **Trước khi có Category Management:**
- ❌ Danh mục cố định trong code
- ❌ Không thể thêm/sửa/xóa danh mục
- ❌ Không có thống kê danh mục
- ❌ Khó mở rộng hệ thống

### **Sau khi có Category Management:**
- ✅ **Dynamic Categories** với CRUD hoàn chỉnh
- ✅ **Real-time Integration** với Product Management
- ✅ **Statistics Dashboard** với 4 metrics
- ✅ **Status Management** (Active/Inactive)
- ✅ **Delete Protection** (không thể xóa nếu có sản phẩm)
- ✅ **Search & Filter** capabilities
- ✅ **Professional UI** với table và modal
- ✅ **Data Consistency** giữa categories và products
- ✅ **Responsive Design** trên mọi thiết bị

## 🚀 NAVIGATION

### **Updated Admin Menu:**
```bash
📊 Tổng quan → /admin/dashboard
📋 Quản lý đơn hàng → /admin/orders
👥 Quản lý khách hàng → /admin/customers
🧁 Quản lý sản phẩm → /admin/products
📂 Quản lý danh mục → /admin/categories (MỚI)
👤 Quản lý tài khoản → /admin/dashboard/accounts
📈 Báo cáo & Thống kê → /admin/reports
```

**Tính năng quản lý danh mục sản phẩm đã hoàn chỉnh với tích hợp real-time và UI chuyên nghiệp!** 📂✨
