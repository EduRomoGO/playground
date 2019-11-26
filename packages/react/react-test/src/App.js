import React from 'react';
import './App.css';
import NameFormClass from './test/NameFormClass.js';
import NameFormFunction from './test/NameFormFunction.js';
import BoilingVerdict from './test/BoilingVerdict.js';
import Calculator from './test/Calculator.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
        <BoilingVerdict celsius={280} />
        <NameFormFunction />
        <NameFormClass />
      </header>
    </div>
  );
}

export default App;
