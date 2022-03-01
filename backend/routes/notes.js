const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
    console.log(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be longer than 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be longer than 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      const note = new Note({
        title,
        description,
        tag,
        user:req.user.id
      });
      
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Authentication failed,Action not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});


router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
  
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Authentication failed,Action not allowed");
      }
  
      note = await Note.findByIdAndDelete(
        req.params.id
      );
      res.json({ "success":"Note has been deleted successfully",note: note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  });
module.exports = router;
