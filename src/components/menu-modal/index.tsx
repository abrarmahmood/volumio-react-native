import React from "react";
import { Text, StyleSheet, View, Modal, Button } from "react-native";
import ModalButton from "./modal-button";


interface State {
    modalVisible: boolean
}

interface MenuOptions {
    text: string
    action: Function
}

interface Props {
    title: string
    cancel?: boolean,
    options: Array<MenuOptions>
}

export default class MyModal extends React.Component<Props, State> {
    state = { modalVisible: false };

    render() {
        const { modalVisible } = this.state;
        const { cancel = true, title, options } = this.props;

        return (
            <View>
                <Button
                    title="Open modal"
                    onPress={() => this.setState({ modalVisible: !modalVisible })}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}>{title}</Text>
                            {options.map((o, i, arr) => (
                                <ModalButton text={o.text} action={() => o.action(arr[i])} />
                            ))}
                            {cancel && <ModalButton text='close' action={() => this.setState({ modalVisible: false })} />}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        bottom: 0,
        overflow: 'scroll',
        width: '100%',
        paddingBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
    }
});
