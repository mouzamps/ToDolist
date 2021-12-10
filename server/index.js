const express = require('express');
const app = express();
const cors = require('cors'); //used for the middle ware
const pool = require('./db');
 
app.use(cors());
app.use(express.json()); //req.body

//creating list
app.post("/todos",async(req, res) => {     //async- waits for the fn to complete b4 it continues
    try {
        const {description} =req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING * ", [description]);

        res.json(newTodo.rows[0]);
        

    } catch (err) {
        console.error(err.message);
    }
});

//Get the posted list
app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
      console.log(allTodos.rows)
    } catch (err) {
      console.error(err.message);
    }
  });
 

//get only a list
app.get("/todos/:id",async(req, res) => {
    try {
        const {id} =req.params;
        const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1  ",[id]);
        res.json(todos.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//udate a list
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} =req.body;
        const updateTodo = await pool.query("UPDATE todo SET description= $1 WHERE todo_id = $2",[description, id]);

        res.json("updated");
    } catch (error) {
        console.error(error.message);
    }
});

//delete a list
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);

        res.json("DELETED");
    } catch (error) {
        console.error(error.message);
    }
});




app.listen(5000, () => {
    console.log('listening on port 5000');
})