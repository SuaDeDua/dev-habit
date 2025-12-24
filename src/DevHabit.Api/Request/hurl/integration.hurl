[Options]
variable: email=longnd2@mail.com

# 1. Register a new User
POST {{host}}/api/auth/register
Content-Type: application/json
{
  "name": "User_{{email}}",
  "email": "{{email}}",
  "password": "Password123!",
  "confirmationPassword": "Password123!"
}
HTTP 200

# 2. Login to get Access Token
POST {{host}}/api/auth/login
Content-Type: application/json
{
  "email": "{{email}}",
  "password": "Password123!"
}
HTTP 200
[Captures]
token: jsonpath "$.accessToken"

# 3. Create a Habit
POST {{host}}/api/habits
Authorization: Bearer {{token}}
Content-Type: application/json
{
  "name": "Test Hurl Habit",
  "description": "Testing with Hurl",
  "type": 2,
  "frequency": {
    "type": 2,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 30,
    "unit": "minutes"
  },
  "endDate": "2025-12-31"
}
HTTP 201
[Captures]
habit_id: jsonpath "$.id"

# 4. Get the Created Habit
GET {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Test Hurl Habit"

# 5. Update the Habit
PUT {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
Content-Type: application/json
{
  "name": "Updated Hurl Habit",
  "description": "Updated description",
  "type": 2,
  "frequency": {
    "type": 2,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 60,
    "unit": "minutes"
  }
}
HTTP 204

# 6. Verify Update
GET {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Updated Hurl Habit"
jsonpath "$.target.value" == 60

# 7. Delete the Habit
DELETE {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
HTTP 204

# 8. Verify Deletion (Should be 404)
GET {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
HTTP 404
