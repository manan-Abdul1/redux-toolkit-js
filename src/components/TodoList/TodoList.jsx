import React from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo } from '../../redux-toolkit/features/users/userSlice';
import TaskItem from './TaskItem';
import { v4 as uuidv4 } from 'uuid'; 

function TodoList() {
    const dispatch = useDispatch();
    const signedEmail = useSelector(state => state.users.SignedInCredentials.email);
    const tasks = useSelector(state => state.users.usersData.find(user => user.email === signedEmail).todos);
    console.log(tasks)
    // const id = uuidv4();

    const handleAddTask = (newTask) => {
        const newTaskObj = { id: tasks.length, task: newTask, completed: false }; 
        const updatedTodos = [...tasks, newTaskObj]; 
        dispatch(addToDo({ email: signedEmail, todos: updatedTodos }));
    };
    return (
        <>
            <div className="todolist-container">
                <h1>Todo List</h1>
                <AddTask onAddTask={handleAddTask} />
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <TaskItem key={index} email={signedEmail} task={task} taskId={index} />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TodoList;
