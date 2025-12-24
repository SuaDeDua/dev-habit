# Get Tags
GET {{host}}/api/tags
Authorization: Bearer {{token}}
Accept: application/vnd.dev-habit.hateoas+json

# Get Tag by Id
GET {{host}}/api/tags/{{tag_id}}
Authorization: Bearer {{token}}
Accept: application/vnd.dev-habit.hateoas+json

# Create Tag
POST {{host}}/api/tags
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/json
{
  "name": "hurl",
  "description": null
}

# Update Tag
PUT {{host}}/api/tags/{{tag_id}}
Authorization: Bearer {{token}}
Accept: application/json
Content-Type: application/json
{
  "name": "Coding",
  "description": "The new description"
}

# Delete Tag
DELETE {{host}}/api/tags/{{tag_id}}
Authorization: Bearer {{token}}
Accept: application/json

[Options]
variable: host=https://localhost:5001
variable: tag_id=t_dummy
variable: token=dummy_token