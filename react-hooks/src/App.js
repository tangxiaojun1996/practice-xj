import React from 'react';
import logo from './logo.svg';
import './App.css';

import UseState from './components/useState'
import UseEffect from './components/useEffect'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UseState />
        <UseEffect />
      </header>
    </div>
  );
}

export default App;
