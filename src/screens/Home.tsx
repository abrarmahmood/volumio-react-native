import React from "react";
import { Text, Button, StyleSheet, TextInput, StatusBar, SafeAreaView, View } from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import Footer from "../components/Footer";
import { SearchNavState } from "./Search";
import BackgroundAlbumArt from "../components/background-album-art";
import { connect } from "react-redux";
import { PlayerState } from "../sagas/mappers/transform-state";


interface State {
  text: string
}

interface Props extends NavigationInjectedProps {
  playerState: PlayerState;
}

@(connect(
  (state: any) => ({
      playerState: state.playerState.value,
  })
) as any)
export default class HomeScreen extends React.Component<Props, State> {
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
    const state: SearchNavState = {
      searching: true,
      searchText: this.state.text,
    };

    this.props.navigation.navigate('Search', { state });
  }

  render() {
    const { playerState } = this.props;

    return (
      <BackgroundAlbumArt albumart={playerState.albumart}>
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Volumio remote control</Text>
          </View>
          <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.text}>Search TIDAL</Text>
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
          <Footer />
        </SafeAreaView>
      </BackgroundAlbumArt>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    width: 250,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo: {
    width: 300,
    height: 60,
  },
})