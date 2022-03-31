import React, { Component, useState, useEffect } from "react";
import Axios from 'axios';
// import Login from './components/Login';

function Home() {
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [passwordList, setPasswordList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/showpasswords').then((response) => {
            setPasswordList(response.data);
        })
    }, [])

    const addPassword = () => {
        Axios.post("http://localhost:3001/addpassword", {
            password: password,
            title: title,
        })

        window.location.reload();
    };

    const decryptPassword = (encryption) => {
        Axios.post("http://localhost:3001/decryptpassword", {
            password: encryption.password,
            iv: encryption.iv,
        }).then((response) => {
            setPasswordList(
                passwordList.map((val) => {
                    return val.id === encryption.id
                        ? {
                            id: val.id,
                            password: val.password,
                            title: response.data,
                            iv: val.iv,
                        }
                        : val;
                })
            );
        });
    };

    return (
        <div className='auth-inner'>
            <div className='add-password'>
                <input type="text" placeholder='password123'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input type="text" placeholder='Facebook'
                    onChange={(event) => setTitle(event.target.value)}
                />
                <button onClick={addPassword}>Add password</button>
            </div>

            <div className='passwords-list'>
                {passwordList.map((val, key) => {
                    return <div className='password' onClick={() => {
                        decryptPassword({
                            password: val.password,
                            iv: val.iv,
                            id: val.id,
                        });
                    }}
                        key={key}>
                        <h3> {val.title} </h3>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;