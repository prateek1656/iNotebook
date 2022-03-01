import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

function SignUp() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useHistory()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
              localStorage.setItem('token',json.authtoken);
              history.push("/");
          }
          else{
              alert("Incorrect Creds")
          }
    }

    const onChange =(e)=>{
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="mt-5">
      <form onSubmit={handleSubmit}>
      <h1>Please Sign UP</h1>
      <div className="d-flex">
        <div className="mb-3" style={{width:"50%"}}>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3 ms-2" style={{width:"50%"}}>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        </div>
      <div className="d-flex">
      <div className="mb-3 " style={{width:"50%"}}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength="5"
          />
        </div>
        <div className="mb-3 ms-2" style={{width:"50%"}}>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm the Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            required
            minLength ="5"
          />
        </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    )
}

export default SignUp
