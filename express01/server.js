/* we can download node_modules anywhere 
we should NOT push node_modules to github since
it's not necessary since we can re-download it anywhere
AND node_module takes up so much space
SO we will create a .gitignore file
and inside .gitignore file we will put
node_modules/
this means when we do git push it will NOT push node_modules folder and all files inside it
e.g. if we put inside .gitignore file
text.html
then text.html won't get pushed to git when we do git push 

after we git push
in another computer, again we git clone then cd into 2024node folder
(just after git clone since we didn't push node_modules by putting it in .gitignore file,
the clones repository will have js files and package.json but NO node_modules,
yet)
then just re-install node_modules by typing in the cmd
npm i or npm install
then it will automatically install node_modules folder!!***
after npm install we can then run
npm dev or npm run dev */

/*
node js
git init
npm i express
npm i -D nodemon
*/

console.log("hello express");

/* making a server */
const express = require("express"); // looks for 'express' module (folder) inside the node_modules folder
const app = express();

// to route /, we will send the result of this function
app.get("/", function (req, res) {
  // this function is 'middleware'
  //req is http request, res is http response
  return res.send("Hello World !! changed"); // sending this following text to the specified route ("/")
});

app.get("/page1", function (req, res) {
  return res.send("This is my page one!");
});

const users = [];

app.use(express.json()); // use middleware
//app.use() adds a new middleware to the app.
//express.json() is a built-in middleware function in express

app.get("/user", function (req, res) {
  return res.send({ users: users });
});

app.post("/user", function (req, res) {
  console.log(req.body);
  users.push({ name: req.body.name, age: req.body.age });
  return res.send({ success: true });
}); // test this on postman or talend (chrome extension) - both are called API testers.
// try http get on postman to see that the res.send worked

//app is express()
// .listen() is a method of express.
// express also has other methods/fuinctions such as .use(), .get(), .post(), .delete()
app.listen(3000); // this is connecting to the port
/* server on port number 3000
i.e. server is running at https://localhost:3000/
*/

/* app.use().get().post().delete();

is the SAME AS:

app.use();
app.get();
app.post();
app.delete(); */

//above is same as app.get().listen() the above is just writing this separately
//npm start or npm run start
//visit localhost:3000 i.e. port 3000 in local server
// localhost is browser's local server
// when content changes, should ctrl+c and redo npm run start to see changes updated
// but we want changes to show/be updated as soon as we make changes, which is the reason we're using nodemon
// in package.json, under scripts add "dev": "nodemon server.js"
// then when we run npm run dev it will run nodemon server.js and will allow changes to be updated when we just reload the page
// i.e. we don't have to do npm run every time we make a change, just reload page once

//npm packages express js and nodemon
// nodemon allows so that we don't have to npm run start each time
// npm i -D nodemon (-D for developer version)

/* 1. npm init (to install package.json)
2. npm install express (to create a server, so that we use postman to put mongo db data to be displayed on the server)
3. npm i -D nodemon (i can be replaced with install) (nodemon doesn't get used in development but just in my local server)

inside package.json inside "scripts"{} write "start": "node server.js" then when we run npm start or npm run start
the program will run node server.js

inside package.json inside "scripts"{} write "dev": "nodemon server.js" then when we run npm dev or npm run dev
the program will run nodemon server.js. nodemon allows it so that the UI updates just on page load after we save the
changed js file. i.e. with nodemon, we don't have to ctrl+c to stop and re-run npm run each time we changee js file and save (which we have to do with node).

4. create test02 folder
5. copy paste package.json of express01 in test02 so they both have package.json
6. cd into test02 and npm i or npm install
7. now test02 has the same packages installed as express01 */

// mvc pattern: model => database, controller =>endpoint, view => React
