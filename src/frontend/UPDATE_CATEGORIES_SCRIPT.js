// === SCRIPT CẬP NHẬT CATEGORIES VỚI ẢNH ĐẠI DIỆN ===
// Copy và paste vào Console (F12) để chạy

console.log('🔄 Updating categories with sample images...');

// Ảnh mẫu cho từng loại danh mục
const categoryImages = {
  1: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop&crop=center', // Bánh kem
  2: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=100&h=100&fit=crop&crop=center', // Cupcake
  3: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=100&h=100&fit=crop&crop=center', // Bánh quy
  4: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=100&h=100&fit=crop&crop=center', // Bánh ngọt
  5: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop&crop=center', // Bánh mì ngọt
  6: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=100&h=100&fit=crop&crop=center'  // Bánh tart
};

// Tạo categories mới nếu chưa có
const defaultCategories = [
  {
    id: 1,
    name: 'Bánh kem',
    description: 'Các loại bánh kem sinh nhật, bánh kem trang trí',
    icon: '🎂',
    image: categoryImages[1],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Cupcake',
    description: 'Bánh cupcake nhỏ xinh với nhiều hương vị',
    icon: '🧁',
    image: categoryImages[2],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Bánh quy',
    description: 'Bánh quy giòn tan, cookies các loại',
    icon: '🍪',
    image: categoryImages[3],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Bánh ngọt',
    description: 'Pastry, croissant, éclair và các loại bánh ngọt Pháp',
    icon: '🥐',
    image: categoryImages[4],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Bánh mì ngọt',
    description: 'Bánh mì ngọt, bánh bao ngọt',
    icon: '🍞',
    image: categoryImages[5],
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Bánh tart',
    description: 'Bánh tart trái cây, bánh tart kem',
    icon: '🥧',
    image: categoryImages[6],
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

// Get current categories
const currentCategories = JSON.parse(localStorage.getItem('bakeryCategories') || '[]');

let updatedCategories;

if (currentCategories.length === 0) {
  // Nếu chưa có categories, tạo mới
  updatedCategories = defaultCategories;
  console.log('📦 Creating new categories with images');
} else {
  // Nếu đã có categories, cập nhật thêm image
  updatedCategories = currentCategories.map(category => {
    const hasImage = category.image && category.image.length > 0;
    return {
      ...category,
      image: hasImage ? category.image : (categoryImages[category.id] || '')
    };
  });
  console.log('🔄 Updating existing categories with images');
}

// Test image URLs trước khi lưu
console.log('🧪 Testing image URLs...');
let loadedCount = 0;
const totalImages = Object.keys(categoryImages).length;

const testPromises = Object.entries(categoryImages).map(([id, url]) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      console.log(`✅ Image ${id} loaded: ${url.substring(0, 50)}...`);
      resolve(true);
    };
    img.onerror = () => {
      console.log(`❌ Image ${id} failed: ${url.substring(0, 50)}...`);
      resolve(false);
    };
    img.src = url;
  });
});

Promise.all(testPromises).then((results) => {
  const successCount = results.filter(r => r).length;
  console.log(`📊 Image test results: ${successCount}/${totalImages} loaded successfully`);
  
  // Save categories regardless of image test results
  localStorage.setItem('bakeryCategories', JSON.stringify(updatedCategories));
  
  console.log('✅ Categories updated and saved to localStorage');
  console.log('📊 Total categories:', updatedCategories.length);
  console.log('🖼️ Categories with images:', updatedCategories.filter(c => c.image).length);
  
  // Log sample of updated categories
  console.log('📋 Sample updated categories:');
  updatedCategories.slice(0, 3).forEach(cat => {
    console.log(`  - ${cat.name}: ${cat.image ? '🖼️ Has image' : '📝 Emoji only'}`);
  });
  
  // Trigger refresh của homepage nếu có
  if (window.refreshHomePage) {
    console.log('🔄 Refreshing homepage data...');
    window.refreshHomePage();
  }
  
  console.log('🎉 Update completed! Refreshing page in 2 seconds...');
  setTimeout(() => {
    window.location.reload();
  }, 2000);
});

// Debug current state
console.log('🔍 Current state before update:');
console.log('Current categories count:', currentCategories.length);
if (currentCategories.length > 0) {
  console.log('Sample current categories:', currentCategories.slice(0, 2).map(c => ({ 
    name: c.name, 
    hasIcon: !!c.icon, 
    hasImage: !!c.image 
  })));
}
