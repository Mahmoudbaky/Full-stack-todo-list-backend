# Full Stack Todo List Application

A comprehensive todo list application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js).

![image](https://github.com/user-attachments/assets/36b7e0be-6310-4537-bc80-14a34bdba83b)

## Features

- ✅ Create, read, update, and delete todo items
- ✅ Mark todos as completed
- ✅ Clear completed todos
- ✅ User authentication and personal todo lists
- ✅ Responsive design for both desktop and mobile devices
- ✅ Clean and intuitive user interface with a music-themed background

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind with daisy ui for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Setup Instructions

1. Clone the backend repository
```bash
git clone https://github.com/Mahmoudbaky/Full-stack-todo-list-backend.git
cd Full-stack-todo-list-backend
```

1. Clone the frontend repository
```bash
git clone https://github.com/Mahmoudbaky/Full-stack-todo-list-frontend.git
cd Full-stack-todo-list-frontend
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd Full-stack-todo-list-backend
npm install

# Install frontend dependencies
cd Full-stack-todo-list-frontend
npm install
```

3. Environment variables setup
   
   Create a `.env` file in the backend directory with the following variables:
```
JWT_SECRET=your_jwt_secret
DB_PASSWORD = your_mongodb_account_password
DB_USER = your_mongodb_username
DB_NAME= your_mongodb_db_name
```

4. Start the development servers

```bash
# Start the backend server
cd backend
nodemon ./app.js

# In a new terminal, start the frontend server
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
full-stack-todo-list/
├── backend/             # Node.js and Express backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── app.js        # Entry point for backend
├── frontend/            # React frontend
│   ├── public/          # Static files
│   └── src/             # React source files
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── assets/      # picuters and stuuf like that
│       ├── utils/       # Utility functions
│       └── App.js       # Main component
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/signup`- Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### Todos
- `GET /api/todos` - Get all todos for the logged in user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos/completed` - Clear all completed todos

## Deployment

### Backend
The backend can be deployed to services like Heroku, Render, Vercel or any Node.js hosting service.

### Frontend
The frontend can be deployed to services like Vercel, Netlify, or GitHub Pages.

### Database
MongoDB Atlas is recommended for database hosting in production.

## Future Enhancements

- Add categories/tags for todos
- Add due dates and reminders
- Implement drag-and-drop functionality for reordering todos
- Add dark/light theme toggle
- Implement social login options

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
