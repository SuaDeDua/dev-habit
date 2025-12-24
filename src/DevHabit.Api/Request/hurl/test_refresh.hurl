# 1. Register a new User
POST {{host}}/api/auth/register
Content-Type: application/json
{
  "name": "Refresher_{{email}}",
  "email": "{{email}}",
  "password": "Password123!",
  "confirmationPassword": "Password123!"
}
HTTP 200
[Captures]
refresh_token: jsonpath "$.refreshToken"
access_token: jsonpath "$.accessToken"

# 2. Refresh Token immediately
POST {{host}}/api/auth/refresh
Content-Type: application/json
{
  "refreshToken": "{{refresh_token}}"
}
HTTP 200
[Captures]
new_access_token: jsonpath "$.accessToken"
new_refresh_token: jsonpath "$.refreshToken"
