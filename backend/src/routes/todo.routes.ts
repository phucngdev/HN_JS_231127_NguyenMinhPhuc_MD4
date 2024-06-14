import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTask,
  getOneTask,
  updateTask,
} from "../controllers/todo.controller";
import { validate } from "../validation/todo.vali";
const todoRoute = express.Router();

todoRoute.post("/", validate, createNewTask);
todoRoute.put("/:id", validate, updateTask);
todoRoute.delete("/:id", deleteTask);
todoRoute.get("/", getAllTask);
todoRoute.get("/:id", getOneTask);

export default todoRoute;
