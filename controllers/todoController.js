import User from "../models/user.js";
import Todo from "../models/todo.js";

export const getTodos = async (req, res, next) => {
  try {
    const userId = req.session?.userId;
    const isLoggedIn = req.session?.isLoggedIn;

    console.log(req.session);
    if (!isLoggedIn) {
      return res.status(401).json({ message: "User not authenticated" });
    } else {
      const userTasks = await Todo.find({
        userId: userId,
      });

      console.log(userTasks);

      return res.status(200).json(userTasks);
    }
  } catch (err) {
    return res.status(400).json({ message: "here in catch" });
  }
};

export const postNewTodo = async (req, res, next) => {
  try {
    // const userId = req.session?.userId;
    const username = req.session?.username;
    const isLoggedIn = req.session?.isLoggedIn;

    const { userId, task } = req.body;

    if (!isLoggedIn) {
      return res.status(401).json({ message: "User not authenticated" });
    } else {
      const user = await User.findOne({
        username: username,
      });

      // console.log(req.body.id);
      // console.log(req.body.text);

      const newTodo = new Todo({
        userId: req.userId,
        text: task,
        completed: false,
      });

      newTodo.save();

      user.todoList.push(newTodo);
      user.save();
      return res.status(200).json({ message: "Task created" });
    }
  } catch (err) {
    return res.status(400).json({ message: "here in catch" });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const isLoggedIn = req.session?.isLoggedIn;

    if (!isLoggedIn) {
      return res.status(401).json({ message: "User not authenticated" });
    } else {
      const todoId = req.params.id;

      await Todo.findByIdAndDelete(todoId);
      return res.status(200).json({ message: "Task deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "here in catch delete" });
  }
};

export const putUpdateTodoStatus = async (req, res, next) => {
  try {
    const isLoggedIn = req.session?.isLoggedIn;

    if (!isLoggedIn) {
      return res.status(401).json({ message: "User not authenticated" });
    } else {
      const todoId = req.params.id;
      const todo = await Todo.findOne({ _id: todoId });
      todo.completed = !todo.completed;
      todo.save();
      return res.status(200).json({ message: "Task status updated" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "here in catch" });
  }
};

export const deleteCompletedTodos = async (req, res, next) => {
  try {
    const isLoggedIn = req.session?.isLoggedIn;

    const completedTodos = await Todo.find({ completed: true });
    const completedTodoIds = completedTodos.map((todo) => todo._id);

    if (!isLoggedIn) {
      return res.status(401).json({ message: "User not authenticated" });
    } else {
      await Todo.deleteMany({ _id: { $in: completedTodoIds } });

      // Step 2: Update all users to remove the deleted todo IDs
      await User.updateMany(
        { todoList: { $in: completedTodoIds } }, // Find users with these todo IDs
        { $pull: { todoList: { $in: completedTodoIds } } } // Remove these IDs
      );

      return res.status(200).json({ message: "Completed tasks deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "here in catch" });
  }
};
