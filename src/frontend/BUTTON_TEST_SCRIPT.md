# 🧪 SCRIPT KIỂM TRA BUTTONS

## 📋 HƯỚNG DẪN TEST

Ứng dụng đang chạy tại: **http://localhost:5173/**

### **Bước 1: Tạo Sample Product**

Mở F12 Console và chạy script này để tạo product test:

```javascript
// Tạo sample product
const sampleProduct = {
  id: 1,
  name: 'Bánh kem dâu tây',
  price: 250000,
  description: 'Bánh kem tươi với dâu tây tự nhiên, được làm từ kem tươi cao cấp',
  category: 1,
  image: 'https://via.placeholder.com/400x300?text=Bánh+kem+dâu+tây',
  stock: 15,
  status: 'available',
  isNew: true,
  isHot: false,
  createdAt: new Date().toISOString()
};

const products = [sampleProduct];
localStorage.setItem('bakeryProducts', JSON.stringify(products));
console.log('✅ Sample product created!');

// Tạo sample category
const sampleCategory = {
  id: 1,
  name: 'Bánh kem',
  icon: '🎂',
  description: 'Các loại bánh kem tươi ngon',
  status: 'active',
  createdAt: new Date().toISOString()
};

const categories = [sampleCategory];
localStorage.setItem('bakeryCategories', JSON.stringify(categories));
console.log('✅ Sample category created!');

// Refresh để load data
window.location.reload();
```

### **Bước 2: Navigate to Product Detail**

```bash
1. Vào: http://localhost:5173/
2. Hoặc trực tiếp: http://localhost:5173/product/1
3. Kiểm tra: Product page load thành công
4. Kiểm tra: Product info hiển thị đúng
```

### **Bước 3: Test All Buttons**

Mở F12 Console và test từng button:

#### **Test Add to Cart Button:**
```bash
1. Click "🛒 Thêm vào giỏ hàng"
2. Kiểm tra Console: "Add to cart clicked!"
3. Kiểm tra Alert: "Đã thêm 1 Bánh kem dâu tây vào giỏ hàng!"
4. Kiểm tra: Product added to cart context
```

#### **Test Buy Now Button:**
```bash
1. Click "Mua ngay" button
2. Kiểm tra Console: "Buy now clicked!"
3. Kiểm tra Alert: "Đã thêm ... Chuyển đến giỏ hàng..."
4. Kiểm tra: Navigate to /cart
```

#### **Test Quantity Buttons:**
```bash
1. Click "-" button
2. Kiểm tra Console: "Decrease quantity clicked!"
3. Kiểm tra: Quantity decreases (min 1)

4. Click "+" button  
5. Kiểm tra Console: "Increase quantity clicked!"
6. Kiểm tra: Quantity increases (max stock)
```

#### **Test Tab Buttons:**
```bash
1. Click "Mô tả chi tiết"
2. Kiểm tra Console: "Description tab clicked!"
3. Kiểm tra: Tab content changes

4. Click "Thành phần"
5. Kiểm tra Console: "Ingredients tab clicked!"
6. Kiểm tra: Tab content changes

7. Click "Dinh dưỡng"
8. Kiểm tra Console: "Nutrition tab clicked!"
9. Kiểm tra: Tab content changes
```

### **Bước 4: Debug Issues**

Nếu buttons không hoạt động:

#### **Check 1: Console Errors**
```bash
1. F12 → Console tab
2. Look for red error messages
3. Common errors:
   - "Cannot read property of undefined"
   - "Function is not defined"
   - "Element is not clickable"
```

#### **Check 2: Element Inspection**
```bash
1. Right-click button → Inspect
2. Check attributes:
   - disabled="true" → Button disabled
   - style="pointer-events: none" → CSS blocking
   - onclick handler exists
3. Check computed styles:
   - z-index issues
   - position overlaps
```

#### **Check 3: Event Listeners**
```bash
1. Inspect button element
2. Event Listeners tab
3. Verify click handlers attached
4. Check for event.preventDefault()
```

## 🔧 TROUBLESHOOTING

### **Issue 1: No Console Logs**

**Possible Causes:**
- JavaScript errors preventing execution
- Event handlers not attached
- Component not rendering

**Solutions:**
```javascript
// Test basic click detection
document.addEventListener('click', function(e) {
  console.log('Clicked element:', e.target);
  console.log('Element classes:', e.target.className);
  console.log('Element text:', e.target.textContent);
});
```

### **Issue 2: Buttons Disabled**

**Check Product Data:**
```javascript
// Check product in console
const products = JSON.parse(localStorage.getItem('bakeryProducts') || '[]');
console.log('Products:', products);
console.log('Product 1:', products[0]);
console.log('Stock:', products[0]?.stock);
```

### **Issue 3: CSS Issues**

**Check Button Styles:**
```javascript
// Get button element
const addToCartBtn = document.querySelector('button[style*="linear-gradient"]');
console.log('Button element:', addToCartBtn);
console.log('Button styles:', getComputedStyle(addToCartBtn));
console.log('Pointer events:', getComputedStyle(addToCartBtn).pointerEvents);
```

### **Issue 4: React State Issues**

**Check Component State:**
```javascript
// In React DevTools
// Look for ProductDetailPage component
// Check state values:
// - product: should have data
// - quantity: should be number
// - activeTab: should be string
```

## ✅ EXPECTED RESULTS

### **Successful Test:**
```
Console Output:
✅ Sample product created!
✅ Sample category created!
Add to cart clicked! {id: 1, name: "Bánh kem dâu tây", ...} 1
Buy now clicked! {id: 1, name: "Bánh kem dâu tây", ...} 1
Description tab clicked!
Ingredients tab clicked!
Nutrition tab clicked!
Decrease quantity clicked!
Increase quantity clicked!
```

### **UI Behavior:**
- All buttons respond to clicks
- Quantity updates visually
- Tab content changes
- Alerts show for cart actions
- Navigation works for buy now

## 🚨 EMERGENCY FIXES

### **If All Buttons Broken:**

**Quick Fix 1 - Remove Event Conflicts:**
```javascript
// Stop all event propagation temporarily
document.addEventListener('click', function(e) {
  e.stopPropagation();
}, true);
```

**Quick Fix 2 - Force Button Clicks:**
```javascript
// Manually trigger button clicks
const buttons = document.querySelectorAll('button');
buttons.forEach((btn, index) => {
  btn.addEventListener('click', function() {
    console.log(`Button ${index} clicked:`, btn.textContent);
  });
});
```

**Quick Fix 3 - Check React Mounting:**
```javascript
// Check if React components mounted
console.log('React components:', document.querySelectorAll('[data-reactroot]'));
console.log('Button count:', document.querySelectorAll('button').length);
```

## 🎯 SUCCESS CRITERIA

- [ ] Sample product created successfully
- [ ] Product detail page loads
- [ ] Add to cart button works + console log
- [ ] Buy now button works + console log  
- [ ] Quantity buttons work + console log
- [ ] Tab buttons work + console log
- [ ] No JavaScript errors in console
- [ ] All UI interactions smooth

**Chạy script test để xác định vấn đề cụ thể!** 🧪✨
