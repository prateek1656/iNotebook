import React , {useContext,useState} from 'react'
import noteContext from '../Context/notes/noteContext'

function AddNotes() {
    const context = useContext(noteContext);
    const {addNote}  = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleOnClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
    }

    return (
        <div>
            <div className="container mt-5">
                <h1> Write a Note</h1>
                <form>
                    <div className="d-flex mb-3">

                    <div className="me-3" style={{width:"50%"}}>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength="3"
                      required/>
                    </div>

                    <div  style={{width:"50%"}}>
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>

                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength="5"
                      required/>
                    </div>
                    <button type="submit" disabled={note.title.length < 3 || note.description < 5} className="btn btn-primary" onClick={handleOnClick}>Submit</button>
                </form>
            </div>
            <hr className='my-5' style={{ height: '2px', borderWidth: '0', color: 'gray', backgroundColor: 'gray' }} />
        </div>

    )
}

export default AddNotes
