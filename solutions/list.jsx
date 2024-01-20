import React from "react"
import { createRoot } from "react-dom/client"

const data = [
    { name: "Daniel", age: 25 },
    { name: "John", age: 24 },
    { name: "Jen", age: 31 },
]

const DataItem = ({ name, age }) => (
    <li>
        <span>{`${name} `}</span>
        <span>{age}</span>
    </li>
)

const DataList = ({ data }) => (
    <div>
        <h2>Data List</h2>
        <ul>
            {data.map((dataItem, index) => (
                <DataItem
                    name={dataItem.name}
                    age={dataItem.age}
                    key={`data-item-${index}`}
                />
            ))}
        </ul>
    </div>
)

const root = createRoot(document.getElementById("root"))
root.render(<DataList data={data} />)
