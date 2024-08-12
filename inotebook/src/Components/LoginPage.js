import React, { useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/noteContext'

function LoginPage() {

    const context = useContext(noteContext);
    const {  showAlert } = context;

    const [loginCred, setCred] = useState({ email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: loginCred.email, password: loginCred.password })
        })


        const res = await response.json();
        if (res.success) {
            localStorage.setItem('authToken', res.authToken);
            navigate('/');

            showAlert("You Loged in Successfully", "success")
        } else {
            alert("Creadentials false");
        }
    }

    const onchange = (e) => {
        setCred({ ...loginCred, [e.target.name]: e.target.value })

        // setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='container my-3'>
            <h2>Login to use iNoteBook</h2>
            <form className='my-3' onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    )
}

export default LoginPage
