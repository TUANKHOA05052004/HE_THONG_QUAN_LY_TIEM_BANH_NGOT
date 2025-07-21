const bcrypt = require('bcryptjs');

// Hash mới từ init.sql
const adminHash = '$2b$10$Ub9FTueIVuElKxzxpxMpvedLW9sysC2HqFOcj0wiQJ/oodd6WoU7K';
const quanlyHash = '$2b$10$fY7mfsFi5QcAXRkwymaRuOFNrZIQl50LCB4C3ta3WCGw44eY.W5S2';
const nhanvienHash = '$2b$10$evrjT7SiPAtFTqnAbfIfPulh/YH86Bog8.wwHWGY9e6J.YWEAtEsW';

async function verifyPasswords() {
    console.log('🔍 Xác minh mật khẩu mới...\n');
    
    // Test admin
    const adminMatch = await bcrypt.compare('admin123', adminHash);
    console.log(`admin + admin123: ${adminMatch ? '✅ ĐÚNG' : '❌ SAI'}`);
    
    // Test quanly
    const quanlyMatch = await bcrypt.compare('quanly123', quanlyHash);
    console.log(`quanly + quanly123: ${quanlyMatch ? '✅ ĐÚNG' : '❌ SAI'}`);
    
    // Test nhanvien
    const nhanvienMatch = await bcrypt.compare('nhanvien123', nhanvienHash);
    console.log(`nhanvien + nhanvien123: ${nhanvienMatch ? '✅ ĐÚNG' : '❌ SAI'}`);
    
    console.log('\n📋 Thông tin đăng nhập chính xác:');
    console.log('👤 admin: admin123');
    console.log('👤 quanly: quanly123');
    console.log('👤 nhanvien1: nhanvien123');
    console.log('👤 nhanvien2: nhanvien123');
    console.log('👤 nhanvien3: nhanvien123');
}

verifyPasswords();
