import Axios from 'axios';
import { useState } from "react";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const addUser = (e) => {
        // e.preventDefault();
        Axios.post("register", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className='auth-inner'>
            <form className='register-form' onSubmit={addUser}>
                <h3>Sign up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="E-mail" onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control" placeholder="Confirm password"
                        onChange={(event) => setPasswordConfirm(event.target.value)} />
                </div>

                <button className="btn btn-primary btn-block" >Sign up</button>
            </form>
        </div>
    )
}

export default Register;