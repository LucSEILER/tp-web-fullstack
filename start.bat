@echo off

echo Creating external network...
docker network create --driver bridge gameradar-network
echo Network created

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

echo Starting Frontend...
cd frontapp
docker compose up -d --build
cd ..

echo All services started!
