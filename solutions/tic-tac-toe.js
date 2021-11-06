import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
  'cursor': 'pointer',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
  'cursor': 'pointer',
}

const Square = ({playerXSquares, playerOSquares, handleClick, value, disabled }) => {
  return (
    <div
      className="square"
      style={squareStyle}
      disabled={disabled}
      value={value}
      onClick={() => {
        if (!disabled) {
          handleClick(value)
        }
      }}
    >
      <span className="square-text">
        {playerXSquares.indexOf(value) > -1 ? 'X' : playerOSquares.indexOf(value) > -1 ? 'O' : ''}
      </span>
    </div>
  );
};

const Board = () => {
  const [currentPlayer, setCurrentPlayer] = useState('player X');
  const [winner, setWinner] = useState('None')
  const [playerXSquares, setPlayerXSquares] = useState([]);
  const [playerOSquares, setPlayerOSquares] = useState([]);

  const handleClick = value => {
    if (currentPlayer === 'player X') {
      setPlayerXSquares([...playerXSquares, value]);
      setCurrentPlayer('player O');
    } else {
      setPlayerOSquares([...playerOSquares, value]);
      setCurrentPlayer('player X');
    }
  }

  const determineWinner = (playerXSquares, playerOSquares) => {
    function checkRows() {
      if (
      (playerXSquares.includes(0) && playerXSquares.includes(1) && playerXSquares.includes(2)) ||
      (playerXSquares.includes(3) && playerXSquares.includes(4) && playerXSquares.includes(5)) ||
      (playerXSquares.includes(6) && playerXSquares.includes(7) && playerXSquares.includes(8))
      ) {
        return setWinner('Player X');
      }

      if (
      (playerOSquares.includes(0) && playerOSquares.includes(1) && playerOSquares.includes(2)) ||
      (playerOSquares.includes(3) && playerOSquares.includes(4) && playerOSquares.includes(5)) ||
      (playerOSquares.includes(6) && playerOSquares.includes(7) && playerOSquares.includes(8))
      ) {
        return setWinner('Player O');
      }
    }

    function checkColumns() {
      if (
      (playerXSquares.includes(0) && playerXSquares.includes(3) && playerXSquares.includes(6)) ||
      (playerXSquares.includes(1) && playerXSquares.includes(4) && playerXSquares.includes(7)) ||
      (playerXSquares.includes(2) && playerXSquares.includes(5) && playerXSquares.includes(8))
      ) {
        return setWinner('Player X');
      }

      if (
      (playerOSquares.includes(0) && playerOSquares.includes(3) && playerOSquares.includes(6)) ||
      (playerOSquares.includes(1) && playerOSquares.includes(4) && playerOSquares.includes(7)) ||
      (playerOSquares.includes(2) && playerOSquares.includes(5) && playerOSquares.includes(8))
      ) {
        return setWinner('Player O');
      }
    }

    function checkDiagonals() {
      if (playerXSquares.includes(4)) {
        if ((playerXSquares.includes(0) && playerXSquares.includes(8)) || (playerXSquares.includes(2) && playerXSquares.includes(6))) {
          return setWinner('Player X');
        }
      }
      if (playerOSquares.includes(4)) {
        if ((playerOSquares.includes(0) && playerOSquares.includes(8)) || (playerOSquares.includes(2) && playerOSquares.includes(6))) {
          return setWinner('Player O');
        }
      }
    }

    if (winner === 'None') {
      checkRows();
      checkColumns();
      checkDiagonals();
    }
  }


  const reset = () => {
    setCurrentPlayer('Player X');
    setPlayerXSquares([]);
    setPlayerOSquares([]);
    setWinner('None');
  }

  useEffect(() => {
    determineWinner(playerXSquares, playerOSquares);
  }, [playerXSquares, playerOSquares]);

  return (
    <div 
      style={containerStyle} 
      className="gameBoard"
    >
      <div 
        id="statusArea" 
        className="status" 
        style={instructionsStyle}
      >
        Next player: <span>{currentPlayer === 'Player X' ? 'Player O' : 'Player X'}</span>
      </div>
      <div 
        id="winnerArea" 
        className="winner" 
        style={instructionsStyle}
      >
        Winner: <span>{winner}</span>
      </div>
      <button 
        onClick={reset} 
        style={buttonStyle}
      >
        Reset
      </button>
      <div 
        style={boardStyle}
      >
        <div 
          className="board-row" 
          style={rowStyle}
        >
          <Square 
            disabled={playerXSquares.includes(0) || playerOSquares.includes(0) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={0} 
          />
          <Square 
            disabled={playerXSquares.includes(1) || playerOSquares.includes(1) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={1} 
          />
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(2) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={2} 
          />
        </div>
        <div 
          className="board-row" 
          style={rowStyle}
        >
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(3) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={3} 
          />
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(4) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={4} 
          />
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(5) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={5} 
          />
        </div>
        <div 
          className="board-row" 
          style={rowStyle}
        >
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(6) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={6} 
          />
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(7) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={7} 
          />
          <Square 
            disabled={playerXSquares.includes(2) || playerOSquares.includes(8) || winner !== 'None'} 
            playerXSquares={playerXSquares} 
            playerOSquares={playerOSquares} 
            handleClick={handleClick} 
            value={8} 
          />
        </div>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div 
      className="game"
    >
      <div 
        className="game-board"
      >
        <Board />
      </div>
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);