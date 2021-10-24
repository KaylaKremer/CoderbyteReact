import React from 'react';
import ReactDOM from 'react-dom';

const data = [
  { name: 'Daniel', age: 25 },
  { name: 'John', age: 24 },
  { name: 'Jen', age: 31 },
];

const DataItem = ({ name, age}) => {
  
  return (
    <li>
      <span>{name}{` `}</span>
      <span>{age}</span>
    </li>
  );
};

const DataList = () => {

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((dataItem, index) => {
          return (
            <DataItem 
              name={dataItem.name} 
              age={dataItem.age} 
              key={`data-item-${index}`} 
            />
          );
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(
  <DataList data={ data } />,
  document.getElementById('root')
);