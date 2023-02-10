import express from "express";
import cors from "cors";

import pool from "./db.cjs";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/", async (req, res) => {
  const todos = await pool.query("SELECT * FROM todo");

  res.json(todos.rows);
});

app.get("/:id", async (req, res) => {
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
    req.params.id,
  ]);

  res.json(todo.rows[0]);
});

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING  *",
      [description, id]
    );

    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedTodo = await pool.query(
    "DELETE FROM todo WHERE todo_id = $1 returning *",
    [id]
  );

  res.json("Todo was deleted");
});

app.listen(5000, () => {
  console.log("the server is running pn port 5000");
});
