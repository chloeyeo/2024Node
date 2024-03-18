password = "Salang5252@chunsa";

/* making a server */
const express = require("express"); // looks for 'express' module (folder) inside the node_modules folder
const app = express();
const mongoose = require("mongoose");
const { User } = require("./model/User.js"); // with or without .js
// const users = [];
// encodeURIComponent to escape special characters in password
const MONGO_URL = `mongodb+srv://chloeyeo:${encodeURIComponent(
  password
)}@mongodb.shojwhr.mongodb.net/book?retryWrites=true&w=majority&appName=MongoDB`;
// mongodb.net/book creates a collection named book

const server = async function () {
  try {
    await mongoose.connect(MONGO_URL); //promise
    // must connect to db first before server starts
    // since we're getting stuff from db to put/show on server.
    console.log("db connected");
    app.get("/", function (req, res) {
      return res.send("Hello World !! changed");
    });
    app.get("/page1", function (req, res) {
      return res.send("This is my page one!");
    });
    app.use(express.json());

    // get is READ in CRUD
    app.get("/user", async function (req, res) {
      //01
      // return res.send({ user: users });

      //02
      try {
        const users = await User.find();
        return res.send({ user: users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });
    // post is CREATE in CRUD
    app.post("/user", async function (req, res) {
      // 01
      // users.push({ name: req.body.name, age: req.body.age });
      // return res.send({ success: true });
      //02
      // let username = req.body.username;
      try {
        let { username, name } = req.body;
        if (!username) {
          // send() sends to body of request
          return res.status(400).send({ error: "no username!" });
        }
        if (!name | !name.first | !name.last) {
          return res.status(400).send({ error: "no first and last name!" });
        }
        const user = new User(req.body); // req.body is the json body from postman (so no need to await)
        await user.save(); // save() goes through mongo db so we must await promise. it saves the user in mongo db.
        res.send(user);
      } catch (error) {
        // 500 is server side(i.e. backend) error, e.g. if change const user to const user1 it will give 500 error since our code is the backend = server side.
        return res.status(500).send({ error: error.message });
      }
    });

    // put is UPDATE in CRUD
    // del is DELETE in CRUD
    app.listen(3000);
    console.log("server connected on port 3000");
  } catch (error) {
    console.log(error);
  }
};

// destructuring
[a, b, ...rest] = [10, 11, 12, 14, 15];
console.log(a + ", " + b);
console.log("rest: " + rest);

let num = {
  c: 100,
  d: 200,
};

console.log("num c: " + num.c);
console.log("num d: " + num.d);

let { c, d } = num;
console.log("d: " + d);
console.log("c: " + c);

// model in MVC pattern: we put database schemas in model

server();
