import express from "express";

import * as todoController from "../controllers/todoController.js";

export const router = express.Router();

import { verifyToken } from "../Middleware/verifyToken.js";

router.get("/todos", todoController.getTodos);

router.post("/new-todo", verifyToken, todoController.postNewTodo);

router.put("/update-todo/:id", todoController.putUpdateTodoStatus);

router.delete("/delete-completed", todoController.deleteCompletedTodos);

// router.delete("/delete-todo/:id", todoController.deleteTodo);
