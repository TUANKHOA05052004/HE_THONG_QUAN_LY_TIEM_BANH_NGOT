const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testDatabase() {
    console.log('🔍 KIỂM TRA HỆ THỐNG CƠ SỞ DỮ LIỆU\n');
    
    // 1. Kiểm tra cấu hình môi trường
    console.log('📋 Cấu hình môi trường:');
    console.log(`DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`DB_USER: ${process.env.DB_USER || 'myuser'}`);
    console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD || 'mypassword'}`);
    console.log(`DB_NAME: ${process.env.DB_NAME || 'MXHSV'}`);
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Đã cấu hình' : '❌ CHƯA CẤU HÌNH'}`);
    console.log(`JWT_EXPIRES_IN: ${process.env.JWT_EXPIRES_IN || '1d'}\n`);
    
    let connection;
    
    try {
        // 2. Test kết nối database
        console.log('🔌 Đang kiểm tra kết nối database...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'myuser',
            password: process.env.DB_PASSWORD || 'mypassword',
            database: process.env.DB_NAME || 'MXHSV',
            port: process.env.DB_PORT || 3309
        });
        
        console.log('✅ Kết nối database thành công!\n');
        
        // 3. Kiểm tra bảng accounts
        console.log('📊 Kiểm tra bảng accounts...');
        const [tables] = await connection.execute("SHOW TABLES LIKE 'accounts'");
        
        if (tables.length === 0) {
            console.log('❌ Bảng accounts không tồn tại!');
            console.log('💡 Hãy chạy file init.sql để tạo bảng');
            return;
        }
        
        console.log('✅ Bảng accounts tồn tại');
        
        // 4. Kiểm tra cấu trúc bảng
        console.log('\n🏗️ Cấu trúc bảng accounts:');
        const [columns] = await connection.execute("DESCRIBE accounts");
        columns.forEach(col => {
            console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'NO' ? '(NOT NULL)' : ''} ${col.Key ? `(${col.Key})` : ''}`);
        });
        
        // 5. Kiểm tra dữ liệu
        console.log('\n👥 Dữ liệu tài khoản:');
        const [accounts] = await connection.execute('SELECT id, username, email, role, status FROM accounts');
        
        if (accounts.length === 0) {
            console.log('❌ Không có tài khoản nào trong database!');
            console.log('💡 Hãy chạy file init.sql để thêm dữ liệu mẫu');
            return;
        }
        
        accounts.forEach(acc => {
            console.log(`- ID: ${acc.id}, Username: ${acc.username}, Email: ${acc.email}, Role: ${acc.role}, Status: ${acc.status}`);
        });
        
        // 6. Test mật khẩu
        console.log('\n🔐 Kiểm tra mật khẩu:');
        const [adminAccount] = await connection.execute('SELECT * FROM accounts WHERE username = ?', ['admin']);
        
        if (adminAccount.length > 0) {
            const admin = adminAccount[0];
            console.log(`Admin hash: ${admin.password.substring(0, 20)}...`);
            
            // Test các mật khẩu có thể
            const testPasswords = ['admin123', 'admin', '1234526', 'password'];
            
            for (const pwd of testPasswords) {
                try {
                    const isMatch = await bcrypt.compare(pwd, admin.password);
                    console.log(`"${pwd}": ${isMatch ? '✅ ĐÚNG' : '❌ SAI'}`);
                } catch (error) {
                    console.log(`"${pwd}": ❌ LỖI - ${error.message}`);
                }
            }
        }
        
        // 7. Test JWT
        console.log('\n🎫 Kiểm tra JWT:');
        const jwt = require('jsonwebtoken');
        
        if (!process.env.JWT_SECRET) {
            console.log('❌ JWT_SECRET chưa được cấu hình!');
        } else {
            try {
                const testToken = jwt.sign({ test: 'data' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const decoded = jwt.verify(testToken, process.env.JWT_SECRET);
                console.log('✅ JWT hoạt động bình thường');
            } catch (error) {
                console.log(`❌ JWT lỗi: ${error.message}`);
            }
        }
        
        console.log('\n🎉 KIỂM TRA HOÀN TẤT!');
        
    } catch (error) {
        console.error('❌ LỖI KẾT NỐI DATABASE:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Gợi ý khắc phục:');
            console.log('1. Kiểm tra MySQL có đang chạy không');
            console.log('2. Nếu dùng Docker: docker-compose up -d');
            console.log('3. Kiểm tra port 3309 có bị chiếm không');
            console.log('4. Kiểm tra firewall/antivirus');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 Lỗi xác thực:');
            console.log('1. Kiểm tra username/password trong .env');
            console.log('2. Kiểm tra quyền user trong MySQL');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.log('\n💡 Database không tồn tại:');
            console.log('1. Tạo database MXHSV trong MySQL');
            console.log('2. Chạy file init.sql');
        }
        
    } finally {
        if (connection) {
            await connection.end();
            console.log('\n🔌 Đã đóng kết nối database');
        }
    }
}

// Chạy test
testDatabase();
