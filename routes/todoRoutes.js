import express from "express";

import * as todoController from "../controllers/todoController.js";

export const router = express.Router();

router.get("/todos", todoController.getTodos);

router.post("/new-todo", todoController.postNewTodo);

router.put("/update-todo/:id", todoController.putUpdateTodoStatus);

// router.delete("/delete-todo/:id", todoController.deleteTodo);

router.delete("/delete-completed", todoController.deleteCompletedTodos);
