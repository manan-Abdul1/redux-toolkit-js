import React from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { v4 as uuidv4 } from 'uuid';
import { addToDo } from '../../redux-toolkit/features/todolist/todoSlice';

function TodoList() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.loggedInUser);
    const tasks = useSelector(state => state.todo.todoList).filter(taskItems => taskItems.userId === userId)
    const id = uuidv4();

    const handleAddTask = (newTask) => {
        const newTaskObj = { userId, taskId: id, description: newTask, completed: false };
        dispatch(addToDo(newTaskObj));
    };
    return (
        <>
            <div className="todolist-container">
                <h1>Todo List</h1>
                <AddTask onAddTask={handleAddTask} />
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TodoList;
