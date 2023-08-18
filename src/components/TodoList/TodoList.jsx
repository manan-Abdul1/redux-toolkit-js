import React, { useEffect, useState } from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { v4 as uuidv4 } from 'uuid';
import { createNewTask, fetchTasks } from '../../redux-toolkit/features/todolist/todoSlice';
import Loader from '../Loader/Loader';
// import { addToDo } from '../../redux-toolkit/features/todolist/todoSlice';

function TodoList() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.users.loggedInUser);
    const id = uuidv4();
    const loading = useSelector(state => state.todo.loading)
    const tasks = useSelector(state => state.todo.todoList)?.filter(taskItems=>taskItems.userId===userId);

    // const fetchAndSetTasks = async () => {
    //     try {
    //         const response = await dispatch(fetchTasks(userId));
    //         console.log(response,'response')
    //         // setTasks(response.payload);
    //     } catch (error) {
    //         console.error('Error fetching tasks:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchAndSetTasks();
    // }, []);

    console.log(tasks, 'tasks')
    
    const handleAddTask = (newTask) => {
        const newTaskObj = { userId, taskId: id, description: newTask, completed: false };
        dispatch(createNewTask(newTaskObj))
        // dispatch(addToDo(newTaskObj));
    };
    return (
        <>
            <div className="todolist-container">
                <h1>Todo List</h1>
                <AddTask onAddTask={handleAddTask} />
                <ul className="task-list">
                    {loading && tasks?.length > 0 ? (
                        <Loader />
                    ) : (
                        tasks?.map((task, index) => (
                            <TaskItem key={index} task={task} />
                        ))
                    )}
                </ul>
            </div>
        </>
    );
}

export default TodoList;
