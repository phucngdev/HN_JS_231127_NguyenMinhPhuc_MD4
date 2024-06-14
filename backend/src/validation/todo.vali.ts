import { Request, Response, NextFunction } from "express";

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, task } = req.body;
    if (!status || !task) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    next();
  } catch (error) {
    return "Lỗi server";
  }
};
