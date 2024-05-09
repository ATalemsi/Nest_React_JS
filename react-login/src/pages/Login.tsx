import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/auth/login',{
            method: "POST",
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
            })
        });  
        
       
    
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('user_id', data.user._id);
          setRedirect(true);
      } else {
          console.error('Login failed');
      }
      }
  
      if (redirect) {
          return <Navigate to="/" />
      }
     
     
    return (
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
           onChange={e => setEmail(e.target.value)} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    );
};


export default Login;