import React from 'react';
import './TodoList.css';
import AddTask from './AddTask';
import { useDispatch, useSelector } from 'react-redux';
// import { addToDo } from '../../redux-toolkit/features/users/userSlice';
import TaskItem from './TaskItem';
import { v4 as uuidv4 } from 'uuid'; 
import { addToDo } from '../../redux-toolkit/features/todolist/todoSlice';

function TodoList() {
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.users.loggedInUser);
    const tasks = useSelector(state=>state.todo.todoList).filter(taskItems=>taskItems.userId === userId)
    console.log(tasks,'daad')
    const id = uuidv4();
    // console.log(userId)

    const handleAddTask = (newTask) => {
        const newTaskObj = { userId, taskId: id, description: newTask, completed: false };
        dispatch(addToDo(newTaskObj));
        // const newTaskObj = { userId, taskId: id, description: newTask, completed: false }; 
        // const updatedTodos = [...tasks, newTaskObj]; 
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
