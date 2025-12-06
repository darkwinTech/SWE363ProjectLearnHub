# Learn Hub
## Description:
Learn Hub is a university-based initiative designed to enhance and modernize the peer 
tutoring experience. The project aims to connect students who are capable of offering 
academic support with those who need assistance in specific courses, creating a 
structured and accessible system for learning.
Instead of relying on informal or unstructured methods, the platform provides a unified space where learners can:
- Find academic support.
- Explore tutor profiles.
- Schedule tutoring sessions that match their academic needs and availability.
  
Key Features:
- Course-Based Search: Easily find tutors and sessions by course code or subject.
- Tutor Ratings & Reviews: Evaluate tutor performance and choose the best fit.
- Favorites: Save preferred tutors and courses for future sessions.
- Interactive Tools: Tutors can share resources and organize study sessions efficiently.
- Admin Dashboard: Administrators manage tutors, courses, and oversee all activities to maintain system quality.

By centralizing these interactions, Learn Hub ensures a smoother, more reliable tutoring process that saves time and promotes academic success within the university community.

# Setup and installation instructions
Follow these steps to set up Learn Hub locally:
1. Clone the repository (https://github.com/darkwinTech/SWE363ProjectLearnHub.git)
2. Navigate to the project directory (cd SWE363ProjectLearnHub)

## Backend Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** (comes with Node.js)

### Step-by-Step Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/learnhub
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```
   
   **Note:** 
   - For local MongoDB: Use `mongodb+srv://user:pass@cluster.mongodb.net/learnhub`
   - For MongoDB Atlas: Use your connection string from Atlas dashboard
   - Replace `your-secret-key-here` with a strong, random secret key for JWT token signing
   - The PORT is optional (defaults to 5000)

4. **Start MongoDB:**
   - If using local MongoDB, ensure MongoDB service is running
   - If using MongoDB Atlas, your connection string should already be configured

5. **Seed the database (optional but recommended):**
   ```bash
   # Seed all data (users, courses, sessions, etc.)
   npm run seed:all
   ```

6. **Start the backend server:**
   ```bash
   npm start
   # or
   node server.js
   ```

7. **Verify the server is running:**
   - The server should start on `http://localhost:5000`
   - You can test it by visiting `http://localhost:5000` in your browser or using:
     ```bash
     curl http://localhost:5000
     ```
   - Expected response: `{"message":"backend is running well!"}`


## Frontend Setup
1. Navigate to the Project Directory (cd frontend)
2. Install dependencies (npm install)
3. Start the Frontend Development Server (npm start)
4. Frontend will run at (http://localhost:3000)

# Usage instructions and examples
Once the server is running, there are three types of users in Learn Hub: Admin, Tutor, and Student.
Each user type has its own credentials and access level within the system.

To login, use the following credentials based on your role:

## 1. Admin
- **Email:** student_affairs@kfupm.edu.sa
- **Password:** admin123

## 2. Tutor
- **Emails:**
  - ahmed.tutor@kfupm.edu.sa
  - fatima.tutor@kfupm.edu.sa
  - mohammed.tutor@kfupm.edu.sa
  - sara.tutor@kfupm.edu.sa
- **Password:** tutor123

## 3. Student
- **Emails:**
  - hayat.student@kfupm.edu.sa
  - aleen.student@kfupm.edu.sa
  - ghada.student@kfupm.edu.sa
  - fatima.student@kfupm.edu.sa
- **Password:** student123

# User Features

## Student Features
- Find tutors and courses
- Book tutoring sessions
    - Rate and review tutors
- Save favorites

## Tutor Features
- Create and manage sessions
- View student bookings
- See reviews and ratings

## Admin Features
- Manage courses and sessions
- Review tutor applications
- Create announcements
- View analytics dashboard

# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

To obtain a token, use the login endpoint (see Authentication section below).

## Response Format
Most API responses follow this structure (endpoints using `convertingResponse` middleware):
```json
{
  "statusCode": 200,
  "data": { ... },
  "error": null
}
```

Error responses:
```json
{
  "statusCode": 400,
  "data": null,
  "error": {
    "message": "Error message here"
  }
}
```

**Note:** Some endpoints (Booking and Application) return direct JSON responses without the standard wrapper format. See individual endpoint documentation for exact response structures.

---

## Authentication Endpoints

### POST `/api/auth/login`
Login and receive a JWT token.

**Request Body:**
```json
{
  "email": "hayat.student@kfupm.edu.sa",
  "password": "student123"
}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Hayat Alghamdi",
      "email": "hayat.student@kfupm.edu.sa",
      "role": "student"
    }
  },
  "error": null
}
```

**Error Responses:**
- `400`: Email and password are required
- `401`: Wrong credentials

---

### GET `/api/auth/profile`
Get current user's profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Hayat Alghamdi",
    "email": "hayat.student@kfupm.edu.sa",
    "role": "student",
    "studentId": "202012345"
  },
  "error": null
}
```

---

### GET `/api/auth/tutor`
Get tutor profile by studentId, name, or tutorId (requires authentication).

**Query Parameters:**
- `studentId` (optional): Student ID of the tutor
- `name` (optional): Name of the tutor
- `tutorId` (optional): MongoDB ObjectId of the tutor

**Example:**
```
GET /api/auth/tutor?studentId=202012345
GET /api/auth/tutor?name=Ahmed
GET /api/auth/tutor?tutorId=507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Tutor",
    "email": "ahmed.tutor@kfupm.edu.sa",
    "role": "tutor",
    "studentId": "202012345"
  },
  "error": null
}
```

---

## Course Endpoints

### GET `/api/courses`
Get all courses with optional filtering.

**Query Parameters:**
- `department` (optional): Filter by department
- `search` (optional): Search in title, description, or courseId

**Example:**
```
GET /api/courses
GET /api/courses?department=Computer Science
GET /api/courses?search=SWE363
GET /api/courses?department=Computer Science&search=ICS
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "courseId": "SWE363",
      "title": "Software Engineering",
      "description": "Introduction to software engineering principles",
      "department": "Software Engineering"
    }
  ],
  "error": null
}
```

---

### GET `/api/courses/courseId/:courseId`
Get a specific course by courseId (requires authentication).

**Roles:** student, tutor, admin

**Example:**
```
GET /api/courses/courseId/SWE363
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseId": "SWE363",
    "title": "Software Engineering",
    "description": "Introduction to software engineering principles",
    "department": "Software Engineering"
  },
  "error": null
}
```

---

### POST `/api/courses`
Create a new course (admin only).

**Request Body:**
```json
{
  "courseId": "SWE363",
  "title": "Software Engineering",
  "description": "Introduction to software engineering principles",
  "department": "Software Engineering"
}
```

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseId": "SWE363",
    "title": "Software Engineering",
    "description": "Introduction to software engineering principles",
    "department": "Software Engineering"
  },
  "error": null
}
```

