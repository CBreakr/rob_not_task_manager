import React from 'react';
import logo from './logo.svg';
import './App.css';

import ReduxTest from "./Containers/ReduxTestContainer";

function App() {

  const newUser = {
    email:"aaa@aa.aa",
    password: "12345"
  };

  fetch("/getuser")
  .then(res => res.json())
  .then(data => {
    console.log("get user check", {data});
    if(data.user){
      console.log("we have a user");
    }
    else{
      console.log("no user");
    }
  })
  .catch(err => console.log({err}));

  fetch("/api/login", {
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log({data});
  })
  .catch(err => console.log({err}));

  return (
    <div className="App">
      <ReduxTest />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
