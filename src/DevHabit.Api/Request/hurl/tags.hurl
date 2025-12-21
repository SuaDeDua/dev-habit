[Options]
variable: host=https://localhost:5001
variable: tag_id=t_dummy

# Get Tags
GET {{host}}/api/tags
Accept: application/vnd.dev-habit.hateoas+json

# Get Tag by Id
GET {{host}}/api/tags/{{tag_id}}
Accept: application/vnd.dev-habit.hateoas+json

# Create Tag
POST {{host}}/api/tags
Accept: application/json
Content-Type: application/json
{
  "name": "hurl",
  "description": null
}

# Update Tag
PUT {{host}}/api/tags/{{tag_id}}
Accept: application/json
Content-Type: application/json
{
  "name": "Coding",
  "description": "The new description"
}

# Delete Tag
DELETE {{host}}/api/tags/{{tag_id}}
Accept: application/json