import React, { useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const updatedTasks = [...tasks, { id: Date.now(), text: newTask, column: 'todo' }];
    setTasks(updatedTasks);
    setNewTask('');
  };

  const handleMoveTask = (taskId, newColumn) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, column: newColumn } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="kanban-board">
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="columns">
        <div className="column">
          <h2>Todo</h2>
          {tasks.map((task) =>
            task.column === 'todo' && (
              <div key={task.id} className="task">
                {task.text}
                <button onClick={() => handleMoveTask(task.id, 'in-progress')}>Move to In Progress</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            )
          )}
        </div>
        <div className="column">
          <h2>In Progress</h2>
          {tasks.map((task) =>
            task.column === 'in-progress' && (
              <div key={task.id} className="task">
                {task.text}
                <button onClick={() => handleMoveTask(task.id, 'done')}>Move to Done</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            )
          )}
        </div>
        <div className="column">
          <h2>Done</h2>
          {tasks.map((task) =>
            task.column === 'done' && (
              <div key={task.id} className="task">
                {task.text}
                <button onClick={() => handleMoveTask(task.id, 'in-progress')}>Move to In Progress</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;