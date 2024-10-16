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
        "id": "752c6ad8-59d0-4120-884b-3daaadfb8063",
        "count": 1
    },
    {
        "id": "9c5ae71a-24a5-4ed6-bfc7-132cca9c6c2c",
        "count": 2
    }
  ]
}
```

- docs http://localhost:3001/docs/
