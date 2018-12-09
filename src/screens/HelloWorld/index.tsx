import * as React from 'react';
import { Platform, StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, Button } from 'react-native';
import { NavigationDescriptor } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props extends NavigationDescriptor { };

class HelloWorldScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.goToHomeScreen = this.goToHomeScreen.bind(this)
    this.goToModal = this.goToModal.bind(this)
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title={'Modal'} onPress={this.goToModal} />
        <Button title={'Screen'} onPress={this.goToHomeScreen} />
      </View>
    );
  }

  private goToModal() {
    this.props.navigation.navigate('Modal')
  }

  private goToHomeScreen() {
    this.props.navigation.navigate('HomeScreen')
  }
}

export default HelloWorldScreen

interface Style {
  [key: string]: ViewStyle | TextStyle | ImageStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
