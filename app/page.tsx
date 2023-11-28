"use client"
import { getAllTodos } from "@/api"
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import { ITask } from "../types/tasks";
import { useEffect, useState } from "react";
// import Todo from "./components/Todo";

export default function Home() {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  useEffect(() => {
    fetchAllTodos();
  }, [])

  const fetchAllTodos = async () => {
    await getAllTodos().then((res) => {
      setAllTasks(res);
    }).catch((err) => {
      console.error(err);
    });
  }
  console.log(allTasks);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask allTasks={allTasks} setAllTasks={setAllTasks}/>
      </div>
      <TodoList tasks={allTasks}  setAllTasks={setAllTasks}/>
</main>
  )
}