---

### PUT `/api/courses/:id`
Update a course (admin only).

**Request Body:**
```json
{
  "title": "Advanced Software Engineering",
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseId": "SWE363",
    "title": "Advanced Software Engineering",
    "description": "Updated description",
    "department": "Software Engineering"
  },
  "error": null
}
```

---

### DELETE `/api/courses/:id`
Delete a course (admin only).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Course deleted successfully"
  },
  "error": null
}
```

---

### GET `/api/courses/department/:department`
Get courses by department.

**Example:**
```
GET /api/courses/department/Computer Science
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "courseId": "SWE363",
      "title": "Software Engineering",
      "department": "Computer Science"
    }
  ],
  "error": null
}
```

---

## Booking Endpoints

### POST `/api/bookings/create`
Create a booking for a session (student, tutor).

**Request Body:**
```json
{
  "sessionId": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "507f1f77bcf86cd799439011",
    "studentId": "507f1f77bcf86cd799439012",
    "status": "active"
  }
}
```

**Error Responses:**
- `400`: sessionId is required
- `403`: Only students or tutors can book sessions
- `409`: You already booked this session
- `500`: Server error

---

### GET `/api/bookings/my-bookings`
Get all bookings for the current user (student, tutor).

**Response (200):**
```json
{
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sessionId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Session Name",
        "date": "2024-12-20"
      },
      "studentId": "507f1f77bcf86cd799439012",
      "status": "active"
    }
  ]
}
```

**Response (200) - No bookings:**
```json
{
  "bookings": [],
  "message": "No bookings found"
}
```

---

### DELETE `/api/bookings/cancel/:id`
Cancel a booking (student, tutor, admin).

**Response (200):**
```json
{
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "507f1f77bcf86cd799439011",
    "studentId": "507f1f77bcf86cd799439012",
    "status": "cancelled"
  }
}
```

**Error Responses:**
- `403`: Not allowed
- `404`: Booking not found

---

### GET `/api/bookings/session/:sessionId`
Get all bookings for a specific session (tutor, admin).

**Response (200):**
```json
{
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sessionId": "507f1f77bcf86cd799439011",
      "studentId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Student Name",
        "email": "student@kfupm.edu.sa"
      },
      "status": "active"
    }
  ]
}
```

---

## Session Endpoints

### POST `/api/session/totur-create-session`
Create a new session (tutor).

**Request Body:**
```json
{
  "courseId": "507f1f77bcf86cd799439011",
  "tutorId": "507f1f77bcf86cd799439012",
  "tutorName": "Ahmed Tutor",
  "title": "Web Development",
  "description": "Learn Web Development Tools",
  "dateTime": "2024-12-20T14:00:00Z",
  "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
  "status": "active"
}
```

**Required Fields:**
- `courseId`: MongoDB ObjectId of the course
- `tutorId`: MongoDB ObjectId of the tutor
- `tutorName`: Name of the tutor
- `title`: Session title
- `dateTime`: Session date and time (ISO format)
- `teamsLink`: Microsoft Teams meeting link

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439011",
    "tutorId": "507f1f77bcf86cd799439012",
    "tutorName": "Ahmed Tutor",
    "title": "Web Development",
    "description": "Learn Web Development Tools",
    "dateTime": "2024-12-20T14:00:00Z",
    "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
    "status": "active"
  },
  "error": null
}
```

