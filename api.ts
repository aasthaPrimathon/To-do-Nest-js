import { ITask } from "./types/tasks";

const API_BASE_URL = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {cache: 'no-store'});
    const todos = await res.json();
    return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${API_BASE_URL}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
    })
}