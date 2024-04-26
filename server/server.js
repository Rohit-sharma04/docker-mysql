// server.js
import express from 'express'
import mysql from 'mysql2/promise';
import cors from 'cors'

const app = express();
const port = 5000;

// Create a MySQL connection
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'mysql',
    user: process.env.DATABASE_USER||'root',
    password: process.env.MYSQL_ROOT_PASSWORD||'Admin12345',
    database: process.env.MYSQL_DATABASE||'todo_list',
   
});


// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());

// Routes
// Get all todos
app.get('/api/todo', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todos');
        console.log(todos[0])
        res.json({ success: true, todos: todos[0] });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.json({ success: false, message: 'Error fetching todos' });
    }
});

// Add a todo 
app.post('/api/todo', async (req, res) => {
    const { task } = req.body;
    try {
        await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
        res.json({ success: true, message: 'Task added successfully' });
    } catch (error) {
        console.error('Error adding task:', error);
        res.json({ success: false, message: 'Error adding task' });
    }
});

// Delete a todo
app.delete('/api/todo/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await pool.query('DELETE FROM todos WHERE id = ?', [id]);
        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.json({ success: false, message: 'Error deleting task' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
