password = "Salang5252@chunsa";

/* making a server */
const express = require("express"); // looks for 'express' module (folder) inside the node_modules folder
const app = express();
const mongoose = require("mongoose");
const users = [];
// encodeURIComponent to escape special characters in password
const MONGO_URL = `mongodb+srv://chloeyeo:${encodeURIComponent(
  password
)}@mongodb.shojwhr.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB`;

// npm i mongoose
// mongoose.connect(url) is a promise

/*async function fn(){}
const fn = async function(){}. this is SAME AS the above*/

// async WILL return a promise and only deals with resolve()
// 1. first run server 2. then run database
const server = async function () {
  await mongoose.connect(MONGO_URL);
  console.log("db connected");
  app.get("/", function (req, res) {
    // this function is 'middleware'
    //req is http request, res is http response
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
    // req(request), res(response), next are fixed parameters for middleware
    //console.log(req.body);
    //req.body is the body header in post request in postman
    // users here is the const users = [] declared above.
    users.push({ name: req.body.name, age: req.body.age });
    return res.send({ success: true });
  });
  app.listen(3000);
};

server();
