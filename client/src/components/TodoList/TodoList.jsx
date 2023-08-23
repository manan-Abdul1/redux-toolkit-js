import React, { useEffect, useState } from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks, createNewTask } from '../../redux-toolkit/actions/todolist';
import Loader from "../Loader/Loader"

function TodoList() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.user.id);
    const tasks = useSelector(state => state.todo.todoList);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        dispatch(fetchTasks(userId, setLoading))
    }, []);

    const handleAddTask = (newTask) => {
        const newTaskObj = { userId, description: newTask, completed: false };
        dispatch(createNewTask(newTaskObj))
    };

    return (
        <div className="todolist-container">
            <h1>Todo List</h1>
            <AddTask onAddTask={handleAddTask} />
            {loading  && tasks?.length > 0 ? (
                <Loader/>
            ) : (
                <ul className="task-list">
                    {tasks?.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;
