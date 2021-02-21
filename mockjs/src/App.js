import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import mockData from './mock';

function App() {
  
  React.useEffect(() => {
    console.log("mockData: ", mockData);

    axios.get('/api/getUsers')
    .then(function (response) {
        console.log('/api/getUsers', response);
    });

    axios.post('/api/updateUsers')
    .then(function (response) {
      console.log('/api/updateUsers', response);
    })

  }, []);

  return (
    <div className="App">
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
