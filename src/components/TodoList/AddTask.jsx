import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
