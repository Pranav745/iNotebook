import React, { useContext, useState } from 'react'
import noteContext from '../Context/noteContext'

function Addnote() {
    const context = useContext(noteContext);
    const { addNote, showAlert } = context;

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("New Note Added Succesfully", "success")
        setNote({ title: "", description: "", tag: "" })
    }
    const [note, setNote] = useState({ title: "", description: "", tag: "" })


    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title' onChange={onchange} minLength={3} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onchange} required />
                </div>
                <button
                    disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3}
                    type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Addnote
