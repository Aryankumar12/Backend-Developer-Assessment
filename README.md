# Experiences Marketplace Backend

Backend API for an experiences marketplace with JWT authentication and role-based access control.

## Tech Stack
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT + bcrypt

## Setup Instructions

### 1. Install dependencies
```bash
npm install




// enevironment variables : 
PORT=3000
JWT_SECRET=supersecret
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/experiences_db



npx prisma migrate dev



//How to Run the Project
npm run dev


Server will start at:

http://localhost:3000




API Examples (curl)
Signup
curl -X POST http://localhost:3000/auth/signup \
-H "Content-Type: application/json" \
-d '{"email":"user@test.com","password":"123456","role":"user"}'

Login
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"user@test.com","password":"123456"}'

Create Experience (Host only)
curl -X POST http://localhost:3000/experiences \
-H "Authorization: Bearer HOST_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title":"Mountain Trip","description":"Hiking experience","location":"Manali","price":5000,"startTime":"2026-03-01T10:00:00Z"}'

Publish Experience (Owner Host or Admin)
curl -X PATCH http://localhost:3000/experiences/EXPERIENCE_ID/publish \
-H "Authorization: Bearer HOST_TOKEN"

Block Experience (Admin only)
curl -X PATCH http://localhost:3000/experiences/EXPERIENCE_ID/block \
-H "Authorization: Bearer ADMIN_TOKEN"

List Published Experiences (Public)
curl http://localhost:3000/experiences

Book Experience (User only)
curl -X POST http://localhost:3000/experiences/EXPERIENCE_ID/book \
-H "Authorization: Bearer USER_TOKEN" \
-H "Content-Type: application/json" \
-d '{"seats":2}'

/// RBAC Rules Implemented

            Only hosts and admins can create experiences

            Only owner host or admin can publish experiences

            Only admins can block experiences

            Only users can book experiences

            Public users can see only published experiences

            Database Indexes

experiences(location, startTime) for faster filtering and sorting

bookings(userId, experienceId) to prevent duplicate bookings


---

