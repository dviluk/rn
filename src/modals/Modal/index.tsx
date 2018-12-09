import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, Button } from 'react-native';
import { NavigationActions, NavigationDescriptor } from 'react-navigation';

interface Props extends NavigationDescriptor { };

class ModalModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  public componentDidMount() {
    const hello = 'je;;p'
    console.log(hello)
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Modal</Text>
        <Button title={'Close'} onPress={this.handleClose} />
      </View>
    );
  }

  private handleClose() {
    this.props.navigation.dispatch(NavigationActions.back())
  }
}

export default ModalModal

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
});
