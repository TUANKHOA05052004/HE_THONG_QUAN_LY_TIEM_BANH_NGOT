const bcrypt = require('bcryptjs');

async function generateCorrectHashes() {
    console.log('🔐 Tạo hash mật khẩu chính xác...\n');
    
    // Tạo hash cho mật khẩu "1234526" (theo comment trong init.sql)
    const hash1234526 = await bcrypt.hash('1234526', 10);
    console.log('Hash cho "1234526":', hash1234526);
    
    // Tạo hash cho các mật khẩu mới
    const hashAdmin123 = await bcrypt.hash('admin123', 10);
    const hashQuanly123 = await bcrypt.hash('quanly123', 10);
    const hashNhanvien123 = await bcrypt.hash('nhanvien123', 10);
    
    console.log('\n📝 Hash mật khẩu mới:');
    console.log('admin123:', hashAdmin123);
    console.log('quanly123:', hashQuanly123);
    console.log('nhanvien123:', hashNhanvien123);
    
    // Test hash hiện tại trong database
    const currentHash = '$2a$10$5W9SeGp3j9h.QdAYZ1qUO.XXJgvdRPZRhBl6MRekU0wHLpYyIHEMO';
    
    console.log('\n🧪 Kiểm tra hash hiện tại với các mật khẩu khác:');
    const testPasswords = ['', ' ', 'null', 'undefined', '0', 'admin', 'password', '12345', '123456789'];
    
    for (const pwd of testPasswords) {
        try {
            const isMatch = await bcrypt.compare(pwd, currentHash);
            if (isMatch) {
                console.log(`✅ TÌM THẤY: "${pwd}" khớp với hash hiện tại!`);
            }
        } catch (error) {
            // Bỏ qua lỗi
        }
    }
    
    console.log('\n💡 Gợi ý giải quyết:');
    console.log('1. Cập nhật file init.sql với hash mới');
    console.log('2. Hoặc chạy script reset_passwords.js khi database đã chạy');
    console.log('3. Hoặc sử dụng mật khẩu chính xác nếu tìm được');
}

generateCorrectHashes();
