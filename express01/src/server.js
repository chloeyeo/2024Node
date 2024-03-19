/* making a server */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // require dotenv package
dotenv.config(); // configure dotenv package
const { User } = require("./model/User.js");

/*
DotEnv is a lightweight npm package that automatically loads environment variables from a .env file into the process.env object.

To use DotEnv, first install it using the command: npm i dotenv. Then in your app, require and configure the package like this: require('dotenv').config().
*/

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

    app.get("/user", async function (req, res) {
      try {
        const users = await User.find();
        return res.send({ user: users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.post("/user", async function (req, res) {
      try {
        //validation check
        // this validation check is not required since the mongoose structured database already checks for these.
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
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.delete("/user/:userId", async function (req, res) {
      //:userId is in req.params
      // when sending del request in postman write /user/<userId> without the : colon.
      try {
        // let userId = req.params.userId;
        let { userId } = req.params;

        // Validation check
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "no user id!" });
        }

        const user = await User.findByIdAndDelete({ _id: userId }); // user.methods goes to the db and comes back so we need to await the promise.
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    // app.put("", ()=>{});
    // CRUD UPDATE
    app.put("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        let { age, email } = req.body;

        // Validation check
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: "no user id!" });
        }

        const user = await User.findByIdAndUpdate(
          userId,
          {
            $set: { age, email },
          },
          { new: true } // update returned user immediately on postman
        );
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000);
    console.log("server connected on port 3000");
  } catch (error) {
    console.log(error);
  }
};

server();
