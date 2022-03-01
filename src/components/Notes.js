import React, { useContext, useEffect, useState, useRef } from "react";
import NotesItem from "./NotesItem";
import noteContext from "../Context/notes/noteContext";
import { useHistory } from "react-router";

const  Notes=()=> {
  let history = useHistory()
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    }
    else{
      history.push("/Login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  return (
    <>
      <div>
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Edit Note
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      value={note.etitle}
                      onChange={onChange}
                      minLength="3"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edeescription"
                      value={note.edescription}
                      name="edescription"
                      onChange={onChange}
                      minLength="5"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="tag"
                      className="form-label"
                    >
                      tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      value={note.etag}
                      name="etag"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled={note.etitle<3||note.edescription<5}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mt-5 row">
          <h1> Your Notes </h1>
          <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
           {notes.map((note) => {
            return <NotesItem key={note._id} note={note} updateNote={updateNote} />
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
