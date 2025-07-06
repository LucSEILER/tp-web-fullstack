@echo off

echo Stopping Frontend...
cd frontapp
docker compose down
cd ..

echo Stopping Videogame Service...
cd videogame-service
docker compose down
cd ..

echo Stopping User Service...
cd user-service
docker compose down
cd ..

echo Stopping API Gateway...
cd api-gateway
docker compose down
cd ..

echo Removing external network...
docker network rm gameradar-network

echo All services stopped!
