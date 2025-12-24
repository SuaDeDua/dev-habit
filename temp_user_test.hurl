# 1. Register a new user
POST {{host}}/api/auth/register
Content-Type: application/json
{
  "name": "UserMe_{{email}}",
  "email": "{{email}}",
  "password": "Password123!",
  "confirmationPassword": "Password123!"
}
HTTP 200
[Captures]
token: jsonpath "$.accessToken"

# 2. Get My Profile
GET {{host}}/api/users/me
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.email" == "{{email}}"
