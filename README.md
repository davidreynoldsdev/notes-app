# notes-app
Notes application


This works
docker build --rm -f Dockerfile -t notes-app-web:latest .
docker-compose -f docker-compose.yml up

docker build --rm -f Dockerfile -t notes-app-api:latest .
docker-compose -f docker-compose.yml up



docker build -t notes-app-web:latest .
docker run --rm -p 8080:80 notes-app-web:latest