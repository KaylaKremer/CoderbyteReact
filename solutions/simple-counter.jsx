import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(prevCount => prevCount + 1)
    }

    return (
        <div id="mainArea">
            <p>
                {`Button Count: `}
                <span>{count}</span>
            </p>
            <button onClick={increment} id="mainButton">
                Increase
            </button>
        </div>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Counter />)
