import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 1700);
  };

  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const getNotes = async () => {
    const token = getAuthToken();
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    const json = await response.json();
    if (json.success) {
      setNotes(json.notes);
    } else {
      console.log("Error in fetching notes from DB");
    }
  };

  const addNote = async (title, description, tag) => {
    const token = getAuthToken();
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const token = getAuthToken();
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const newNote = notes.filter((note) => note._id !== id);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    if (response.status === 200) {
      setNotes(newNote);
      showAlert("Note Deleted Successfully","danger")
    }
  };

  const editNote = async (id, title, description, tag) => {
    const token = getAuthToken();
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({ title, description, tag })
    });

    const newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider value={{ notes, alert, addNote, deleteNote, editNote, getNotes, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
