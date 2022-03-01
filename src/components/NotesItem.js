import React, {useContext} from "react";
import noteContext from '../Context/notes/noteContext'

const NotesItem=(props)=> {
  const { note , updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
  return (
      <div className="col-md-3 my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "80%", zIndex: "1" }}
          >
            {note.tag.length >0 && note.tag}
          </span>
            <i className="far fa-edit fa-lg ms-3 " onClick={()=>{updateNote(note)}}/>
            <i className="far fa-trash-alt fa-lg mx-2" onClick={()=>{deleteNote(note._id)}}/>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
          <div className="card-footer text-muted"> Created on {new Date(note.date).toGMTString()}</div>
        </div>
      </div>
  );
}

export default NotesItem;
