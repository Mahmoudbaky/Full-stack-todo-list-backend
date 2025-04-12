import bodyParser from "body-parser";
import path from "node:path";
import ConnectMongoDBSession from "connect-mongodb-session";
import { fileURLToPath } from "node:url";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import express from "express";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as todoRoutes } from "./routes/todoRoutes.js";
import dotenv from "dotenv";

dotenv.config();

// import flash from "connect-flash";
const DbPassword = process.env.DB_PASSWORD;
const DbUser = process.env.DB_USER;
const DbName = process.env.DB_NAME;

const app = express();
const port = 3001;
const connectionString = `mongodb+srv://${DbUser}:${DbPassword}@nodejs.srb9q.mongodb.net/${DbName}?retryWrites=true&w=majority&appName=NodeJS`;

const MongoDBSession = ConnectMongoDBSession(session);
const store = new MongoDBSession({
  uri: connectionString,
  collection: "sessions",
});
const corsOptions = {
  origin: [
    "https://full-stack-todo-list-frontend.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
};

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in

// Middleware
app.use((req, res, next) => {
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Add other methods as needed

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://full-stack-todo-list-frontend.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors(corsOptions));
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    // if i set the cookie it will overwrite the session
  })
);

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  next();
});

// Routes
app.use(authRoutes);
app.use(todoRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("API is running");
});

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then((result) => {
    app.listen(port);
    console.log(`http://localhost:${port}`);
  })
  .catch((err) => console.log(`the error is from app.js: ${err}`));
