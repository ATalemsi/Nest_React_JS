import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [redirect, SetRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
         await fetch('http://localhost:4000/auth/register', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        });
        SetRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/login" />
    }
    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>

            <div className="form-floating">
                <input type="name" className="form-control" id="floatingName" placeholder="Name"
                    onChange={e => setName(e.target.value)} />
                <label htmlFor="floatingName">Name</label>
            </div>

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

            <div className="form-floating">
                <select className="form-select" id="floatingRole" aria-label="Select Role"
                    onChange={e => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="ENGINEER">ENGINEER</option>
                    <option value="INTERN">INTERN</option>
                </select>
                <label htmlFor="floatingRole">Role</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
};

export default Register;
