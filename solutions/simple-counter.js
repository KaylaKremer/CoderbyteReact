import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Counter = () => {
  const [count, setCount] = useState(0);

  increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div id="mainArea">
      <p>
        Button Count: 
        <span>{count}</span>
      </p>
      <button 
        onClick={increment} 
        id="mainButton"
      >
        Increase
      </button>
    </div>
  );
};

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);