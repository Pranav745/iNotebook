import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote,showAlert } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getNotes(); // eslint-disable-next-line
        } else {
            navigate("/login");
        }
        
    }, [getNotes,navigate])

    const ref = useRef(null);
    const closeRef = useRef(null);

    const updateNote = (cuurentNote) => {
        ref.current.click();
        setNote({ eid: cuurentNote._id, etitle: cuurentNote.title, edescription: cuurentNote.description, etag: cuurentNote.tag });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
        showAlert("Note Updated Successfully","success")
    }


    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3">
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content container">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' onChange={onchange} minLength={3} required />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onchange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onchange} required />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length < 3} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-3">
                <h2>
                    Your notes
                </h2>
                <div className="row">
                    <div className="container px-3">
                    {notes.length ===0 && "You have no notes"}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </div>
    )
}

export default Notes
