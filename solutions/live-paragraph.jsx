import React, { useState } from "react"
import { createRoot } from "react-dom/client"

function LiveText() {
    const [text, setText] = useState("")

    const onChange = ({ target: { value } }) => {
        setText(value)
    }
    return (
        <>
            <input type="text" onChange={onChange} value={text} />
            <p>{text}</p>
        </>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<LiveText />)
