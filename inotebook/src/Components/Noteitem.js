import React,{useContext} from 'react'
import noteContext from '../Context/noteContext'
import '../App.css'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;


    return (

        <div className="col-md-3 mb-3 mb-sm-0 my-3">
            <div className="card m-3">
                <div className="card-body">
                <span className="position-absolute top-0  translate-middle badge rounded-pill text-bg-secondary" style={{left:'87%',zIndex:1}}>
                {props.note.tag}
                    <span className="visually-hidden"></span>
                </span>
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description} .</p>
                    <div className='d-flex justify-content-end'>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>props.updateNote(props.note)}></i>
                        <i className="fa-duotone fa-solid fa-trash mx-2" onClick={()=>deleteNote(props.note._id)}></i>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
