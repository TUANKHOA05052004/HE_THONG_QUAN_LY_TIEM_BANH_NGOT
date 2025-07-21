@echo off
echo =============================================
echo Starting Tiệm Bánh Development Environment
echo =============================================

echo Stopping existing containers...
docker-compose down

echo Building and starting containers...
docker-compose up --build

pause
