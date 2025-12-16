# Get Tags
GET {{host}}/api/tags
Accept: application/vnd.dev-habit.hateoas+json

# Get Tag by Id
GET {{host}}/api/tags/t_019b264d-8f94-79ea-ba8d-f4e21905b35c
Accept: application/vnd.dev-habit.hateoas+json

# Create Tag
POST {{host}}/api/tags
Accept: application/json
Content-Type: application/json
{
  "name": "Hurl nvim",
  "description": null
}

# Update Tag
PUT {{host}}/api/tags/{{tag_resource_id}}
Accept: application/json
Content-Type: application/json
{
  "name": "Coding",
  "description": "The new description"
}

# Delete Tag
DELETE {{host}}/api/tags/{{tag_resource_id}}
Accept: application/json
