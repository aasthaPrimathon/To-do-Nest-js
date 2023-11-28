"use client"
import { getAllTodos } from "@/api"
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import { ITask } from "../types/tasks";
import { useEffect, useState } from "react";

export default function Home() {

  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllTodos();
      setAllTasks(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        {allTasks.length > 0 && <AddTask allTasks={allTasks} setAllTasks={setAllTasks}/>}
      </div>
      {allTasks.length > 0 && <TodoList tasks={allTasks}  setAllTasks={setAllTasks}/>}
    </main>
  )
}
