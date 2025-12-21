# Register a User
POST {{host}}/api/auth/register
Accept: application/json
Content-Type: application/json
{
  "name": "TestUeser",
  "email": "teste@mail.com",
  "password": "Az123456!",
  "confirmationPassword": "Az123456!"
}

# Login a User
POST {{host}}/api/auth/login
Accept: application/json
Content-Type: application/json
{
  "email": "teste@mail.com",
  "password": "Az123456!"
}

# Refresh a User Tokens
POST {{host}}/api/auth/refresh
Accept: application/json
Content-Type: application/json
{
  "refreshToken": "y+ioUIYxr1+rOb9pWH8J/8taXdf5w2t4srbK7rp3g2o="
}
