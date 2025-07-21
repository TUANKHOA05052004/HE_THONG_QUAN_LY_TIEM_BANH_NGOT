# 🧪 SCRIPT TẠO SAMPLE DATA ĐỂ TEST

## 📋 HƯỚNG DẪN TẠO DỮ LIỆU TEST

Để test tính năng hiển thị số lượng sản phẩm theo danh mục, hãy chạy script này trong Console của browser.

## 🚀 SCRIPT TẠO SAMPLE DATA

### **Bước 1: Mở Console**
```bash
1. Vào: http://localhost:5173/
2. Nhấn F12 để mở Developer Tools
3. Chuyển sang tab Console
4. Copy và paste script dưới đây
```

### **Bước 2: Chạy Script Tạo Categories**
```javascript
// Tạo sample categories
const sampleCategories = [
  {
    id: 1,
    name: 'Bánh kem',
    description: 'Các loại bánh kem sinh nhật, bánh kem trang trí',
    icon: '🎂',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Cupcake',
    description: 'Bánh cupcake nhỏ xinh với nhiều hương vị',
    icon: '🧁',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Bánh quy',
    description: 'Bánh quy giòn tan, cookies các loại',
    icon: '🍪',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Bánh ngọt',
    description: 'Pastry, croissant, éclair và các loại bánh ngọt Pháp',
    icon: '🥐',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Bánh mì ngọt',
    description: 'Bánh mì ngọt, bánh bao ngọt',
    icon: '🍞',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Bánh tart',
    description: 'Bánh tart trái cây, bánh tart kem',
    icon: '🥧',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

localStorage.setItem('bakeryCategories', JSON.stringify(sampleCategories));
console.log('✅ Created 6 sample categories');
```

### **Bước 3: Chạy Script Tạo Products**
```javascript
// Tạo sample products với phân bổ theo categories
const sampleProducts = [
  // Bánh kem (category 1) - 5 sản phẩm
  {
    id: 1,
    name: 'Bánh kem dâu tây',
    price: 250000,
    description: 'Bánh kem tươi với dâu tây tự nhiên',
    category: 1,
    image: 'https://via.placeholder.com/400x300?text=Bánh+kem+dâu+tây',
    stock: 15,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Bánh kem chocolate',
    price: 280000,
    description: 'Bánh kem chocolate đậm đà',
    category: 1,
    image: 'https://via.placeholder.com/400x300?text=Bánh+kem+chocolate',
    stock: 12,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Bánh kem vanilla',
    price: 230000,
    description: 'Bánh kem vanilla thơm ngon',
    category: 1,
    image: 'https://via.placeholder.com/400x300?text=Bánh+kem+vanilla',
    stock: 20,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Bánh kem tiramisu',
    price: 320000,
    description: 'Bánh kem tiramisu Ý đặc biệt',
    category: 1,
    image: 'https://via.placeholder.com/400x300?text=Bánh+kem+tiramisu',
    stock: 8,
    status: 'available',
    isNew: true,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Bánh kem red velvet',
    price: 300000,
    description: 'Bánh kem red velvet màu đỏ quyến rũ',
    category: 1,
    image: 'https://via.placeholder.com/400x300?text=Bánh+kem+red+velvet',
    stock: 10,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },

  // Cupcake (category 2) - 3 sản phẩm
  {
    id: 6,
    name: 'Cupcake chocolate chip',
    price: 45000,
    description: 'Cupcake với chocolate chip thơm ngon',
    category: 2,
    image: 'https://via.placeholder.com/400x300?text=Cupcake+chocolate',
    stock: 25,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: 'Cupcake vanilla',
    price: 40000,
    description: 'Cupcake vanilla với kem tươi',
    category: 2,
    image: 'https://via.placeholder.com/400x300?text=Cupcake+vanilla',
    stock: 30,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Cupcake red velvet',
    price: 50000,
    description: 'Cupcake red velvet mini',
    category: 2,
    image: 'https://via.placeholder.com/400x300?text=Cupcake+red+velvet',
    stock: 20,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },

  // Bánh quy (category 3) - 4 sản phẩm
  {
    id: 9,
    name: 'Cookies chocolate chip',
    price: 35000,
    description: 'Bánh quy chocolate chip giòn tan',
    category: 3,
    image: 'https://via.placeholder.com/400x300?text=Cookies+chocolate',
    stock: 50,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 10,
    name: 'Cookies bơ',
    price: 30000,
    description: 'Bánh quy bơ thơm béo',
    category: 3,
    image: 'https://via.placeholder.com/400x300?text=Cookies+bơ',
    stock: 40,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 11,
    name: 'Cookies yến mạch',
    price: 38000,
    description: 'Bánh quy yến mạch healthy',
    category: 3,
    image: 'https://via.placeholder.com/400x300?text=Cookies+yến+mạch',
    stock: 35,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 12,
    name: 'Cookies matcha',
    price: 42000,
    description: 'Bánh quy matcha Nhật Bản',
    category: 3,
    image: 'https://via.placeholder.com/400x300?text=Cookies+matcha',
    stock: 25,
    status: 'available',
    isNew: true,
    isHot: true,
    createdAt: new Date().toISOString()
  },

  // Bánh ngọt (category 4) - 2 sản phẩm
  {
    id: 13,
    name: 'Croissant bơ',
    price: 25000,
    description: 'Croissant bơ Pháp thơm ngon',
    category: 4,
    image: 'https://via.placeholder.com/400x300?text=Croissant+bơ',
    stock: 30,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 14,
    name: 'Éclair chocolate',
    price: 35000,
    description: 'Éclair chocolate Pháp',
    category: 4,
    image: 'https://via.placeholder.com/400x300?text=Éclair+chocolate',
    stock: 20,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },

  // Bánh mì ngọt (category 5) - 1 sản phẩm
  {
    id: 15,
    name: 'Bánh mì nho khô',
    price: 28000,
    description: 'Bánh mì ngọt với nho khô',
    category: 5,
    image: 'https://via.placeholder.com/400x300?text=Bánh+mì+nho+khô',
    stock: 15,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },

  // Bánh tart (category 6) - 0 sản phẩm (để test category không có sản phẩm)
];

localStorage.setItem('bakeryProducts', JSON.stringify(sampleProducts));
console.log('✅ Created 15 sample products');
console.log('📊 Product distribution:');
console.log('- Bánh kem: 5 sản phẩm');
console.log('- Cupcake: 3 sản phẩm');
console.log('- Bánh quy: 4 sản phẩm');
console.log('- Bánh ngọt: 2 sản phẩm');
console.log('- Bánh mì ngọt: 1 sản phẩm');
console.log('- Bánh tart: 0 sản phẩm');
```

