# 🔧 DEBUG PHƯƠNG THỨC GIAO HÀNG

## ❌ VẤN ĐỀ

Không thể chọn các phương thức giao hàng khác trong CheckoutPage.

## 🔍 NGUYÊN NHÂN & GIẢI PHÁP

### **Vấn đề 1: Logic handleInputChange**
**Nguyên nhân:** Hàm `handleInputChange` không xử lý đúng khi `section = ''` cho các field top-level như `deliveryMethod`.

**Giải pháp đã áp dụng:**
```javascript
const handleInputChange = (section, field, value) => {
  console.log('handleInputChange called:', { section, field, value });
  
  if (section === '') {
    // Handle top-level fields like deliveryMethod, paymentMethod
    setOrderData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      console.log('Updated orderData (top-level):', newData);
      return newData;
    });
  } else {
    // Handle nested fields like customerInfo.fullName
    setOrderData(prev => {
      const newData = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
      console.log('Updated orderData (nested):', newData);
      return newData;
    });
  }
};
```

### **Vấn đề 2: Event Handler Calls**
**Cách gọi hiện tại:**
```javascript
onClick={() => handleInputChange('', 'deliveryMethod', 'home_delivery')}
onClick={() => handleInputChange('', 'deliveryMethod', 'express_delivery')}
onClick={() => handleInputChange('', 'deliveryMethod', 'same_day_delivery')}
onClick={() => handleInputChange('', 'deliveryMethod', 'store_pickup')}
```

## 🧪 TESTING STEPS

### **Step 1: Test Page Đơn Giản**
Đã tạo `/test-delivery` để test logic cơ bản:

```bash
URL: http://localhost:5174/test-delivery
```

**Tính năng test:**
- Radio buttons hoạt động
- State update đúng
- Console logs
- Visual feedback

### **Step 2: Debug CheckoutPage**
```bash
1. Vào: http://localhost:5174/checkout
2. Mở Developer Tools (F12)
3. Vào tab Console
4. Thử click các phương thức giao hàng
5. Kiểm tra console logs:
   - handleInputChange called: { section: '', field: 'deliveryMethod', value: 'home_delivery' }
   - Updated orderData (top-level): { deliveryMethod: 'home_delivery', ... }
```

### **Step 3: Kiểm tra State Update**
```javascript
// Trong CheckoutPage, thêm debug info
console.log('Current orderData:', orderData);
console.log('Current deliveryMethod:', orderData.deliveryMethod);
```

### **Step 4: Kiểm tra UI Update**
```javascript
// Kiểm tra radio button checked state
checked={orderData.deliveryMethod === 'home_delivery'}
checked={orderData.deliveryMethod === 'express_delivery'}
checked={orderData.deliveryMethod === 'same_day_delivery'}
checked={orderData.deliveryMethod === 'store_pickup'}
```

## 🔧 TROUBLESHOOTING

### **Nếu vẫn không hoạt động:**

#### **1. Kiểm tra Default Value**
```javascript
// Trong useState initial state
deliveryMethod: 'home_delivery', // Đảm bảo có giá trị mặc định
```

#### **2. Kiểm tra Event Propagation**
```javascript
onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
  handleInputChange('', 'deliveryMethod', 'home_delivery');
}}
```

#### **3. Kiểm tra CSS Conflicts**
```javascript
// Đảm bảo không có CSS che phủ click events
style={{
  pointerEvents: 'auto',
  cursor: 'pointer',
  zIndex: 1
}}
```

#### **4. Thử Direct State Update**
```javascript
// Test trực tiếp
onClick={() => {
  setOrderData(prev => ({
    ...prev,
    deliveryMethod: 'home_delivery'
  }));
}}
```

## 📱 TEST SCENARIOS

### **Test 1: Basic Functionality**
```bash
1. Vào test page: /test-delivery
2. Click từng option
3. Kiểm tra: State thay đổi
4. Kiểm tra: Visual feedback
5. Kiểm tra: Console logs
```

