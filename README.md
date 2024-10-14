- node v20.13.1
- npm 10.5.2
- Docker version 24.0.6
- docker-compose version 1.29.2,

- npm i
- npm run start

- sudo docker compose -f postgres-redis.dev.yml up
- npx knex migrate:latest --knexfile ./src/5_infrastructure/db/postgre/config/knexConfig.ts

- GET http://localhost:3001/items/set

- GET http://localhost:3001/items/get?limit=10&offset=0

- POST http://localhost:3001/items/buy

```json
body: {
  "userName": "admin",
  "purchaseItems": [
    {
      "marketHashName": "10 Year Birthday Sticker Capsule",
      "count": 11
    },
    {
      "marketHashName": "1st Lieutenant Farlow | SWAT",
      "count": 1
    }
  ]
}
```

- docs http://localhost:3001/docs/
