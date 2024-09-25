curl -X POST http://localhost:3000/dev/send  \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "message": "Olá, este é um teste de requisição POST!"
}'
