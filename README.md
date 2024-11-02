## scoring-socket

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white)


## Description
Scoring socket

## Installation

1. **Repository** ni klonlash:
   ```sh
    git clone https://github.com/rthcoder/scoring-socket.git
    cd scoring-socket
    ```

2. **Dependencies** ni o'rnatish:

    ```sh
    npm install
    ```

3. **Environment Variables** faylini yaratish (`.env`):

    ```plaintext
    PORT=

    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    ```

## Usage

1. **Server** ni ishga tushirish:

    ```sh
    npm start
    ```
2. **Server** ni developer uchun ishga tushirish:

    ```sh
    npm run dev
    ```


## Base URL HTTP
`http://localhost:8000`

## Scoring natijasini yuborish
- **Endpoint**: `/api/socket`
- **Method**: POST
- **Response**:
```
{
    "status": 201,
    "message": "success",
    "data": {
        "method": "scoring_done",
        "data": {
            "client_id": 1,
            "order_id": 1
        }
    }
}
```

## Base URL Socket.io
`http://localhost:8000?token=<accessToken>`

## scoring_done
- **Events**: `scoring_done` scoringdan qatygan natijani olish uchun. `error` Socketga ulangan vaqtda qandaydir xatolik uchun. Masalan invalid token bo'lganda AuthorizationError error yani 401 uchun
- **Response**:
```
{
    "status": 201,
    "message": "success",
    "data": {
        "method": "scoring_done",
        "data": {
            "client_id": 1,
            "order_id": 1
        }
    }
}
```


