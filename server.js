const express = require("express");
const path = require("path")
const api = require("./routes/index.js");
//sets the port to work on heroku
const PORT = process.env.PORT || 3001;
const app = express();

// setting up middleware using express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);
//computer is directed to the index.html
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
//computer is directed through /notes to the notes.html 
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);



app.listen(PORT, ()=>{
  console.log(`Running on http://localhost:${PORT}`)
});