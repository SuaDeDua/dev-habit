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
DELETE {{host}}/api/habits/{{habit_id}}/tags/{{tag_id_delete}}
Accept: application/json
