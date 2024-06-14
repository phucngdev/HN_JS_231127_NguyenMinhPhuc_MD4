import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import BaseUrl from "../../api/axios";

type taskType = {
  id: string;
  task: string;
  status: boolean;
};

type taskProps = {
  task: taskType;
  setIdUpdate: (id: string) => void;
  setTask: (task: string) => void;
  setIsUpdate: (status: boolean) => void;
  deleteTask: (id: string) => void;
  setErr: (err: string) => void;
  getTasks: () => void;
};

const ItemTodo = (props: taskProps) => {
  // hàm update status task
  const handleChange = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const updateTask: taskType = {
        id: id,
        task: props.task.task,
        status: e.target.checked,
      };
      await BaseUrl.put(`/task/${id}`, updateTask);
      // sau khi upadte gọi lại api
      props.getTasks();
    } catch (error) {
      props.setErr("Lỗi khi update task");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between shadow-xl py-3 bg-red-400 hover:bg-red-300 cursor-pointer px-2">
        <span>{props.task.task}</span>
        <div className="flex items-center gap-5">
          <input
            type="checkbox"
            checked={props.task.status}
            onChange={(e) => handleChange(props.task.id, e)}
          />
          <button
            onClick={() => {
              props.setIdUpdate(props.task.id);
              props.setTask(props.task.task);
              props.setIsUpdate(true);
            }}
          >
            <EditOutlined className="text-white" />
          </button>
          <button onClick={() => props.deleteTask(props.task.id)}>
            <DeleteOutlined className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemTodo;
