import React from "react";
import { Text, StyleSheet } from "react-native";


export const renderListHeader = ({ section: { title } }: any) => (
    <Text style={styles.listHeader}>{title}</Text>
);

const styles = StyleSheet.create({
    listHeader: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        // borderBottomWidth: 3,
        // borderBottomColor: 'gray',
        fontWeight: 'bold',
        padding: 10,
    },
});