### **Test 2: CheckoutPage**
```bash
1. Vào checkout: /checkout
2. Điền thông tin steps 1-2
3. Đến step 3 (Phương thức giao hàng)
4. Click từng phương thức
5. Kiểm tra: Console logs
6. Kiểm tra: Radio buttons update
7. Kiểm tra: Shipping fee changes
```

### **Test 3: State Persistence**
```bash
1. Chọn phương thức giao hàng
2. Quay lại step trước
3. Tiến tới step 3 lại
4. Kiểm tra: Phương thức vẫn được chọn
```

## 🐛 COMMON ISSUES

### **Issue 1: State không update**
**Nguyên nhân:** Logic handleInputChange sai
**Giải pháp:** Kiểm tra console logs, sửa logic

### **Issue 2: UI không reflect state**
**Nguyên nhân:** Checked condition sai
**Giải pháp:** Kiểm tra `orderData.deliveryMethod` value

### **Issue 3: Click không trigger**
**Nguyên nhân:** CSS overlay hoặc event handler sai
**Giải pháp:** Kiểm tra CSS, thêm preventDefault

### **Issue 4: Multiple re-renders**
**Nguyên nhân:** State update loop
**Giải pháp:** Kiểm tra useEffect dependencies

## 🔍 DEBUG COMMANDS

### **Console Commands:**
```javascript
// Kiểm tra current state
console.log('orderData:', orderData);

// Test direct update
setOrderData(prev => ({ ...prev, deliveryMethod: 'express_delivery' }));

// Kiểm tra event listeners
document.querySelectorAll('[data-delivery-method]').forEach(el => {
  console.log('Element:', el, 'Listeners:', getEventListeners(el));
});
```

### **React DevTools:**
```bash
1. Install React Developer Tools extension
2. Mở DevTools → Components tab
3. Tìm CheckoutPage component
4. Kiểm tra orderData state
5. Thử update state trực tiếp
```

## ✅ EXPECTED BEHAVIOR

### **Khi click phương thức giao hàng:**
1. Console log: `handleInputChange called: { section: '', field: 'deliveryMethod', value: 'new_method' }`
2. Console log: `Updated orderData (top-level): { deliveryMethod: 'new_method', ... }`
3. Radio button visual update
4. Shipping fee update
5. Total price update

### **UI Changes:**
- Radio button được chọn (filled circle)
- Border color thay đổi thành #F8A5C2
- Background color thay đổi thành #fef7f0
- Shipping fee hiển thị đúng
- Conditional notifications hiển thị (nếu có)

## 🚀 QUICK FIX

### **Nếu cần fix nhanh:**
```javascript
// Thay thế handleInputChange bằng direct handlers
const handleDeliveryMethodChange = (method) => {
  console.log('Changing delivery method to:', method);
  setOrderData(prev => ({
    ...prev,
    deliveryMethod: method
  }));
};

// Trong JSX
onClick={() => handleDeliveryMethodChange('home_delivery')}
onClick={() => handleDeliveryMethodChange('express_delivery')}
onClick={() => handleDeliveryMethodChange('same_day_delivery')}
onClick={() => handleDeliveryMethodChange('store_pickup')}
```

## 📊 CURRENT STATUS

### **Đã thực hiện:**
- ✅ Sửa logic handleInputChange
- ✅ Thêm console logs để debug
- ✅ Tạo test page đơn giản
- ✅ Thêm route /test-delivery

### **Cần kiểm tra:**
- 🔍 Test /test-delivery hoạt động
- 🔍 Kiểm tra console logs trong checkout
- 🔍 Xác nhận state update
- 🔍 Verify UI changes

### **Next Steps:**
1. Test trang /test-delivery trước
2. Nếu test page hoạt động → vấn đề ở CheckoutPage
3. Nếu test page không hoạt động → vấn đề ở React setup
4. Debug theo console logs
5. Apply fix phù hợp

**Hãy test /test-delivery và cho tôi biết kết quả!** 🔧✨
