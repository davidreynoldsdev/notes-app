# notes-app
Notes application

## Local

### Docker build
`
docker-compose -f docker-compose-local.yml build
`

`
docker build --rm -f Dockerfile.local -t notes-app-web:latest .
`

`
docker build --rm -f Dockerfile.local -t notes-app-api:latest .
`

### Docker compose
`
docker-compose -f docker-compose-local.yml up

## Remote

### Docker build
`
docker-compose -f docker-compose.yml build
`

`
docker build --rm -f Dockerfile -t notes-app-web:latest .
`

`
docker build --rm -f Dockerfile -t notes-app-api:latest .
`

### Docker compose
`
docker-compose -f docker-compose.yml up
`


docker build -t notes-app-web:latest .
docker run --rm -p 8080:80 notes-app-web:latest
