import React from 'react';
import { useDispatch } from 'react-redux';
import { completedTask, deleteTodo } from '../../redux-toolkit/features/users/userSlice';

function TaskItem({ task, email, taskId }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTodo({ email, taskId }));
    };

    const handleToggleComplete = () => {
        dispatch(completedTask({ email, taskId }));
    };

    return (
        <li className="task-item">
            <span className={`task-item-title ${task.completed ? 'completed' : ''} `}>{task.task}</span>
            <div className="task-buttons">
                <button
                    className="complete-button"
                    onClick={handleToggleComplete}
                >
                    {task.completed ? 'Uncomplete' : 'Complete'}
                </button>
                    <button
                        className="delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
            </div>
        </li>
    );
}

export default TaskItem;
