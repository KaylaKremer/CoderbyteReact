import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const Toggle = () => {
    const [toggle, setToggle] = useState(false)

    const handleClick = () => {
        setToggle(!toggle)
    }

    return (
        <button type="button" onClick={handleClick}>
            {toggle ? "ON" : "OFF"}
        </button>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Toggle />)