**Error Responses:**
- `400`: tutorId, courseId, title, dateTime and teamsLink are required
- `400`: Course id is not valid
- `400`: Tutor id is not valid

---

### GET `/api/session/read-session`
Get all sessions (no authentication required).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "courseId": "507f1f77bcf86cd799439011",
      "tutorId": "507f1f77bcf86cd799439012",
      "tutorName": "Ahmed Tutor",
      "title": "Web Development",
      "description": "Learn Web Development Tools",
      "dateTime": "2024-12-20T14:00:00Z",
      "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
      "status": "active"
    }
  ],
  "error": null
}
```

**Response (200) - No sessions:**
```json
{
  "statusCode": 200,
  "data": {
    "message": "No Sessions are found."
  },
  "error": null
}
```

---

### POST `/api/session/totur-edit-session`
Update a session (tutor).

**Request Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439011",
  "tutorId": "507f1f77bcf86cd799439012",
  "tutorName": "Ahmed Tutor",
  "title": "Advanced Web Development",
  "description": "Updated description",
  "dateTime": "2024-12-20T15:00:00Z",
  "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
  "status": "active"
}
```

**Required Fields:**
- `_id`: Session MongoDB ObjectId
- `courseId`: MongoDB ObjectId of the course
- `tutorId`: MongoDB ObjectId of the tutor
- `tutorName`: Name of the tutor
- `title`: Session title
- `dateTime`: Session date and time (ISO format)
- `teamsLink`: Microsoft Teams meeting link

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439011",
    "tutorId": "507f1f77bcf86cd799439012",
    "title": "Advanced Web Development",
    "description": "Updated description",
    "dateTime": "2024-12-20T15:00:00Z",
    "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
    "status": "active"
  },
  "error": null
}
```

**Error Responses:**
- `400`: Session _id is required
- `400`: tutorId, courseId, title, dateTime and teamsLink are required

---

### POST `/api/session/totur-delete-session`
Delete a session (tutor).

**Request Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "deleted_session": {}
  },
  "error": null
}
```

**Error Responses:**
- `400`: Session is not valid

---

### POST `/api/session/admin-edit-session`
Update a session (admin). Same request/response format as tutor edit session.

**Request Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439011",
  "tutorId": "507f1f77bcf86cd799439012",
  "tutorName": "Ahmed Tutor",
  "title": "Updated Session Title",
  "dateTime": "2024-12-20T14:00:00Z",
  "teamsLink": "https://teams.microsoft.com/l/meetup-join/...",
  "status": "active"
}
```

---

### POST `/api/session/admin-delete-session`
Delete a session (admin). Same request/response format as tutor delete session.

**Request Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011"
}
```

---

