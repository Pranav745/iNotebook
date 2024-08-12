const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewear/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using Get req "/api/notes/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    if(notes)
    {
        res.json({success:true,notes});
    }else{
        res.json({success:false,notes});
    }
    
})

// Route 2: Add new Notes using Post req "/api/notes/addnote"

router.post('/addnote', fetchuser, [
    body('title', 'Enter Valid title').isLength({ min: 3 }),
    body('description', 'Enter Valid description').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // validate data
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }

        // create a note
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // save to database
        const saveNote = await note.save();
        // return the note as response 
        res.json(saveNote);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Some Error occured");
    }
})

// Route 3: Add new Notes using Post req "/api/notes/addnote"
// getting :id of note which we want to upadate 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }


        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Some Error occured");
    }

})


// Route 4: Delete the note using id "/api/notes/deletenote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Note Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        let isDeleted = await Note.findByIdAndDelete(req.params.id);

        res.json({ "succes": "Your note deleted successfully", note: isDeleted });

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Some Error occured");
    }
})

module.exports = router