/* making a server */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { configDotenv } = require("dotenv");
const { User } = require("./model/User.js");

//process.env.MONGO_URL

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL); //promise
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
      try {
        const users = await User.find();
        return res.send({ user: users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });
    // post is CREATE in CRUD
    app.post("/user", async function (req, res) {
      try {
        // let { username, name } = req.body;
        // // this validation check is not required since the mongoose structured database already checks for these.
        // if (!username) {
        //   // send() sends to body of request
        //   return res.status(400).send({ error: "no username!" });
        // }
        // if (!name | !name.first | !name.last) {
        //   return res.status(400).send({ error: "no first and last name!" });
        // }
        const user = new User(req.body); // req.body is the json body from postman (so no need to await)
        await user.save(); // save() goes through mongo db so we must await promise. it saves the user in mongo db.
        // await user.save() <- user is from User schema from User.js since it has to go to db and save the user schema then come back, we use await promise.
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
// [a, b, ...rest] = [10, 11, 12, 14, 15];
// console.log(a + ", " + b);
// console.log("rest: " + rest);

// let num = {
//   c: 100,
//   d: 200,
// };

// console.log("num c: " + num.c);
// console.log("num d: " + num.d);

// let { c, d } = num;
// console.log("d: " + d);
// console.log("c: " + c);

// model in MVC pattern: we put database schemas in model

server();

const object = {
  fieldOne: "hi",
  fieldTwo: "hello",
};

const largeObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

//01
// console.log(object.fieldOne);
// console.log(object.fieldTwo);

//02
// const { fieldOne, fieldTwo } = object; // must be the EXACT same field name as those inside object tow work!!
// console.log(fieldOne);
// console.log(fieldTwo);

//03
// const { a, b } = largeObject;
const { c, e } = largeObject;
// console.log(c);
// console.log(e);

// npm i dotenv