### **Bước 4: Refresh Trang**
```javascript
// Refresh trang để load data mới
window.location.reload();
```

## 🧪 SCRIPT TEST NHANH (ALL-IN-ONE)

```javascript
// === SCRIPT TẠO SAMPLE DATA HOÀN CHỈNH ===

// 1. Tạo Categories
const sampleCategories = [
  { id: 1, name: 'Bánh kem', description: 'Các loại bánh kem sinh nhật, bánh kem trang trí', icon: '🎂', status: 'active', createdAt: new Date().toISOString() },
  { id: 2, name: 'Cupcake', description: 'Bánh cupcake nhỏ xinh với nhiều hương vị', icon: '🧁', status: 'active', createdAt: new Date().toISOString() },
  { id: 3, name: 'Bánh quy', description: 'Bánh quy giòn tan, cookies các loại', icon: '🍪', status: 'active', createdAt: new Date().toISOString() },
  { id: 4, name: 'Bánh ngọt', description: 'Pastry, croissant, éclair và các loại bánh ngọt Pháp', icon: '🥐', status: 'active', createdAt: new Date().toISOString() },
  { id: 5, name: 'Bánh mì ngọt', description: 'Bánh mì ngọt, bánh bao ngọt', icon: '🍞', status: 'active', createdAt: new Date().toISOString() },
  { id: 6, name: 'Bánh tart', description: 'Bánh tart trái cây, bánh tart kem', icon: '🥧', status: 'active', createdAt: new Date().toISOString() }
];

// 2. Tạo Products
const sampleProducts = [
  // Bánh kem (5 sản phẩm)
  { id: 1, name: 'Bánh kem dâu tây', price: 250000, description: 'Bánh kem tươi với dâu tây tự nhiên', category: 1, image: 'https://via.placeholder.com/400x300?text=Bánh+kem+dâu+tây', stock: 15, status: 'available', isNew: true, isHot: false, createdAt: new Date().toISOString() },
  { id: 2, name: 'Bánh kem chocolate', price: 280000, description: 'Bánh kem chocolate đậm đà', category: 1, image: 'https://via.placeholder.com/400x300?text=Bánh+kem+chocolate', stock: 12, status: 'available', isNew: false, isHot: true, createdAt: new Date().toISOString() },
  { id: 3, name: 'Bánh kem vanilla', price: 230000, description: 'Bánh kem vanilla thơm ngon', category: 1, image: 'https://via.placeholder.com/400x300?text=Bánh+kem+vanilla', stock: 20, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() },
  { id: 4, name: 'Bánh kem tiramisu', price: 320000, description: 'Bánh kem tiramisu Ý đặc biệt', category: 1, image: 'https://via.placeholder.com/400x300?text=Bánh+kem+tiramisu', stock: 8, status: 'available', isNew: true, isHot: true, createdAt: new Date().toISOString() },
  { id: 5, name: 'Bánh kem red velvet', price: 300000, description: 'Bánh kem red velvet màu đỏ quyến rũ', category: 1, image: 'https://via.placeholder.com/400x300?text=Bánh+kem+red+velvet', stock: 10, status: 'available', isNew: false, isHot: true, createdAt: new Date().toISOString() },
  
  // Cupcake (3 sản phẩm)
  { id: 6, name: 'Cupcake chocolate chip', price: 45000, description: 'Cupcake với chocolate chip thơm ngon', category: 2, image: 'https://via.placeholder.com/400x300?text=Cupcake+chocolate', stock: 25, status: 'available', isNew: true, isHot: false, createdAt: new Date().toISOString() },
  { id: 7, name: 'Cupcake vanilla', price: 40000, description: 'Cupcake vanilla với kem tươi', category: 2, image: 'https://via.placeholder.com/400x300?text=Cupcake+vanilla', stock: 30, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() },
  { id: 8, name: 'Cupcake red velvet', price: 50000, description: 'Cupcake red velvet mini', category: 2, image: 'https://via.placeholder.com/400x300?text=Cupcake+red+velvet', stock: 20, status: 'available', isNew: false, isHot: true, createdAt: new Date().toISOString() },
  
  // Bánh quy (4 sản phẩm)
  { id: 9, name: 'Cookies chocolate chip', price: 35000, description: 'Bánh quy chocolate chip giòn tan', category: 3, image: 'https://via.placeholder.com/400x300?text=Cookies+chocolate', stock: 50, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() },
  { id: 10, name: 'Cookies bơ', price: 30000, description: 'Bánh quy bơ thơm béo', category: 3, image: 'https://via.placeholder.com/400x300?text=Cookies+bơ', stock: 40, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() },
  { id: 11, name: 'Cookies yến mạch', price: 38000, description: 'Bánh quy yến mạch healthy', category: 3, image: 'https://via.placeholder.com/400x300?text=Cookies+yến+mạch', stock: 35, status: 'available', isNew: true, isHot: false, createdAt: new Date().toISOString() },
  { id: 12, name: 'Cookies matcha', price: 42000, description: 'Bánh quy matcha Nhật Bản', category: 3, image: 'https://via.placeholder.com/400x300?text=Cookies+matcha', stock: 25, status: 'available', isNew: true, isHot: true, createdAt: new Date().toISOString() },
  
  // Bánh ngọt (2 sản phẩm)
  { id: 13, name: 'Croissant bơ', price: 25000, description: 'Croissant bơ Pháp thơm ngon', category: 4, image: 'https://via.placeholder.com/400x300?text=Croissant+bơ', stock: 30, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() },
  { id: 14, name: 'Éclair chocolate', price: 35000, description: 'Éclair chocolate Pháp', category: 4, image: 'https://via.placeholder.com/400x300?text=Éclair+chocolate', stock: 20, status: 'available', isNew: true, isHot: false, createdAt: new Date().toISOString() },
  
  // Bánh mì ngọt (1 sản phẩm)
  { id: 15, name: 'Bánh mì nho khô', price: 28000, description: 'Bánh mì ngọt với nho khô', category: 5, image: 'https://via.placeholder.com/400x300?text=Bánh+mì+nho+khô', stock: 15, status: 'available', isNew: false, isHot: false, createdAt: new Date().toISOString() }
  
  // Bánh tart (0 sản phẩm) - để test category không có sản phẩm
];

// 3. Lưu vào localStorage
localStorage.setItem('bakeryCategories', JSON.stringify(sampleCategories));
localStorage.setItem('bakeryProducts', JSON.stringify(sampleProducts));

// 4. Log kết quả
console.log('✅ Sample data created successfully!');
console.log('📊 Categories: 6');
console.log('📦 Products: 15');
console.log('📈 Distribution:');
console.log('  🎂 Bánh kem: 5 sản phẩm');
console.log('  🧁 Cupcake: 3 sản phẩm');
console.log('  🍪 Bánh quy: 4 sản phẩm');
console.log('  🥐 Bánh ngọt: 2 sản phẩm');
console.log('  🍞 Bánh mì ngọt: 1 sản phẩm');
console.log('  🥧 Bánh tart: 0 sản phẩm');

// 5. Refresh trang
setTimeout(() => {
  console.log('🔄 Refreshing page...');
  window.location.reload();
}, 1000);
```

## ✅ KẾT QUẢ MONG ĐỢI

Sau khi chạy script và refresh trang, bạn sẽ thấy:

### **📊 Trang chủ - Phần thống kê:**
```
📦 15        📂 6         ⭐ 6         🔥 5
Sản Phẩm     Danh Mục     Sản Phẩm Mới  Sản Phẩm Hot
```

### **🏷️ Trang chủ - Danh mục sản phẩm:**
```
🎂 Bánh kem          🧁 Cupcake           🍪 Bánh quy
🧁 5 sản phẩm        🧁 3 sản phẩm        🧁 4 sản phẩm

🥐 Bánh ngọt         🍞 Bánh mì ngọt      🥧 Bánh tart
🧁 2 sản phẩm        🧁 1 sản phẩm        🧁 0 sản phẩm
```

### **🎨 Visual Indicators:**
- Categories có sản phẩm: Background xanh (#dbeafe), text xanh (#1d4ed8)
- Categories không có sản phẩm: Background xám (#f1f5f9), text xám (#64748b)

**Chạy script để test ngay!** 🧪✨
