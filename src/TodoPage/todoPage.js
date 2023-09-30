import React, { useState, useEffect } from 'react';
import { database } from './todoFire';
import { ref, push, onValue , remove , set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function TodoApp(props) {
  const email = props.email;
  const username = email.split('@')[0];
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState([]);

  const ValesInDB = ref(database, username);
  // const [hashes, sethash] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      onValue(ValesInDB, (snapshot) => {
        const itemsArray = Object.values(snapshot.val() || {});
        setTasks([...itemsArray]);
        setStatus([...Array(itemsArray.length).fill(false)]);
      });
    };
    fetchData();
  });

  const addTask = () => {
    if (newTask.trim() !== '') {
      push(ValesInDB, newTask);
      setStatus([...status, false]);
    }
  };

  const deleteTask = (indexToDelete) => {
    remove(ValesInDB,tasks)
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    const updatedStatus = status.filter((_, index) => index !== indexToDelete);
  
    set(ValesInDB , updatedTasks)
    setTasks(updatedTasks);
    setStatus(updatedStatus);
  };

  const toggleTaskStatus = (index) => {
    const updatedStatus = [...status];
    updatedStatus[index] = !updatedStatus[index];
    setStatus(updatedStatus);
  };

  
  const checkboxStyle = {
    marginRight: '10px', 
    width: '20px', 
    height: '20px', 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">Todo App</h4>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  id="taskbox"
                  placeholder="Enter Task Here"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button
                    onClick={addTask}
                    className="btn btn-primary"
                    type="button"
                  >
                    Add Task
                  </button>
                </div>
              </div>
              {tasks.map((task, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div className="flex-grow-1">
                    <label
                      htmlFor={`task-${index}`}
                      style={{
                        textDecoration: status[index] ? 'line-through' : 'none',
                      }}
                    >
                      {task}
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id={`task-${index}`}
                      onChange={() => toggleTaskStatus(index)}
                      style={checkboxStyle} // Apply custom checkbox styles
                    />
                    <button
                      onClick={() => deleteTask(index)}
                      className="btn btn-danger btn-sm ml-2"
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}