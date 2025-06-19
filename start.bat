@echo off
echo Starting API Gateway...
cd api-gateway
docker compose up -d --build
cd ..

echo Starting User Service...
cd user-service
docker compose up -d --build
cd ..

echo Starting Videogame Service...
cd videogame-service
docker compose up -d --build
cd ..

echo All services started!
