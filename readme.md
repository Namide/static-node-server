# Static NodeJS server

> A static nodeJS server with proxy API

## Run Docker container

```bash
docker run -ti --rm \
  --user $(id -u):$(id -g) \
  -v $(pwd):/usr/src/app \
  -p 8000:8080 \
  -w /usr/src/app \
  node:slim \
  bash
```

## Run server

```bash
npm start
```
