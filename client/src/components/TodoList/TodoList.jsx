import React, { useEffect, useState } from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { fetchTasks, createNewTask } from '../../redux-toolkit/actions/todolist';

function TodoList() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.user.id);
    const tasks = useSelector(state => state.todo.todoList);

    useEffect(() => {
        dispatch(fetchTasks(userId));
    }, []);

    const handleAddTask = (newTask) => {
        const newTaskObj = { userId, description: newTask, completed: false };
        dispatch(createNewTask(newTaskObj))
    };

    return (
        <div className="todolist-container">
            <h1>Todo List</h1>
            <AddTask onAddTask={handleAddTask} />
            <ul className="task-list">
                {tasks?.map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
