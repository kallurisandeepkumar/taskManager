# Task Manager API

A RESTful API for managing tasks and teams built with Node.js, Express, TypeScript, and Prisma with MongoDB.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables in `.env`:
```
DATABASE_URL="mongodb+srv://your-mongodb-url"
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```
4. Run database seed:
```bash
npm run seed
```
5. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login`
  - Body: `{ "email": "string", "password": "string" }`
  - Returns JWT token

### Tasks
- `POST /api/tasks` - Create task
  - Auth required
  - Body: `{ "title": "string", "description": "string", "dueDate": "ISO date", "assigneeId": "string" }`

- `GET /api/tasks` - Get all tasks
  - Auth required

- `PATCH /api/tasks/:id` - Update task
  - Auth required
  - Body: `{ "status": "string", "title": "string", ... }`

### Teams
- `POST /api/teams` - Create team
  - Auth required
  - Body: `{ "name": "string", "memberIds": ["string"] }`

- `GET /api/teams` - Get all teams
  - Auth required

- `POST /api/teams/:id/members` - Add member to team
  - Auth required
  - Body: `{ "userId": "string" }`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```
