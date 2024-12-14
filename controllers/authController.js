import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

// Register
export const postSignUp = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const rePassword = req.body.repassword;

    const findUser = await User.findOne({ username: username });
    if (findUser) {
      res.status(201).json({ message: "user already exist", userExist: true });
    } else {
      if (password === rePassword) {
        // const hasedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          username: username,
          password: password,
          todoList: [],
        });
        await user.save(); // save operation must be await
        res.status(200).json({ message: "user created" }); // must add .json or .send to prevent the "keep loading screen"
      } else {
        res
          .status(201)
          .json({ message: "Passwords do not match", passwordConfirm: true });
      }
    }
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: err.message });
  }
};

//Login
export const postLogIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(201)
        .json({ message: "Invalid credentials 1", userExist: true });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(201)
        .json({ message: "Invalid credentials 2", passwordMatch: true });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "1d" }
    );

    // Create session
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.isLoggedIn = true;

    // console.log("Session:", req.session.username);
    // console.log("Session:", req.session.userId);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Logout
export const logOut = async (req, res, next) => {
  return res.status(200).json({ message: "Logout successful" });
};
