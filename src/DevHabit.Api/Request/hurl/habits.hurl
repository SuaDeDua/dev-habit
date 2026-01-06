# Get Habits
GET {{host}}/api/habits?fields=id,name,createdAtUtc
Authorization: Bearer {{token}}
Accept: application/json

# Get Habit by Id
GET {{host}}/api/habits/h_019b4dd0-b252-7b3b-9792-b6bfb63c93ad
Authorization: Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkZXYtaGFiaXQuYXBwIiwiaXNzIjoiZGV2LWhhYml0LmFwaSIsImV4cCI6MTc2NjY1MjgxNywic3ViIjoiNDU1YzRkYmEtMTdkMy00MmU1LTkxY2MtYmZkZmZjOWZhYzU4IiwiZW1haWwiOiJzdWFkZWR1YUBtYWlsLmNvbSIsImlhdCI6MTc2NjY1MTAxNywibmJmIjoxNzY2NjUxMDE3fQ.N_tYUAOEQx8GovQNY7uxNH9fP8zr6r5GYZnJHMW5bC8"
Content-Type: application/vnd.dev-habit.hateoas.1+json

# Create Habit
POST {{host}}/api/habits
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/json
{
  "name": "hurl better than kulala",
  "description": null,
  "type": 1,
  "frequency": {
    "type": 2,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 30,
    "unit": "minutes"
  },
  "milestone": {
    "target": 1
  },
  "endDate": "2024-12-01"
}

# Update Habit
PUT {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/json
{
  "name": "Daily Coding",
  "description": "The new description",
  "type": 2,
  "frequency": {
    "type": 2,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 30,
    "unit": "minutes"
  },
  "milestone": {
    "target": 1
  }
}

# Partially Update Habit
PATCH {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Daily Coding (Update)"
  },
  {
    "op": "remove",
    "path": "/description"
  }
]

# Delete Habit
DELETE {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
Accept: application/json

[Options]
variable: host=https://localhost:5001
variable: habit_id=h_dummy
variable: token=dummy_token
