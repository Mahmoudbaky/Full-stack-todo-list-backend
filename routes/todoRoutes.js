import express from "express";

import * as todoController from "../controllers/todoController.js";

export const router = express.Router();

import { verifyToken } from "../Middleware/verifyToken.js";

router.get("/todos", verifyToken, todoController.getTodos);

router.post("/new-todo", verifyToken, todoController.postNewTodo);

router.put("/update-todo/:id", verifyToken, todoController.putUpdateTodoStatus);

router.put("/update", verifyToken, todoController.putUpdateTodo);

router.post("/delete-todo/:id", verifyToken, todoController.deleteTodo);

router.delete(
  "/delete-completed",
  verifyToken,
  todoController.deleteCompletedTodos
);

// router.delete("/delete-todo/:id", todoController.deleteTodo);
