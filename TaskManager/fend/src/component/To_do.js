import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToDo = () => {
  const email = localStorage.getItem("email");
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get(`http://localhost:5000/todos?email=${email}`);
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!task.trim()) {
      alert("Task cannot be empty.");
      return;
    }
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/todo/${editId}`, { task });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/todo", { email, task });
      }
      setTask('');
      fetchTodos();
    } catch (err) {
      alert("Error while saving task.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todo/${id}`);
    fetchTodos();
  };

  const handleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/todo/${id}`, { completed: !completed });
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTask(todo.task);
    setEditId(todo._id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-wrapper">
  <div className="todo-input-card">
    <h1>My To-Do App</h1>
    <div className="todo-input">
    <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" />
    <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
    </div>
  </div>
  <div className="todo-section">
      <h3>Pending Tasks</h3>
      <div className="task-list">
      {todos.filter(t => !t.completed).map(todo => (
        <div className="task-item" key={todo._id}>
          {todo.task}
        
          <button onClick={() => handleEdit(todo)}>Edit</button>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
          <button onClick={() => handleComplete(todo._id, todo.completed)}>Complete</button>
        </div>
      ))}
      </div>
      </div>
      <div className="todo-section">
      <h3>Completed Tasks</h3>
      <div className="task-list">
      {todos.filter(t => t.completed).map(todo => (
        <div key={todo._id}>{todo.task} 
        <button onClick={() => handleDelete(todo._id)}>Delete</button></div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default ToDo;