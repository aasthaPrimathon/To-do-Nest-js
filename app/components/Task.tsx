"use client"

import { ITask } from "@/types/tasks"
import Modal from "./Modal";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setopenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setopenModalDeleted(false);
    router.refresh();
  }

  return (
        <tr key={task.id}>
          <td>{task.text}</td>
          <td className="flex gap-5">
          <FaEdit onClick={() => setOpenModalEdit(true)} cursor='pointer' className='text-blue-500' size={22}/>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
          <FaRegTrashAlt onClick={() => setopenModalDeleted(true)} cursor='pointer' className='text-red-500' size={22}/>
            <Modal modalOpen={openModalDeleted} setModalOpen={setopenModalDeleted}>
              <h3 className="text-lg">Are you sure you want to delete this task?</h3>
              <div className="modal-action justify-center">
                <button onClick={() => handleDeleteTask(task.id)} className="btn">Yes</button>
              </div>
            </Modal>
          </td>
        </tr>
  )
}

export default Task