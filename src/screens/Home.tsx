import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { NavigationInjectedProps } from "react-navigation";


interface State {
  text: string
}

export default class HomeScreen extends React.Component<NavigationInjectedProps, State> {
  state = {text: ''};

  static navigationOptions = {
    title: 'Home',
    // headerRight: (
    //   <Button
    //     onPress={() => alert('This is a button!')}
    //     title="Search"
    //   // color="#00000"
    //   />
    // ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Search TIDAL</Text>
        <TextInput
          placeholder='Search here...'
          style={styles.input}
          onChangeText={text => this.setState({text})}
        />
        <Button
          title="Search"
          onPress={() => {
            this.props.navigation.navigate('Search', {
              itemId: 86,
              otherParam: 'anything you want here',
              searchText: this.state.text,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    width: 250,
  }
})