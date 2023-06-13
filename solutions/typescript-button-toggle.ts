import React, { useState, ReactNode } from "react"
import ReactDOM from "react-dom"

function Toggle(): ReactNode {
    const [toggle, setToggle] = useState<boolean>(true)

    function onClick(): void {
        setToggle(!toggle)
    }

    return (
        <button type="button" onClick={onClick}>
            {toggle ? "ON" : "OFF"}
        </button>
    )
}

ReactDOM.render(<Toggle />, document.getElementById("root"))
