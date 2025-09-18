# API Documentation: `POST /users/register`

## Description
Registers a new user in the system. This endpoint creates a user account with the provided details and returns a success message or error information.

## Endpoint
`POST /users/register`

## Required Data (Request Body)
Send as JSON:
```
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (required)"
}
```

## Status Codes
- **201 Created**: User registered successfully
- **400 Bad Request**: Validation error (missing or invalid fields)
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Server error

## Example Request
```
POST /users/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Example Response (Success)
```
{
  "message": "User registered successfully"
}
```

## Example Response (Validation Error)
```
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", ... }
  ]
}
```

---
For more details, see the controller and service logic in the codebase.