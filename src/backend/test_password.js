const bcrypt = require('bcryptjs');

// Hash từ database
const hashFromDB = '$2a$10$5W9SeGp3j9h.QdAYZ1qUO.XXJgvdRPZRhBl6MRekU0wHLpYyIHEMO';

// Các mật khẩu có thể
const possiblePasswords = [
    '1234526',
    'admin123', 
    'admin',
    'password',
    '123456',
    'admin1234',
    'tiembanh123'
];

console.log('🔍 Đang kiểm tra mật khẩu...\n');

async function testPasswords() {
    for (const password of possiblePasswords) {
        try {
            const isMatch = await bcrypt.compare(password, hashFromDB);
            console.log(`${password.padEnd(15)} : ${isMatch ? '✅ ĐÚNG' : '❌ SAI'}`);
        } catch (error) {
            console.log(`${password.padEnd(15)} : ❌ LỖI - ${error.message}`);
        }
    }
    
    console.log('\n🔐 Tạo hash mới cho mật khẩu "admin123":');
    const newHash = await bcrypt.hash('admin123', 10);
    console.log(newHash);
}

testPasswords();
