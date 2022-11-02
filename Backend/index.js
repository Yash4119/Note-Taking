import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://yashamb444:Yash%401234@cluster0.fusjnqx.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("DB connected"))

const notesSchema = mongoose.Schema({
  title: String,
  description: String,
});

const notes = new mongoose.model("notes", notesSchema);

app.get("/api/getAll", (req, res) => {
  notes.find({}, (err, notesList) => {
      if(err){
          console.log(err)
      } else {
          res.status(200).send(notesList)
      }
  })
})

app.post("/api/addNew", (req, res) => {
  const { title, description } = req.body
  const noteObj = new notes({
      title,
      description
  })
  noteObj.save( err => {
      if(err){
          console.log(err)
      }
      notes.find({}, (err, notesList) => {
          if(err){
              console.log(err)
          } else {
              res.status(200).send(notesList)
          }
      })
  })

})

app.post("/api/delete", (req, res) => {
  const { id } = req.body
  notes.deleteOne({ _id: id}, () => {
      notes.find({}, (err, notesList) => {
          if(err){
              console.log(err)
          } else {
              res.status(200).send(notesList)
          }
      })
  })

})

app.listen( 3001, () => {
  console.log("Backend created at port 3001")
})