import { ITask } from "@/types/tasks"
import React from "react"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[];
  setAllTasks: (value: ITask[]) => void;
}

const TodoList = (props: TodoListProps) => {
  const {tasks, setAllTasks} = props;
  const isTodoExist = tasks.length > 0;
  console.log("🚀 ~ file: TodoList.tsx:13 ~ TodoList ~ isTodoExist:", isTodoExist);

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Tasks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {isTodoExist && tasks.map((task) => (
        <Task key={task.id} task={task} setAllTasks={setAllTasks}/>
      ))}
    </tbody>
  </table>
</div>
  )
}

export default TodoList;
