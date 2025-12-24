# Register a User
POST {{host}}/api/auth/register
Accept: application/json
Content-Type: application/json
{
  "name": "suadedua",
  "email": "suadedua@mail.com",
  "password": "Az123456!",
  "confirmationPassword": "Az123456!"
}

# Login a User
POST {{host}}/api/auth/login
Accept: application/json
Content-Type: application/json
{
  "email": "suadedua@mail.com",
  "password": "Az123456!"
}

# Refresh a User Tokens
POST {{host}}/api/auth/refresh
Accept: application/json
Content-Type: application/json
{
  "refreshToken": "MDE5YjQ1MWEtOTVkNS03NjQxLTkzNDMtYWUwMWMyMDVjNTNhMqg6wSN/7Ng0e1Hfd0fSvgd+Szh7IF5pDvmAOQjB4y8="
}

