const express = require("express");
const note = require("./notes");
const app = express();

app.use("/notes", note);

module.exports = app;
