# Quản Lý Tiệm Bánh

Hệ thống quản lý tiệm bánh với React + Vite (Frontend), Node.js + Express (Backend), và MySQL (Database).

## 🚀 Cách chạy dự án với Docker

### Yêu cầu hệ thống
- Docker Desktop
- Git

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd quan_ly_tiem_banh/src
```

### Bước 2: Chạy với Docker Compose

#### Cách 1: Sử dụng script (Windows)
```bash
# Chạy development environment
docker-dev.bat

# Dọn dẹp Docker (nếu cần)
docker-clean.bat
```

#### Cách 2: Sử dụng lệnh Docker Compose
```bash
# Build và chạy tất cả services
docker-compose up --build

# Chạy ở background
docker-compose up -d --build

# Dừng services
docker-compose down

# Dọn dẹp hoàn toàn
docker-compose down --rmi all --volumes --remove-orphans
```

### Bước 3: Truy cập ứng dụng

- **Frontend (Customer)**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Database**: localhost:3309

### Bước 4: Đăng nhập

#### Admin/Staff Login (http://localhost:5173/admin/login)
- **Admin**: username: `admin`, password: `admin123`
- **Manager**: username: `quanly`, password: `quanly123`
- **Staff**: username: `nhanvien1`, password: `nhanvien123`

#### Customer Login (http://localhost:5173/customer/login)
- **Customer 1**: email: `customer1@gmail.com`, password: `customer123`
- **Customer 2**: email: `customer2@gmail.com`, password: `customer123`

## 🛠️ Cách chạy development không dùng Docker

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
- Cài đặt MySQL
- Tạo database `qlchbn`
- Import file `database/init.sql`

## 📁 Cấu trúc dự án

```
src/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middleware/         # Express middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── Dockerfile         # Docker configuration
│   └── server.js          # Main server file
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── config/        # Configuration
│   ├── Dockerfile         # Docker configuration
│   └── vite.config.js     # Vite configuration
├── database/              # Database files
│   ├── init.sql          # Database schema & sample data
│   └── my.cnf            # MySQL configuration
└── docker-compose.yml    # Docker Compose configuration
```

## 🔧 Troubleshooting

### Lỗi thường gặp

1. **Port đã được sử dụng**
   ```bash
   # Kiểm tra port đang sử dụng
   netstat -ano | findstr :5000
   netstat -ano | findstr :5173
   netstat -ano | findstr :3309
   
   # Kill process nếu cần
   taskkill /PID <PID> /F
   ```

2. **Database connection failed**
   ```bash
   # Restart database container
   docker-compose restart db
   
   # Xem logs
   docker-compose logs db
   ```

3. **Frontend không kết nối được Backend**
   - Kiểm tra CORS configuration
   - Đảm bảo Backend đang chạy trên port 5000
   - Kiểm tra VITE_API_URL trong frontend

4. **Build failed**
   ```bash
   # Xóa node_modules và rebuild
   docker-compose down
   docker-compose up --build --force-recreate
   ```

### Xem logs
```bash
# Xem logs tất cả services
docker-compose logs

# Xem logs một service cụ thể
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Theo dõi logs real-time
docker-compose logs -f
```

### Reset database
```bash
# Xóa volume database
docker-compose down -v
docker-compose up --build
```

## 🌟 Features

- ✅ **Frontend**: React + Vite với routing hoàn chỉnh
- ✅ **Backend**: Node.js + Express với RESTful API
- ✅ **Database**: MySQL với schema tối ưu
- ✅ **Authentication**: JWT-based auth cho admin và customer
- ✅ **Role-based Access Control**: Admin, Manager, Staff roles
- ✅ **Docker**: Containerized development environment
- ✅ **CORS**: Configured for cross-origin requests
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **Logging**: Request/response logging
- ✅ **Health Checks**: Container health monitoring

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs: `docker-compose logs`
2. Restart services: `docker-compose restart`
3. Rebuild containers: `docker-compose up --build --force-recreate`
