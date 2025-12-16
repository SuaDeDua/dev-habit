# Get Habits
GET {{host}}/api/habits?fields=id,name
# Accept: application/vnd.dev-habit.hateoas+json
Accept: application/json

# Get Habit by Id
GET {{host}}/api/habits/{{habit_resource_id}}
Content-Type: application/vnd.dev-habit.hateoas+json

# Create Habit
POST {{host}}/api/habits
Accept: application/json
Content-Type: application/json
{
  "name": null,
  "description": null,
  "type": 4,
  "frequency": {
    "type": 5,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 30,
    "unit": "minutes"
  },
  "milestone": {
    "target": -1
  },
  "endDate": "2024-12-01"
}

# Update Habit
PUT {{host}}/api/habits/{{habit_resource_id}}
Accept: application/json
Content-Type: application/json
{
  "name": "Daily Coding",
  "description": "The new description",
  "type": 2,
  "frequency": {
    "type": 1,
    "timesPerPeriod": 1
  },
  "target": {
    "value": 30,
    "unit": "minutes"
  },
  "milestone": {
    "target": 100
  }
}

# Partially Update Habit
PATCH {{host}}/api/habits/{{habit_resource_id}}
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
DELETE {{host}}/api/habits/
Accept: application/json
