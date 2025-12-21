[Options]
variable: host=https://localhost:5001
variable: habit_id=h_dummy
variable: tag_id=t_dummy
variable: tag_id_1=t_dummy_1
variable: tag_id_2=t_dummy_2

# Upsert Habit Tags
PUT {{host}}/api/habits/{{habit_id}}/tags
Accept: application/json
Content-Type: application/json
{
  "tagIds": [
    "{{tag_id_1}}",
    "{{tag_id_2}}"
  ]
}

# Delete Habit Tag
DELETE {{host}}/api/habits/{{habit_id}}/tags/{{tag_id}}
Accept: application/json