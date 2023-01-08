import React, { useState, ReactNode } from "react"
import ReactDOM from "react-dom"

function Toggle(): ReactNode {
    const [toggle, setToggle] = useState<boolean>(true)

    function handleClick() {
        setToggle(!toggle)
    }

    return (
        <button type="button" onClick={handleClick}>
            {toggle ? "ON" : "OFF"}
        </button>
    )
}

ReactDOM.render(<Toggle />, document.getElementById("root"))
