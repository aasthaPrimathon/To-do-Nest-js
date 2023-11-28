import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import React, { FormEventHandler, useState,  useEffect, useRef  } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { ITask } from "@/types/tasks";

interface AddTaskProps {
  allTasks: ITask[];
  setAllTasks: (value: ITask[]) => void;
}

const AddTask = (props: AddTaskProps) => {

  const inputAddRef = useRef<HTMLInputElement>(null);

  const {allTasks, setAllTasks} = props;

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const addTaskHandler = () => {
    setIsModalOpen(true);
    inputAddRef.current?.focus();
  }
  
  const handleSubmitNewtodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    }).then((res) => {
      setAllTasks((prevTasks: ITask[]) => [...prevTasks, res]);
    }).catch((err) => {
      console.error(err);
    });
    setNewTaskValue('');
    setIsModalOpen(false);
  }

  return (
    <div>
        <button onClick={addTaskHandler} className='btn btn-primary w-full'>Add new task <FaPlus className='ml-2' size={18}/></button>
        <Modal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
          <form onSubmit={handleSubmitNewtodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action">
            <input ref={inputAddRef} value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask
