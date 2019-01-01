import React from "react";
import { StyleSheet, View } from "react-native";



export const renderListSeparator = () => (
    <View style={styles.seperator} />
);


const styles = StyleSheet.create({
    seperator: {
        height: 1,
        width: "96%",
        backgroundColor: "rgba(255,255,255,0.2)",
        marginLeft: "2%",
        marginRight: "2%",
    },
});
