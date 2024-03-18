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

/*npm i installs node_modules */

// get http://localhost:3000/:userId/:postId => specific user's specific post
// get http://localhost:3000/user => user list
// get http://localhost:3000/user/:userId => specific user with that id
// put http://localhost:3000/user/:userId => modify
// del http://localhost:3000/user/:userId

// post http://localhost:3000/user

// searching is a post request e.g. search "furniture" is post furniture.
// then as soon as we hit the search button, the web page sends/shows us the response of a get request.

console.log("hello express");

/* making a server */
const express = require("express"); // looks for 'express' module (folder) inside the node_modules folder
const app = express();
const users = [];

// to route /, we will send the result of this function
app.get("/", function (req, res) {
  // this function is 'middleware'
  //req is http request, res is http response
  return res.send("Hello World !! changed"); // sending this following text to the specified route ("/")
});

app.get("/page1", function (req, res) {
  return res.send("This is my page one!");
});

app.use(express.json()); // use middleware // we NEED this line for Postman to work!
//app.use() adds a new middleware to the app.
//express.json() is a built-in middleware function in express
// express.json() parses incoming JSON data from HTTP requests
// it first receives the data from the API in JSON format (e.g. from postman post request)
// and then parses the JSON string (i.e. convert to local format) so its contents can be used and manipulated

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
}); // test this on postman or talend (chrome extension) - both are called API testers.
// try http get on postman to see that the res.send worked

// app.post("/user", function (req, res) {
//   users.push({ name: "John", age: 20 });
//   return res.send({ success: true });
// });

//app is express()
// .listen() is a method of express.
// express also has other methods/fuinctions such as .use(), .get(), .post(), .delete()
app.listen(3000); // this is connecting to the port
/* server on port number 3000
i.e. server is running at https://localhost:3000/
localhost is the same as this computer's ip address
on cmd when you type ipconfig you can see that this computer's ip address is e.g.
192.168.0.78
then localhost:3000 is the SAME as 192.168.0.78:3000
since the actual ip address of each laptop is different
it's just a rule to call this ip address of local computer 'localhost'
if you type a different ip address then :3000 e.g.
get 192.168.0.109:3000/user on postman,
then you are accessing 192.168.0.109 this different computer's local server.
express.js allows us to create this SERVER
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

/*

1. npm init (this creates package.json) // we need this to install the different packages. npm init means initialize node package.json
or npm init -y to skip all the questions and go for default answers
2. npm install express (to create a server, so that we use postman to put mongo db data to be displayed on the server) (install or i)
3. npm i -D nodemon (i can be replaced with install) (nodemon doesn't get used in development but just in my local server)

npm run is to RUN THE SCRIPT which script to run ? => set it in package.json under "scripts"
why do we do npm run? to RUN THE SERVER (run the script ON THE SERVER), why run the server? to do BACKEND.

Inside package.json:
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js", // what I added
    "dev": "nodemon test.js" // what I added
  },
this is telling/noting down that when we do npm run start on terminal it will run node index.js
and again if we do npm run dev on cmd terminal it will run nodemon test.js

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
