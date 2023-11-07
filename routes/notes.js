const uuid = require("uuid");
const route = require("express").Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js')


route.get("/", (req, res) =>
  readFromFile('./db/db.json').then((data)=>{
    res.json(JSON.parse(data))
  })
);

route.post("/",(req, res)=>{
    const { title, text } = req.body
    if (title && text){
        const newNote = {
            title,
            text,
            id: uuid.v4()
        }
        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
    } else{
        res.json('Error in posting note')
    }
})

module.exports = route;