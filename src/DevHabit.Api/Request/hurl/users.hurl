[Options]
variable: host=https://localhost:5001
variable: user_id=u_dummy

# Get User by Id
GET {{host}}/api/users/{{user_id}}
Accept: application/json