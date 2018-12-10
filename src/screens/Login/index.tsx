
import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, Button } from 'react-native';
import { NavigationDescriptor } from 'react-navigation';
import t, { FormRef, FormType } from 'tcomb-form-native'
import { connect } from 'react-redux';
import { AppState } from '../../models';
import { AppModel } from '../../models/app';
import { Dispatch, UserLogin } from '../../@types';

/**
 * Model del formulario Login
 */
const FormLoginModel = t.struct({
  username: t.String,
  password: t.String,
  remember: t.Boolean,
})

/**
 * Controlador del formulario Login
 */
const FormLogin = t.form.Form

interface Props extends NavigationDescriptor, AppState, Dispatch {
  app: AppModel,
};
interface State {
  user: UserLogin
};
/**
 * Formulario para iniciar sesión.
 */
class LoginScreen extends React.Component<Props, State> {
  public state: State = {
    user: {
      username: '',
      password: '',
      remember: false
    }
  }

  /**
   * Ref del formulario Login
   */
  private _form: FormRef<FormType>

  /**
   * Opciones de los campos del formulario
   */
  private options = {
    // auto: 'placeholders',
    fields: {
      username: {
        returnKeyType: 'next',
        onSubmitEditing: () => {
          if (!this._form.current) return

          const nextInput = this._form.current.getComponent('password').refs.input
          nextInput.focus()
        }
      },
      password: {
        secureTextEntry: true,
        onSubmitEditing: () => {
          this.handleLogin()
        }
      }
    }
  }

  constructor(props: Props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.goToHomeScreen = this.goToHomeScreen.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)

    this._form = React.createRef()

    const user = props.app.user
    if (user && user.remember) {
      props.navigation.navigate('App')
    }
  }

  public render() {
    const fetching = this.props.app.fetching
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <FormLogin
          ref={this._form}
          type={FormLoginModel}
          options={this.options}
          value={this.state.user}
          onChange={this.handleFormChange}
        />
        <Button title={'Login'} disabled={fetching} onPress={this.handleLogin} />
        <Button title={'Screen'} onPress={this.goToHomeScreen} />
      </View>
    );
  }

  private handleFormChange(user: UserLogin) {
    this.setState({ user })
  }

  private goToHomeScreen() {
    this.props.navigation.navigate('App')
  }

  private handleLogin() {
    console.log(this.props)
    if (!this._form.current) return
    console.log('send login')
    const form = this._form.current.getValue()
    const validate = this._form.current.validate()
    console.log('validate', validate)
    if (form) {
      console.log('form.data', form)

      this.props.dispatch({
        type: 'app/login',
        payload: form,
        callback: () => {
          this.props.navigation.navigate('App')
        }
      })
    }
  }
}

const _LoginScreen = connect(
  ({ app }: AppState) => ({
    app
  })
)(LoginScreen)
export default _LoginScreen

interface Style {
  [key: string]: ViewStyle | TextStyle | ImageStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
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
