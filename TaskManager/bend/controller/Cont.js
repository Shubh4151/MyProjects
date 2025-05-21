const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const um = require("../model/to_do");
const us = require("../model/regmodel");
const secretKey = "abcd";

let register = async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
    const user = new us({ ...req.body, pwd: hashedPwd });
    await user.save();
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error registering user" });
  }
};

let login = async (req, res) => {
  try {
    const user = await us.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.pwd, user.pwd)) {
      const token = jwt.sign({ email: user.email }, secretKey);
      res.json({ msg: "Login successful", token });
    } else {
      res.json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ err: "Error logging in" });
  }
};

let addTodo = async (req, res) => {
  try {
    const todo = new um(req.body);
    await todo.save();
    res.json({ msg: "Todo added" });
  } catch (err) {
    res.status(500).json({ err: "Error adding todo" });
  }
};

let getTodos = async (req, res) => {
  try {
    const todos = await um.find({ email: req.query.email });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ err: "Error fetching todos" });
  }
};

let updateTodo = async (req, res) => {
  try {
    await um.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Todo updated" });
  } catch (err) {
    res.status(500).json({ err: "Error updating todo" });
  }
};

let deleteTodo = async (req, res) => {
  try {
    await um.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ err: "Error deleting todo" });
  }
};

module.exports={register,login,addTodo,getTodos,updateTodo,deleteTodo} 