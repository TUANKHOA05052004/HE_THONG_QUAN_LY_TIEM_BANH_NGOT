const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetPasswords() {
  let connection;
  
  try {
    // Kết nối đến cơ sở dữ liệu
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'myuser',
      password: process.env.DB_PASSWORD || 'mypassword',
      database: process.env.DB_NAME || 'MXHSV',
      port: process.env.DB_PORT || 3309
    });

    console.log('Đã kết nối đến cơ sở dữ liệu');

    // Mã hóa mật khẩu mới
    const adminPassword = await bcrypt.hash('admin123', 10);
    const quanlyPassword = await bcrypt.hash('quanly123', 10);
    const nhanvienPassword = await bcrypt.hash('nhanvien123', 10);

    console.log('Đã mã hóa mật khẩu mới');

    // Cập nhật mật khẩu cho admin
    await connection.execute(
      'UPDATE accounts SET password = ? WHERE username = ?',
      [adminPassword, 'admin']
    );
    console.log('✅ Đã đặt lại mật khẩu cho admin: admin123');

    // Cập nhật mật khẩu cho quanly
    await connection.execute(
      'UPDATE accounts SET password = ? WHERE username = ?',
      [quanlyPassword, 'quanly']
    );
    console.log('✅ Đã đặt lại mật khẩu cho quanly: quanly123');

    // Cập nhật mật khẩu cho nhanvien1
    await connection.execute(
      'UPDATE accounts SET password = ? WHERE username = ?',
      [nhanvienPassword, 'nhanvien1']
    );
    console.log('✅ Đã đặt lại mật khẩu cho nhanvien1: nhanvien123');

    // Cập nhật mật khẩu cho nhanvien2
    await connection.execute(
      'UPDATE accounts SET password = ? WHERE username = ?',
      [nhanvienPassword, 'nhanvien2']
    );
    console.log('✅ Đã đặt lại mật khẩu cho nhanvien2: nhanvien123');

    // Cập nhật mật khẩu cho nhanvien3
    await connection.execute(
      'UPDATE accounts SET password = ? WHERE username = ?',
      [nhanvienPassword, 'nhanvien3']
    );
    console.log('✅ Đã đặt lại mật khẩu cho nhanvien3: nhanvien123');

    // Kiểm tra kết quả
    const [rows] = await connection.execute(
      'SELECT username, role FROM accounts WHERE username IN (?, ?, ?, ?, ?)',
      ['admin', 'quanly', 'nhanvien1', 'nhanvien2', 'nhanvien3']
    );

    console.log('\n📋 Danh sách tài khoản đã được cập nhật:');
    rows.forEach(row => {
      console.log(`- ${row.username} (${row.role})`);
    });

    console.log('\n🎉 Đã đặt lại mật khẩu thành công cho tất cả tài khoản!');
    console.log('\n📝 Thông tin đăng nhập mới:');
    console.log('- admin: admin123');
    console.log('- quanly: quanly123');
    console.log('- nhanvien1: nhanvien123');
    console.log('- nhanvien2: nhanvien123');
    console.log('- nhanvien3: nhanvien123');

  } catch (error) {
    console.error('❌ Lỗi khi đặt lại mật khẩu:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Gợi ý: Hãy đảm bảo cơ sở dữ liệu MySQL đang chạy.');
      console.log('Nếu bạn đang sử dụng Docker, hãy chạy: docker-compose up -d');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nĐã đóng kết nối cơ sở dữ liệu');
    }
  }
}

// Chạy script
resetPasswords();
