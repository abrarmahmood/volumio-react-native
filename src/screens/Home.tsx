import React from "react";
import { View, Text, Button, StyleSheet, TextInput, StatusBar } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { BrowseNavState } from "./Browse";


interface State {
  text: string
}

export default class HomeScreen extends React.Component<NavigationInjectedProps, State> {
  state = { text: '' };

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

  onSearchPress = () => {
    const state: BrowseNavState = {
      searching: true,
      searchText: this.state.text,
      uri: '',
      prevUri: '',
    };

    this.props.navigation.navigate('Browse', { state });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle="light-content" />
        <Text>Search TIDAL</Text>
        <TextInput
          placeholder='Search here...'
          style={styles.input}
          onChangeText={text => this.setState({ text })}
        />
        <Button
          title="Search"
          onPress={() => this.onSearchPress()}
        />
        <Button
          title="Now Playing"
          onPress={() => this.props.navigation.navigate('Play')}
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