// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from "react";
import Axios from 'axios';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/nav.component';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/" component={Nav} />
        </Switch>

        <div className='auth-wrapper'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
        </div>





          {/* <div className='add-password'>
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
          </div> */}
      </div>

    </BrowserRouter>
  );
}

export default App;
