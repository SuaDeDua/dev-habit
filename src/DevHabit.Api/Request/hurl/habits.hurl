# Get Habits
GET {{host}}/api/habits?fields=id,name,createdAtUtc
Authorization: Bearer {{token}}
Accept: application/json

# Get Habit by Id
GET {{host}}/api/habits/{{habit_id}}
Authorization: Bearer {{token}}
Content-Type: application/vnd.dev-habit.hateoas+json

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