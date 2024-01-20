import React, { useState, ReactNode } from "react"
import { createRoot } from "react-dom/client"

const Toggle: ReactNode = () => {
    const [toggle, setToggle] = useState<boolean>(true)

    const onClick = (): void => {
        setToggle(!toggle)
    }

    return <button onClick={onClick}>{toggle ? "ON" : "OFF"}</button>
}

const root = createRoot(document.getElementById("root"))
root.render(<Toggle />)
