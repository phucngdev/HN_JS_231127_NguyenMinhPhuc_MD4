import pool from "../config/connect";

type taskType = {
  id: string;
  task: string;
  status: boolean;
};

export const createNewTaskService = async (data: taskType) => {
  try {
    await pool.execute(
      "INSERT INTO todolist(id, task, status) VALUES (?,?,?)",
      [data.id, data.task, data.status]
    );
    return "Thêm thành công";
  } catch (error) {
    return "Lõi server";
  }
};

export const updateTaskService = async (id: string, data: taskType) => {
  try {
    await pool.execute(
      "UPDATE todolist SET status = ?, task = ? WHERE id = ?",
      [data.status, data.task, id]
    );
    return "Sửa thành công";
  } catch (error) {
    return "Lõi server";
  }
};

export const deleteTaskService = async (id: string) => {
  try {
    await pool.execute("DELETE FROM todolist WHERE id =?", [id]);
    return "Xóa thành công";
  } catch (error) {
    return "Lõi server";
  }
};

export const getAllTaskService = async () => {
  try {
    const [result] = await pool.execute("SELECT * FROM todolist");
    return result;
  } catch (error) {
    return "Lõi server";
  }
};

export const getOneTaskService = async (id: string) => {
  try {
    const [result] = await pool.execute("SELECT * FROM todolist WHERE id =?", [
      id,
    ]);
    return result;
  } catch (error) {
    return "Lõi server";
  }
};
