# Auth & Blog API

A robust Express.js REST API featuring user authentication and blog post management.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Email verification system
- Password reset functionality
- Account verification with time-limited codes

### Blog Posts
- Create, read, update, and delete blog posts
- Pagination for post listings
- User-specific post management
- Authentication middleware for protected routes

## Tech Stack

- **Node.js & Express** - Backend framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service integration
- **Joi** - Data validation
- **Helmet** - Security headers
- **Cookie-parser** - Cookie management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)
- Gmail account for sending verification emails

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fawwazmw/auth-blog-api.git
   cd auth-blog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your credentials:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   NODE_CODE_SENDING_EMAIL_ADDRESS=your_gmail@gmail.com
   NODE_CODE_SENDING_PASSWORD=your_app_password
   HMAC_VERIFICATION_CODE_SECRET=your_hmac_secret
   ```

### Running the Server

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/signin` | Log in a user | No |
| POST | `/api/auth/signout` | Log out a user | Yes |
| PATCH | `/api/auth/send-verification-code` | Send email verification code | Yes |
| PATCH | `/api/auth/verify-verification-code` | Verify email with code | Yes |
| PATCH | `/api/auth/change-password` | Change user password | Yes |
| PATCH | `/api/auth/send-forgot-password-code` | Send password reset code | No |
| PATCH | `/api/auth/verify-forgot-password-code` | Reset password with code | No |

### Blog Post Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | `/api/posts/all-posts` | Get paginated posts | No |
| GET | `/api/posts/single-post` | Get a specific post | No |
| POST | `/api/posts/create-post` | Create a new post | Yes |
| PUT | `/api/posts/update-post` | Update a post | Yes |
| DELETE | `/api/posts/delete-post` | Delete a post | Yes |

## Request and Response Examples

### Authentication

#### Sign Up
```
POST /api/auth/signup
```
Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Response:
```json
{
  "success": true,
  "message": "Your account has been created successfully",
  "result": {
    "email": "user@example.com",
    "verified": false,
    "_id": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-22T17:21:42.033Z",
    "updatedAt": "2023-06-22T17:21:42.033Z"
  }
}
```

#### Sign In
```
POST /api/auth/signin
```
Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "logged in successfully"
}
```

### Blog Posts

#### Create Post
```
POST /api/posts/create-post
```
Request headers:
```
Authorization: Bearer [JWT_TOKEN]
```
Request body:
```json
{
  "title": "My First Blog Post",
  "description": "This is the content of my first blog post."
}
```
Response:
```json
{
  "success": true,
  "message": "Created",
  "data": {
    "title": "My First Blog Post",
    "description": "This is the content of my first blog post.",
    "userId": "60d21b4667d0d8992e610c85",
    "_id": "60d21c1b67d0d8992e610c86",
    "createdAt": "2023-06-22T17:24:59.033Z",
    "updatedAt": "2023-06-22T17:24:59.033Z"
  }
}
```

#### Get All Posts
```
GET /api/posts/all-posts?page=1
```
Response:
```json
{
  "success": true,
  "message": "posts",
  "data": [
    {
      "_id": "60d21c1b67d0d8992e610c86",
      "title": "My First Blog Post",
      "description": "This is the content of my first blog post.",
      "userId": {
        "_id": "60d21b4667d0d8992e610c85",
        "email": "user@example.com"
      },
      "createdAt": "2023-06-22T17:24:59.033Z",
      "updatedAt": "2023-06-22T17:24:59.033Z"
    }
  ]
}
```

## Security Considerations

- JWT tokens are stored in HTTP-only cookies for browser clients
- Passwords are hashed using bcrypt
- Verification codes are hashed using HMAC
- Codes expire after 5 minutes
- Helmet is used to set secure HTTP headers

## Project Structure

```
├── controllers/         # Request handlers
│   ├── auth.controller.js
│   └── post.controller.js
├── middlewares/         # Express middlewares
│   ├── identification.middleware.js
│   ├── sendmail.middleware.js
│   └── validator.middleware.js
├── models/              # Mongoose models
│   ├── post.model.js
│   └── user.model.js
├── routes/              # API routes
│   ├── auth.routes.js
│   └── post.routes.js
├── utils/               # Utility functions
│   └── hashing.js
├── .env                 # Environment variables (gitignored)
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
└── server.js            # Application entry point
```

## License

This project is licensed under the [MIT License](https://opensource.org/license/MIT) - see the LICENSE file for details.