# 🔐 Авторизация: Логин пользователя

## 📤 Endpoint

`POST /auth/login`

## 📦 Request Body

```json
{
  "email": "sunny@example.com",
  "password": "sunny123"
}

Response:
{
  "status": "success",
  "message": "Successfully logged in an user!",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQ5ZjU0NDlkYzA3YTMzZDA3MjYzYjAiLCJlbWFpbCI6InN1bm55QGV4YW1wbGUuY29tIiwiaWF0IjoxNzUwMDA1MjM2LCJleHAiOjE3NTAwMDYxMzZ9.LpVB2_smzk_MSdTfX8yar04dVNXqIW477XpELnxj6_M"
  }
}



