import React, { useState } from "react"
import { Text, View, StyleSheet, Button } from "react-native"

const SimpleCounter = () => {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>
                button count: <Text id="actualCount">{count}</Text>
            </Text>
            <Button id="mainButton" onPress={increment}>
                INCREASE
            </Button>
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
        marginVertical: 10,
    },
})

export default SimpleCounter
