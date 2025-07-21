const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function updatePasswords() {
  try {
    console.log('🔐 Bắt đầu tạo mật khẩu mã hóa mới...');
    
    // Mã hóa mật khẩu mới
    const adminPassword = await bcrypt.hash('admin123', 10);
    const quanlyPassword = await bcrypt.hash('quanly123', 10);
    const nhanvienPassword = await bcrypt.hash('nhanvien123', 10);

    console.log('✅ Đã mã hóa mật khẩu mới');
    console.log('Admin password hash:', adminPassword);
    console.log('Quanly password hash:', quanlyPassword);
    console.log('Nhanvien password hash:', nhanvienPassword);

    // Đọc file accounts.json
    const accountsPath = path.join(__dirname, '../../datatable/accounts.json');
    const accountsData = JSON.parse(fs.readFileSync(accountsPath, 'utf8'));

    // Cập nhật mật khẩu
    accountsData.accounts.forEach(account => {
      switch(account.username) {
        case 'admin':
          account.password = adminPassword;
          console.log('✅ Cập nhật mật khẩu cho admin');
          break;
        case 'quanly':
          account.password = quanlyPassword;
          console.log('✅ Cập nhật mật khẩu cho quanly');
          break;
        case 'nhanvien1':
        case 'nhanvien2':
        case 'nhanvien3':
          account.password = nhanvienPassword;
          console.log(`✅ Cập nhật mật khẩu cho ${account.username}`);
          break;
      }
    });

    // Ghi lại file
    fs.writeFileSync(accountsPath, JSON.stringify(accountsData, null, 2));
    console.log('✅ Đã cập nhật file accounts.json');

    // Tạo SQL script để cập nhật database
    const sqlScript = `
-- Script cập nhật mật khẩu trong database
UPDATE accounts SET password = '${adminPassword}' WHERE username = 'admin';
UPDATE accounts SET password = '${quanlyPassword}' WHERE username = 'quanly';
UPDATE accounts SET password = '${nhanvienPassword}' WHERE username = 'nhanvien1';
UPDATE accounts SET password = '${nhanvienPassword}' WHERE username = 'nhanvien2';
UPDATE accounts SET password = '${nhanvienPassword}' WHERE username = 'nhanvien3';
`;

    const sqlPath = path.join(__dirname, 'update_passwords.sql');
    fs.writeFileSync(sqlPath, sqlScript);
    console.log('✅ Đã tạo file SQL script: update_passwords.sql');

    console.log('\n🎉 Hoàn thành! Thông tin đăng nhập mới:');
    console.log('- admin: admin123');
    console.log('- quanly: quanly123');
    console.log('- nhanvien1: nhanvien123');
    console.log('- nhanvien2: nhanvien123');
    console.log('- nhanvien3: nhanvien123');

    console.log('\n📝 Lưu ý:');
    console.log('1. File accounts.json đã được cập nhật');
    console.log('2. File update_passwords.sql đã được tạo để cập nhật database');
    console.log('3. Nếu bạn đang sử dụng database, hãy chạy file SQL này');

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  }
}

// Chạy script
updatePasswords();
