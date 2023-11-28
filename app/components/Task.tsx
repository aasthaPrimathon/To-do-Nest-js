"use client"
import { ITask } from "@/types/tasks"
import Modal from "./Modal";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";


interface TaskProps {
    task: ITask;
    setAllTasks: (value: ITask[]) => void;
}

const Task = (props: TaskProps) => {
  const {task, setAllTasks} =  props;

  const inputEditRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setopenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await editTodo({
        id: task.id,
        text: taskToEdit,
      });

      const { id, text } = res || {};

      setAllTasks((prevTaskList) => {
        const updatedData = prevTaskList.map((ele) => {
          if (ele.id === id) {
            ele.text = text;
          }
          return ele;
        })
        return updatedData;
      });
    }
    catch(err) {
      console.error(err);
    } 

    setOpenModalEdit(false);
  }

  const handleDeleteTask = (id: string) => async () => {
    try {
      await deleteTodo(id);
      setAllTasks((prevTasks: ITask[]) => {const deletedArr = prevTasks.filter((task) => {return task.id !== id}); return deletedArr});
    }
    catch(err) {
      console.error(err);
    }
    
    setopenModalDeleted(false);
  }

  const openEditModelHandler = () => {
    setOpenModalEdit(true);
    inputEditRef.current?.focus();
  }

  const openDeleteModelHandler = () => {
    setopenModalDeleted(true);
  }

  const editTaskHandler = (e) => {
    setTaskToEdit(e.target.value);
  }

  return (
        <tr key={task.id}>
          <td>{task.text}</td>
          <td className="flex gap-5">
          <FaEdit onClick={openEditModelHandler} cursor='pointer' className='text-blue-500' size={22}/>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
            <input ref={inputEditRef} value={taskToEdit} onChange={editTaskHandler} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
          <FaRegTrashAlt onClick={openDeleteModelHandler} cursor='pointer' className='text-red-500' size={22}/>
            <Modal modalOpen={openModalDeleted} setModalOpen={setopenModalDeleted}>
              <h3 className="text-lg">Are you sure you want to delete this task?</h3>
              <div className="modal-action justify-center">
                <button onClick={handleDeleteTask(task.id)} className="btn">Yes</button>
              </div>
            </Modal>
          </td>
        </tr>
  )
}

export default Task;
