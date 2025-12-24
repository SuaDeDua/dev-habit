# Get User by Id
GET {{host}}/api/users/{{user_id}}
Authorization: Bearer {{token}}
Accept: application/json

[Options]
variable: host=https://localhost:5001
variable: user_id=u_dummy
variable: token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkZXYtaGFiaXQuYXBwIiwiaXNzIjoiZGV2LWhhYml0LmFwaSIsImV4cCI6MTc2NjM5NzI4MCwic3ViIjoiNDU1YzRkYmEtMTdkMy00MmU1LTkxY2MtYmZkZmZjOWZhYzU4IiwiZW1haWwiOiJzdWFkZWR1YUBtYWlsLmNvbSIsImlhdCI6MTc2NjM5NTQ4MCwibmJmIjoxNzY2Mzk1NDgwfQ.ByVxBpSKqc3Z3pFve6H6Fx7LN5IU7Lpb-kwAg7qX9uc"

# Get current User
GET {{host}}/api/users/me
Authorization: Bearer {{token}}
Accept: application/json
