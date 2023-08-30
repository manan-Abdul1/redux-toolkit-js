import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask, editTask } from '../../redux-toolkit/actions/todolist';

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false)
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleDelete = () => {
        setLoading(true);
        dispatch(deleteTask(task._id, setLoading))
    };

    const handleToggleComplete = () => {
        setLoading(true);
        dispatch(completeTask(task._id, setLoading))
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditSave = () => {
        setLoading(true);
        dispatch(editTask({ taskId: task._id, description: editedDescription }, setLoading))
        setIsEditing(false)
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditedDescription(task.description);
    };

    return (
        <li className="task-item">
            {isEditing ? (
                <>
                    <input
                        className='editing-input'
                        type="text"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div>
                        <button className="save-button" disabled={loading} onClick={handleEditSave}><i className="fa-solid fa-floppy-disk"></i></button>
                        <button className="cancel-button" onClick={handleEditCancel}><i className="fa-solid fa-ban"></i></button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <button className="complete-button" disabled={loading} onClick={handleToggleComplete}>
                            {task.completed ? (<i className="fa-solid fa-xmark"></i>) : (<i className="fa-solid fa-check"></i>)}
                        </button>
                        <span className={`task-item-title ${task.completed ? 'completed' : ''} `}>
                            {task.description}
                        </span>
                    </div>
                    <div className="task-buttons">
                        <button className="edit-button" onClick={handleEditClick}><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className="delete-button" disabled={loading} onClick={handleDelete}><i className="fa-solid fa-trash"></i></button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TaskItem;
