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
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory the file is in

// Middleware
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Match your frontend's port
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Add other methods as needed
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
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

// Routes
app.use(authRoutes);
app.use(todoRoutes);

// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then((result) => {
    app.listen(port);
    console.log(`http://localhost:${port}`);
  })
  .catch((err) => console.log(`the error is from app.js: ${err}`));