## Application Endpoints

### GET `/api/applications`
Get all pending applications (admin only).

**Response (200):**
```json
{
  "success": true,
  "applications": [
    {
      "id": "507f1f77bcf86cd799439011",
      "studentName": "Ahmed Student",
      "courseName": "Software Engineering",
      "courseCode": "SWE363",
      "department": "Software Engineering",
      "grade": "A",
      "status": "pending",
      "appliedAt": "2024-12-20T10:00:00.000Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Server error while fetching applications",
  "error": "Error message",
  "applications": []
}
```

---

### PUT `/api/applications/status/:id`
Update application status (admin only).

**Request Body:**
```json
{
  "status": "approved"
}
```

**Valid Status Values:**
- `pending`
- `approved`
- `rejected`

**Response (200):**
```json
{
  "success": true,
  "message": "Application status updated successfully",
  "application": {
    "id": "507f1f77bcf86cd799439011",
    "studentName": "Ahmed Student",
    "courseName": "Software Engineering",
    "courseCode": "SWE363",
    "grade": "A",
    "status": "approved",
    "appliedAt": "2024-12-20T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Status is required
- `400`: Invalid status. Must be one of: pending, approved, rejected
- `404`: Application not found
- `500`: Server error while updating application

---

## Review Endpoints

### POST `/api/reviews/submit`
Submit a review (student, tutor, admin).

**Request Body:**
```json
{
  "tutorId": "507f1f77bcf86cd799439011",
  "sessionId": "507f1f77bcf86cd799439012",
  "rating": 5,
  "comment": "Excellent tutor, very helpful!"
}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "tutorId": "507f1f77bcf86cd799439011",
    "sessionId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "Excellent tutor, very helpful!",
    "studentId": "507f1f77bcf86cd799439013"
  },
  "error": null
}
```

---

### GET `/api/reviews/tutor/:tutorId`
Get all reviews for a tutor (student, tutor, admin).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "tutorId": "507f1f77bcf86cd799439011",
      "rating": 5,
      "comment": "Excellent tutor!",
      "studentId": "507f1f77bcf86cd799439013"
    }
  ],
  "error": null
}
```

---

### GET `/api/reviews/session/:sessionId`
Get review for a specific session (student, tutor, admin).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "507f1f77bcf86cd799439012",
    "rating": 5,
    "comment": "Great session!",
    "tutorId": "507f1f77bcf86cd799439011",
    "studentId": "507f1f77bcf86cd799439013"
  },
  "error": null
}
```

---

## Favorite Endpoints

### GET `/api/favorites`
Get all favorites for the current user (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "courses": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "courseId": "SWE363",
        "title": "Software Engineering"
      }
    ],
    "tutors": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Ahmed Tutor",
        "email": "ahmed.tutor@kfupm.edu.sa"
      }
    ]
  },
  "error": null
}
```

---

### POST `/api/favorites/courses/:courseId`
Add a course to favorites (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Course added to favorites"
  },
  "error": null
}
```

---

### DELETE `/api/favorites/courses/:courseId`
Remove a course from favorites (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Course removed from favorites"
  },
  "error": null
}
```

---

### POST `/api/favorites/tutors/:studentId`
Add a tutor to favorites (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Tutor added to favorites"
  },
  "error": null
}
```

---

### DELETE `/api/favorites/tutors/:studentId`
Remove a tutor from favorites (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Tutor removed from favorites"
  },
  "error": null
}
```

---

## Announcement Endpoints

### POST `/api/announcement/admin/make-announcement`
Create an announcement (admin).

**Request Body:**
```json
{
  "adminId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "title": "Important Update",
  "content": "New features have been added to the platform",
  "targetLevel": "all"
}
```

**Required Fields:**
- `adminId`: MongoDB ObjectId of the admin
- `courseId`: MongoDB ObjectId of the course
- `title`: Announcement title
- `content`: Announcement content

**Optional Fields:**
- `targetLevel`: Target level for the announcement

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "adminId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012",
    "title": "Important Update",
    "content": "New features have been added to the platform",
    "targetLevel": "all",
    "createdAt": "2024-12-20T10:00:00.000Z"
  },
  "error": null
}
```

**Error Responses:**
- `400`: adminId, courseId, title, content and courseId are required
- `400`: Admin id is not valid
- `400`: Course id is not valid

---

### GET `/api/announcement/view-announcement`
Get all announcements (no authentication required).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "adminId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Admin Name"
      },
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "courseId": "SWE363",
        "title": "Software Engineering"
      },
      "title": "Important Update",
      "content": "New features have been added",
      "targetLevel": "all",
      "createdAt": "2024-12-20T10:00:00.000Z"
    }
  ],
  "error": null
}
```

