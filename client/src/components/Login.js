import Axios from 'axios';
import { useState } from "react";
// import Home from './components/Home';
import { useHistory } from "react-router-dom";


function Login() {
    const history = useHistory();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const logIn = (e) => {
        e.preventDefault();
        Axios.post("login", {
            email: userEmail,
            password: userPassword
        }).then(response => {
            console.log(response)
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                history.push("/");
                console.log('Successfully Login');
            }
        });
        // .then((response) => {
        //     console.log(response);
        //     if (response.data.message) {
        //         setLoginStatus(response.data.message);
        //     } else {
        //         setLoginStatus(response.data[0].email);
        //     }
        // });
    };

    return (
        <div className='auth-inner'>
            <form className='register-form' onSubmit={logIn}>
                <h3>Login</h3>

                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" className="form-control" placeholder="E-mail"
                        onChange={(event) => setUserEmail(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={(event) => setUserPassword(event.target.value)} />
                </div>

                <button className="btn btn-primary btn-block">Login</button>
            </form>
            <div>{loginStatus}</div>
        </div>
    )
}

export default Login;