POST {{host}}/api/auth
Accept: application/json
Content-Type: application/json

{
  "name": "TestUser",
  "email": "test@mail.com",
  "password": "Az123456!",
  "confirmationPassword": "Az123456!"
}
