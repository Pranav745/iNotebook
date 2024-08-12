import React, { useState } from 'react';

function Signup() {
  const [signUpCred, setCreads] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onchange = (e) => {
    setCreads({ ...signUpCred, [e.target.name]: e.target.value });
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    if (signUpCred.password === signUpCred.cpassword) {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name: signUpCred.name, email: signUpCred.email, password: signUpCred.password })
      })

      let res = await response.json();
      if (res.success) {
        console.log(res.authToken)
      } else {
        console.log("Sign Not Possible due to internal issu")
      }

    } else {
      console.log("Passwords do not match");
    }
  }

  return (
    <div className='container my-3'>
      <h2>Create New Account to use iNoteBook</h2>
      <form className='my-3' onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter Name</label>
          <input type="text" className="form-control" id="name" name='name' value={signUpCred.name} onChange={onchange} minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={signUpCred.email} onChange={onchange} aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Enter Password</label>
          <input type="password" className="form-control" id="password" name='password' value={signUpCred.password} onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={signUpCred.cpassword} onChange={onchange} minLength={5} required/>
        </div>
        <button  type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
