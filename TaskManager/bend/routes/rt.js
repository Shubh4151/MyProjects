const express = require("express");
const { register, login, addTodo, getTodos, updateTodo, deleteTodo} = require("../controller/Cont");

let rt = express.Router();

rt.post("/register", register);
rt.post("/login", login);
rt.post("/todo", addTodo);
rt.get("/todos", getTodos);
rt.put("/todo/:id", updateTodo);
rt.delete("/todo/:id", deleteTodo);

module.exports = rt;
