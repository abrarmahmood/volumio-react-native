import React from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";


interface Props {
    text: string
    action: Function
}

export default ({ text, action }: Props) => (
    <TouchableHighlight style={{
        backgroundColor: 'rgba(255,255,255,0.3)',
        margin: 10,
        borderRadius: 5,
        padding: 10,

    }} onPress={() => action()}>
        <Text style={styles.text}>{text.toUpperCase()}</Text>
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    }
})
