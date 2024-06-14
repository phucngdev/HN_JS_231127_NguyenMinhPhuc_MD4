import { Request, Response } from "express";
import {
  createNewTaskService,
  deleteTaskService,
  getAllTaskService,
  getOneTaskService,
  updateTaskService,
} from "../services/auth.service";

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const result = await createNewTaskService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("Lỗi server");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const result = await updateTaskService(req.params.id, req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("Lỗi server");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await deleteTaskService(req.params.id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("Lỗi server");
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const result = await getAllTaskService();
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("Lỗi server");
  }
};

export const getOneTask = async (req: Request, res: Response) => {
  try {
    const result = await getOneTaskService(req.params.id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json("Lỗi server");
  }
};
