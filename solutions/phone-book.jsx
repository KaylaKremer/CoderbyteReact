import React, { useState, useReducer, useCallback } from "react"
import { createRoot } from "react-dom/client"

const style = {
    table: {
        borderCollapse: "collapse",
    },
    tableCell: {
        border: "1px solid gray",
        margin: 0,
        padding: "5px 10px",
        width: "max-content",
        minWidth: "150px",
    },
    form: {
        container: {
            padding: "20px",
            border: "1px solid #F0F8FF",
            borderRadius: "15px",
            width: "max-content",
            marginBottom: "40px",
        },
        inputs: {
            marginBottom: "5px",
        },
        submitBtn: {
            marginTop: "10px",
            padding: "10px 15px",
            border: "none",
            backgroundColor: "lightseagreen",
            fontSize: "14px",
            borderRadius: "5px",
        },
    },
}

function PhoneBookForm({ entries, setEntries }) {
    const initialFormState = {
        userFirstname: "Coder",
        userLastname: "Byte",
        userPhone: "8885559999",
    }

    const formReducer = (state, { type, payload }) => {
        switch (type) {
            case "RESET":
                return { userFirstname: "", userLastname: "", userPhone: "" }
            default:
                return { ...state, [type]: payload }
        }
    }

    const [formState, dispatch] = useReducer(formReducer, initialFormState)

    const onChange = ({ target: { name, value } }) =>
        dispatch({ type: name, payload: value })

    const addEntryToPhoneBook = useCallback(() => {
        const { userFirstname, userLastname, userPhone } = formState
        const newEntries = [
            ...entries,
            { userFirstname, userLastname, userPhone },
        ]
        const newSortedEntries = newEntries.sort((a, b) => {
            const userLastnameA = a.userLastname.toLowerCase()
            const userLastnameB = b.userLastname.toLowerCase()
            return userLastnameA < userLastnameB
                ? -1
                : userLastnameA > userLastnameB
                ? 1
                : 0
        })
        setEntries(newSortedEntries)
    }, [formState])

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                addEntryToPhoneBook(formState)
                dispatch({ type: "RESET" })
            }}
            style={style.form.container}
        >
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userFirstname"
                name="userFirstname"
                type="text"
                onChange={onChange}
                value={formState.userFirstname}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userLastname"
                name="userLastname"
                type="text"
                onChange={onChange}
                value={formState.userLastname}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className="userPhone"
                name="userPhone"
                type="text"
                onChange={onChange}
                value={formState.userPhone}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className="submitButton"
                type="submit"
                value="Add User"
            />
        </form>
    )
}

function InformationTable({ entries }) {
    return (
        <table style={style.table} className="informationTable">
            <thead>
                <tr key={`row-0`}>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
                {entries.map(
                    ({ userFirstname, userLastname, userPhone }, index) => (
                        <tr key={`row-${index + 1}`}>
                            <td style={style.tableCell}>{userFirstname}</td>
                            <td style={style.tableCell}>{userLastname}</td>
                            <td style={style.tableCell}>{userPhone}</td>
                        </tr>
                    )
                )}
            </thead>
        </table>
    )
}

function Application() {
    const [entries, setEntries] = useState([])
    return (
        <section>
            <PhoneBookForm entries={entries} setEntries={setEntries} />
            <InformationTable entries={entries} />
        </section>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<Application />)
