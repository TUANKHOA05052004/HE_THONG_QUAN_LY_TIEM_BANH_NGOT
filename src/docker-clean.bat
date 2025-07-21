@echo off
echo =============================================
echo Cleaning Docker Environment
echo =============================================

echo Stopping all containers...
docker-compose down

echo Removing containers, networks, and images...
docker-compose down --rmi all --volumes --remove-orphans

echo Pruning Docker system...
docker system prune -f

echo Cleanup completed!
pause
