import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Toggle = () => {

  const [toggle, setToggle] = useState(false);
  
  const handleClick = () => {
    setToggle(!toggle);
  };

    return (
      <button type="button" onClick={handleClick}>
        {toggle ? 'ON' : 'OFF'}
      </button>
    );
};

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);