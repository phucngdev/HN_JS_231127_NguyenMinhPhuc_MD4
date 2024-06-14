import React, { useEffect, useState } from "react";
import ItemTodo from "./ItemTodo";
import BaseUrl from "../../api/axios";

type taskType = {
  id: string;
  task: string;
  status: boolean;
};

const ListTodo = () => {
  const [listTask, setListTask] = useState<taskType[]>([]); // danh sách task
  const [idUpdate, setIdUpdate] = useState<string>(""); // id task đang update
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // trạng thái đang update
  const [task, setTask] = useState<string>(""); // task input
  const [errTask, setErrTask] = useState<boolean>(false); // lỗi task rỗng
  const [err, setErr] = useState<string>(""); // lỗi khi api ko gọi được

  // lấy tất cả task
  const getTasks = async () => {
    try {
      const response = await BaseUrl.get("/task");
      setListTask(response.data);
    } catch (error) {
      setErr("Lỗi khi lấy tất cả task");
    }
  };

  // chạy useEffect 1 lần khi mou
  useEffect(() => {
    getTasks();
  }, []);

  // nhập task vào input
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTask(e.target.value);
    if (task) {
      setErrTask(false);
    }
  };

  // thêm mới task
  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      // ngăn chặn load lại trang
      e.preventDefault();
      if (task === "") {
        setErrTask(true);
        return;
      }
      // kiểm tra trạng thái update khi submit form
      if (isUpdate) {
        const updateTask: taskType = {
          id: idUpdate,
          task: task,
          status: false,
        };
        await BaseUrl.put(`/task/${idUpdate}`, updateTask);
        getTasks();
        setIdUpdate("");
        setIsUpdate(false);
      } else {
        // không update thì tạo mới
        const newTask: taskType = {
          id: Math.random().toString(),
          task: task,
          status: false,
        };
        // thêm task mới vào list
        await BaseUrl.post("/task", newTask);
        // gọi lại api khi them mới trhanhf công
        getTasks();
      }
      setTask(""); // set lại task thành rỗng
      setErr("");
      setErrTask(false);
    } catch (error) {
      setTask(""); // set lại task thành rỗng
      setErr("Lỗi khi thêm mới");
    }
  };

  // hàm lấy thông tin 1 task theo id
  const getTaskById = async (id: string) => {
    try {
      const response = await BaseUrl.get(`/task/${id}`);
      console.log(response.data);
    } catch (error) {
      setErr("Lỗi khi lấy task");
    }
  };

  // hàm xoá task theo id
  const deleteTask = async (id: string) => {
    try {
      await BaseUrl.delete(`/task/${id}`);
      // gọi lại api khi xoá thành công
      getTasks();
    } catch (error) {
      setErr("Lỗi khi xóa task");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10 p-10 bg-red-500 rounded-md shadow-xl text-white">
        <h3 className="text-3xl font-bold flex justify-start">TODO LIST</h3>
        <span className="text-xl flex justify-start">Todo list</span>
        <div className="flex flex-col gap-3 mt-5">
          {listTask.map((task: taskType) => (
            <ItemTodo
              key={task.id}
              task={task}
              setIdUpdate={setIdUpdate}
              setTask={setTask}
              setErr={setErr}
              setIsUpdate={setIsUpdate}
              deleteTask={deleteTask}
              getTasks={getTasks}
            />
          ))}
        </div>
        <div className="flex justify-start mb-2 text-xl mt-10">
          Add the todo list
        </div>
        <form
          className="flex items-center justify-between gap-5"
          onSubmit={addTask}
        >
          <input
            type="text"
            placeholder="Nhập tại đây"
            className="border border-black w-full p-2 text-black"
            value={task}
            onChange={handleChangeValue}
          />
          {isUpdate ? (
            <>
              <button
                type="submit"
                className="w-[200px] border border-white py-2"
              >
                Update
              </button>
              <button
                type="reset"
                onClick={() => {
                  setIdUpdate("");
                  setIsUpdate(false);
                  setTask("");
                }}
                className="w-[200px] border border-white py-2"
              >
                Huỷ
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="w-[200px] border border-white py-2"
            >
              Add
            </button>
          )}
        </form>
        {errTask && <div className="">Bạn cần nhập thông tin task</div>}
        {err && <div className="">{err}</div>}
      </div>
    </>
  );
};

export default ListTodo;
