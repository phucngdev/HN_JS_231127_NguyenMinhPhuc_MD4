import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTask,
  getOneTask,
  updateTask,
} from "../controllers/todo.controller";
const todoRoute = express.Router();

todoRoute.post("/", createNewTask);
todoRoute.put("/:id", updateTask);
todoRoute.delete("/:id", deleteTask);
todoRoute.get("/", getAllTask);
todoRoute.get("/:id", getOneTask);

export default todoRoute;
