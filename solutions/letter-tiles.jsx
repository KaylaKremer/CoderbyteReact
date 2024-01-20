import React, { useState, useCallback, useMemo } from "react"
import { createRoot } from "react-dom/client"

const style = {
    letterContainer: {
        overflow: "auto",
        marginBottom: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    letter: {
        float: "left",
        padding: "10px 10px",
        background: "#c9e4ed",
        borderRadius: "5px",
        marginRight: "5px",
        marginTop: "5px",
        cursor: "pointer",
    },
    outputString: {
        marginTop: "20px",
        textAlign: "center",
    },
}

const Tile = ({ letter, outputArray, setOutputArray, tally, setTally }) => {
    const onClick = useCallback(() => {
        if (!tally[letter]) {
            setTally({ ...tally, [`${letter}`]: 1 })
            setOutputArray([...outputArray, letter])
        } else if (tally[`${letter}`] && tally[`${letter}`] === 2) {
            setTally({ ...tally, [`${letter}`]: 0 })
            const slicedArray = outputArray.slice(0, outputArray.length - 2)
            setOutputArray([...slicedArray, "_"])
        } else {
            setTally({ ...tally, [`${letter}`]: tally[`${letter}`] + 1 })
            setOutputArray([...outputArray, letter])
        }
    }, [letter, outputArray, setOutputArray, tally, setTally])

    return (
        <button type="button" onClick={onClick} style={style.letter}>
            {letter}
        </button>
    )
}

const Application = () => {
    const [outputArray, setOutputArray] = useState([])
    const [tally, setTally] = useState({})
    const alphabetArray = useMemo(() => {
        let arr = []
        for (let i = 65; i <= 90; i++) {
            const char = String.fromCharCode(i)
            arr.push(char)
        }
        return arr
    }, [])
    return (
        <section>
            <aside style={style.letterContainer} id="letterContainer">
                {alphabetArray.map((letter, index) => (
                    <Tile
                        tally={tally}
                        setTally={setTally}
                        letter={letter}
                        key={index}
                        outputArray={outputArray}
                        setOutputArray={setOutputArray}
                    />
                ))}
            </aside>
            <div style={style.outputString} id="outputString">
                {outputArray.join("")}
            </div>
        </section>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Application />)
