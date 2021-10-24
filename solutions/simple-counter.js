import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  increment = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
  }

  render() {
    const {count} = this.state;
    return (
      <div id="mainArea">
        <p>button count: <span>{count}</span></p>
        <button onClick={this.increment} id="mainButton">Increase</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);