password = "Salang5252@chunsa";

/* making a server */
const express = require("express"); // looks for 'express' module (folder) inside the node_modules folder
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User.js"); // with or without .js
const users = [];
// encodeURIComponent to escape special characters in password
const MONGO_URL = `mongodb+srv://chloeyeo:${encodeURIComponent(
  password
)}@mongodb.shojwhr.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB`;

const server = async function () {
  try {
    await mongoose.connect(MONGO_URL); //promise
    console.log("db connected");
    app.get("/", function (req, res) {
      return res.send("Hello World !! changed");
    });
    app.get("/page1", function (req, res) {
      return res.send("This is my page one!");
    });
    app.use(express.json());
    app.get("/user", function (req, res) {
      return res.send({ user: users });
    });
    app.post("/user", function (req, res) {
      users.push({ name: req.body.name, age: req.body.age });
      return res.send({ success: true });
    });
    app.listen(3000);
    console.log("server connected on port 3000");
  } catch (error) {
    console.log(error);
  }
};

// model in MVC pattern: we put database schemas in model

server();
