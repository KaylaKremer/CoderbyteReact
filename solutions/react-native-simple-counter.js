import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"

const SimpleCounter = () => {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>
                button count: <span id="actualCount">{count}</span>
            </Text>
            <button id="mainButton" onClick={increment}>
                Increase
            </button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 10,
    },
    counter: {
        textAlign: "center",
        marginVertical: 20,
    },
})

export default SimpleCounter
