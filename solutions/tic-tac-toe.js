import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const rowStyle = {
    display: "flex",
}

const squareStyle = {
    width: "60px",
    height: "60px",
    backgroundColor: "#ddd",
    margin: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "white",
}

const disabledSquareStyle = {
    ...squareStyle,
    cursor: "not-allowed",
}

const boardStyle = {
    backgroundColor: "#eee",
    width: "208px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    border: "3px #eee solid",
}

const containerStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
}

const instructionsStyle = {
    marginTop: "5px",
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "16px",
}

const buttonStyle = {
    marginTop: "15px",
    marginBottom: "16px",
    width: "80px",
    height: "40px",
    backgroundColor: "#8acaca",
    color: "white",
    fontSize: "16px",
}

const Square = ({ value, onClick, winner }) => {
    return (
        <button
            className="square"
            onClick={() => onClick(value)}
            style={
                value !== null || winner !== "None"
                    ? disabledSquareStyle
                    : squareStyle
            }
            disabled={value !== null || winner !== "None"}
        >
            {value}
        </button>
    )
}

const Board = () => {
    const [player, setPlayer] = useState("X")
    const [winner, setWinner] = useState("None")
    const [board, setBoard] = useState(() => Array(9).fill(null))

    const matches = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const checkWinner = newBoard => {
        for (let i = 0; i < matches.length; i++) {
            const [a, b, c] = matches[i]
            if (
                newBoard[a] === player &&
                newBoard[b] === player &&
                newBoard[c] === player
            ) {
                return true
            }
        }
        return false
    }

    const onClick = index => {
        const newBoard = [...board]
        newBoard[index] = player
        setBoard(newBoard)

        if (checkWinner(newBoard)) {
            setWinner(player)
        } else {
            setPlayer(player === "X" ? "O" : "X")
        }
    }

    const onReset = () => {
        setBoard(Array(9).fill(null))
        setPlayer("X")
        setWinner("None")
    }

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>
                Next player: <span>{player === "X" ? "O" : "X"}</span>
            </div>
            <div id="winnerArea" className="winner" style={instructionsStyle}>
                Winner: <span>{winner !== "None" && winner}</span>
            </div>
            <button style={buttonStyle} onClick={onReset}>
                Reset
            </button>
            <div style={boardStyle}>
                <div className="board-row" style={rowStyle}>
                    <Square
                        value={board[0]}
                        onClick={() => onClick(0)}
                        winner={winner}
                    />
                    <Square
                        value={board[1]}
                        onClick={() => onClick(1)}
                        winner={winner}
                    />
                    <Square
                        value={board[2]}
                        onClick={() => onClick(2)}
                        winner={winner}
                    />
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square
                        value={board[3]}
                        onClick={() => onClick(3)}
                        winner={winner}
                    />
                    <Square
                        value={board[4]}
                        onClick={() => onClick(4)}
                        winner={winner}
                    />
                    <Square
                        value={board[5]}
                        onClick={() => onClick(5)}
                        winner={winner}
                    />
                </div>
                <div className="board-row" style={rowStyle}>
                    <Square
                        value={board[6]}
                        onClick={() => onClick(6)}
                        winner={winner}
                    />
                    <Square
                        value={board[7]}
                        onClick={() => onClick(7)}
                        winner={winner}
                    />
                    <Square
                        value={board[8]}
                        onClick={() => onClick(8)}
                        winner={winner}
                    />
                </div>
            </div>
        </div>
    )
}

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Game />)
