
import  { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todo');
      if (response.data.success) {
        console.log(response.data.todos)
        setTodos(response.data.todos);
      } else {
        console.log('Error fetching todos:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/api/todo', { task });
        if (response.data.success) {
          fetchTodos();
        } else {
          console.log('Error adding task:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/todo/${id}`);
      if (response.data.success) {
        fetchTodos()
      } else {
        console.log('Error deleting task:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button className="delete" onClick={() => handleDeleteTask(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