**Response (200) - No announcements:**
```json
{
  "statusCode": 200,
  "data": {
    "message": "No Announcements are found.",
    "announcements": []
  },
  "error": null
}
```

---

## Notification Endpoints

### GET `/api/notifications`
Get all notifications for the current user (student, tutor, admin).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "title": "New Booking",
      "message": "You have a new booking for session SWE363",
      "read": false,
      "createdAt": "2024-12-20T10:00:00.000Z"
    }
  ],
  "error": null
}
```

---

### PUT `/api/notifications/:id`
Mark a notification as read (student, tutor, admin).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "message": "Notification marked as read"
  },
  "error": null
}
```

---

## Support Endpoints

### POST `/api/support`
Create a support ticket (student, tutor).

**Request Body:**
```json
{
  "issue": "I cannot log in to my account"
}
```

**Required Fields:**
- `issue`: Description of the support issue

**Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "issue": "I cannot log in to my account",
    "status": "open",
    "response": null,
    "createdAt": "2024-12-20T10:00:00.000Z"
  },
  "error": null
}
```

**Error Responses:**
- `400`: Issue is required
- `400`: User ID is required
- `400`: User ID is not valid

---

### GET `/api/support/my`
Get all support tickets for the current user (student, tutor).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "issue": "I cannot log in to my account",
      "status": "open",
      "response": null,
      "createdAt": "2024-12-20T10:00:00.000Z"
    }
  ],
  "error": null
}
```

---

### GET `/api/support`
Get all support tickets (admin only).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Student Name",
        "email": "student@kfupm.edu.sa"
      },
      "issue": "I cannot log in to my account",
      "status": "open",
      "response": null,
      "createdAt": "2024-12-20T10:00:00.000Z"
    }
  ],
  "error": null
}
```

---

### PUT `/api/support/:id`
Respond to a support ticket (admin only).

**Request Body:**
```json
{
  "response": "We have reset your password. Please check your email.",
  "status": "in-progress"
}
```

**Required Fields:**
- `response`: Admin's response to the ticket

**Optional Fields:**
- `status`: Ticket status (defaults to "in-progress")

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "issue": "I cannot log in to my account",
    "status": "in-progress",
    "response": "We have reset your password. Please check your email.",
    "respondedBy": "507f1f77bcf86cd799439013",
    "createdAt": "2024-12-20T10:00:00.000Z",
    "updatedAt": "2024-12-20T11:00:00.000Z"
  },
  "error": null
}
```

**Error Responses:**
- `400`: Ticket ID is required
- `400`: Ticket ID is not valid
- `400`: Response is required
- `404`: Ticket not found

---

## Analytics Endpoints

### GET `/api/analytics`
Get analytics data (admin only).

**Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "totalUsers": 100,
    "totalTutors": 20,
    "totalStudents": 80,
    "totalSessions": 50,
    "totalBookings": 200,
    "totalCourses": 30
  },
  "error": null
}
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

## Team member names and roles.
- Aleen Alqarni  
  - Notifications controllers, Notifications routes, Notifications middleware, integration and linking Notifications to Frontend  
  - Support controllers, Support routes, Support middleware, integration and linking Support to Frontend  

- Ghada Alghamdi  
  - Sessions controllers, Sessions routes, Sessions middleware, integration and linking Sessions to Frontend  
  - Announcements controllers, Announcements routes, Announcements middleware, integration and linking Announcements to Frontend  

- Hayat Alghamdi  
  - Course controllers, Course routes, Course middleware, integration and linking Course to Frontend  
  - Favorite controllers, Favorite routes, Favorite middleware, integration and linking Favorite to Frontend  
  - Review controllers, Review routes, Review middleware, integration and linking Review to Frontend  

- Fatima Labban  
  - Booking controllers, Booking routes, Booking middleware, integration and linking Booking to Frontend  
  - Applications controllers, Applications routes, Applications middleware, integration and linking Applications to Frontend  






