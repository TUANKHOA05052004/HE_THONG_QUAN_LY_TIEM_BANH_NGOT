// === SCRIPT SỬA NHANH ẢNH SẢN PHẨM ===
// Copy và paste vào Console (F12) để chạy

console.log('🛠️ Quick fix for product images loading issue...');

// 1. Tạo sample products với ảnh thật từ Unsplash
const sampleProducts = [
  {
    id: 1,
    name: 'Bánh kem dâu tây',
    price: 250000,
    description: 'Bánh kem tươi với dâu tây tự nhiên, thơm ngon và hấp dẫn',
    category: 1,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center',
    stock: 15,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Cupcake chocolate',
    price: 45000,
    description: 'Cupcake chocolate đậm đà với kem tươi',
    category: 2,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop&crop=center',
    stock: 25,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Bánh quy bơ',
    price: 35000,
    description: 'Bánh quy bơ giòn tan, thơm béo',
    category: 3,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&crop=center',
    stock: 30,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Croissant bơ',
    price: 25000,
    description: 'Croissant bơ Pháp thơm ngon, giòn rụm',
    category: 4,
    image: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=400&h=300&fit=crop&crop=center',
    stock: 20,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Bánh mì ngọt',
    price: 28000,
    description: 'Bánh mì ngọt với nho khô và hạt óc chó',
    category: 5,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center',
    stock: 18,
    status: 'available',
    isNew: true,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Bánh tart trái cây',
    price: 65000,
    description: 'Bánh tart với trái cây tươi ngon',
    category: 6,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop&crop=center',
    stock: 12,
    status: 'available',
    isNew: false,
    isHot: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: 'Bánh kem chocolate',
    price: 280000,
    description: 'Bánh kem chocolate đậm đà với ganache',
    category: 1,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&crop=center',
    stock: 10,
    status: 'available',
    isNew: false,
    isHot: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: 'Donut glazed',
    price: 22000,
    description: 'Donut phủ đường glazed thơm ngon',
    category: 2,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center',
    stock: 35,
    status: 'available',
    isNew: true,
    isHot: false,
    createdAt: new Date().toISOString()
  }
];

// 2. Tạo categories tương ứng
const sampleCategories = [
  { id: 1, name: 'Bánh kem', description: 'Các loại bánh kem sinh nhật', icon: '🎂', status: 'active', createdAt: new Date().toISOString() },
  { id: 2, name: 'Cupcake', description: 'Bánh cupcake nhỏ xinh', icon: '🧁', status: 'active', createdAt: new Date().toISOString() },
  { id: 3, name: 'Bánh quy', description: 'Bánh quy giòn tan', icon: '🍪', status: 'active', createdAt: new Date().toISOString() },
  { id: 4, name: 'Bánh ngọt', description: 'Pastry và croissant', icon: '🥐', status: 'active', createdAt: new Date().toISOString() },
  { id: 5, name: 'Bánh mì ngọt', description: 'Bánh mì ngọt các loại', icon: '🍞', status: 'active', createdAt: new Date().toISOString() },
  { id: 6, name: 'Bánh tart', description: 'Bánh tart trái cây', icon: '🥧', status: 'active', createdAt: new Date().toISOString() }
];

// 3. Test image URLs trước khi lưu
console.log('🧪 Testing image URLs...');
let loadedCount = 0;
const totalImages = sampleProducts.length;

const testPromises = sampleProducts.map((product, index) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      console.log(`✅ Image ${index + 1}/${totalImages} loaded: ${product.name}`);
      resolve(true);
    };
    img.onerror = () => {
      console.log(`❌ Image ${index + 1}/${totalImages} failed: ${product.name}`);
      resolve(false);
    };
    img.src = product.image;
  });
});

Promise.all(testPromises).then((results) => {
  const successCount = results.filter(r => r).length;
  console.log(`📊 Image test results: ${successCount}/${totalImages} loaded successfully`);
  
  if (successCount > 0) {
    // 4. Lưu vào localStorage
    localStorage.setItem('bakeryProducts', JSON.stringify(sampleProducts));
    localStorage.setItem('bakeryCategories', JSON.stringify(sampleCategories));
    
    console.log('✅ Sample data saved to localStorage');
    console.log('📦 Products:', sampleProducts.length);
    console.log('📂 Categories:', sampleCategories.length);
    
    // 5. Trigger refresh của homepage nếu có
    if (window.refreshHomePage) {
      console.log('🔄 Refreshing homepage data...');
      window.refreshHomePage();
    }
    
    console.log('🎉 Fix completed! Refreshing page in 2 seconds...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    console.log('❌ All images failed to load. Trying alternative approach...');
    
    // Fallback: Sử dụng ảnh từ picsum.photos
    const fallbackProducts = sampleProducts.map((product, index) => ({
      ...product,
      image: `https://picsum.photos/400/300?random=${index + 1}`
    }));
    
    localStorage.setItem('bakeryProducts', JSON.stringify(fallbackProducts));
    localStorage.setItem('bakeryCategories', JSON.stringify(sampleCategories));
    
    console.log('✅ Fallback images saved');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});

// 6. Debug current state
console.log('🔍 Current state:');
const currentProducts = JSON.parse(localStorage.getItem('bakeryProducts') || '[]');
console.log('Current products count:', currentProducts.length);
if (currentProducts.length > 0) {
  console.log('Sample product images:', currentProducts.slice(0, 3).map(p => ({ name: p.name, image: p.image })));
}
