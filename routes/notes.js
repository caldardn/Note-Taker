const uuid = require("uuid");
const route = require("express").Router();
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils.js");

route.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => {
    res.json(JSON.parse(data));
  })
);

route.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };
    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

route.delete("/:id", (req, res) => {
  const id = req.params.id;
  readFromFile("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    const filterNotes = notes.filter((note) => note.id !== id);
    writeToFile("./db/db.json", filterNotes, (err) =>
      err ? console.error(err) : console.log("Note Deleted")
    );
    res.json(filterNotes);
  });
});

module.exports = route;
