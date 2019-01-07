
import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, } from 'react-native';
import { Button, InputItem, Flex, WingBlank, Card, ActivityIndicator, WhiteSpace } from '@ant-design/react-native'
import { NavigationDescriptor } from 'react-navigation';
import t, { FormRef, FormType } from 'tcomb-form-native'
import { connect } from 'react-redux';
import { AppState } from '../../models';
import { AppModel } from '../../models/app';
import { Dispatch, UserLogin } from '../../@types';
import { textbox } from '../../components/tcomb-templates/textbox';
import { checkbox } from '../../components/tcomb-templates/checkbox';

// Sobre escribir super tipos
t.String.getValidationErrorMessage = (value, path, context) => {
  return "El campo es requerido"
}
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
  user: UserLogin,
  errors: {
    password: any,
    username: any
  }
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
    },
    errors: {
      password: null,
      username: null
    }
  }

  /**
   * Ref del formulario Login
   */
  private _form: FormRef<FormType>

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
    const options = this.generateOptions()
    return (
      <View style={styles.container}>
        {fetching && <ActivityIndicator toast={true} />}
        <Flex direction={'column'} justify={'center'} style={{ flex: 1 }}>
          <View style={{ width: '80%', maxWidth: 300 }}>
            <FormLogin
              ref={this._form}
              type={FormLoginModel}
              options={options}
              value={this.state.user}
              onChange={this.handleFormChange}
            />
            <Button onClick={this.handleLogin} type={'primary'} activeStyle={false} style={{ elevation: 3 }}>{'Login'}</Button>
            <WhiteSpace />
            <Button onClick={this.handleLogin} type={'primary'} activeStyle={false} style={{ elevation: 3 }}>{'Register'}</Button>
          </View>
        </Flex>
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
    if (!this._form.current) return
    console.log('send login')

    // validar formulario
    const form = this._form.current.validate()
    if (form.isValid()) {
      // si es valido, obtener los valores
      const values = form.value
      // enviar valores *simulación
      this.props.dispatch({
        type: 'app/login',
        payload: values,
        callback: () => {
          this.props.navigation.navigate('App')
        }
      })
    } else {
    }
  }

  /**
   * Genera opciones de los campos del formulario
   */
  private generateOptions() {
    const { fetching } = this.props.app
    const wrapperStyle: ViewStyle = {
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 3
    }
    return {
      // auto: 'placeholders',
      fields: {
        username: {
          template: textbox,
          editable: fetching === false,
          config: {
            //
            wrapperStyle
          },
          placeholder: 'user',
          returnKeyType: 'next',
          onSubmitEditing: () => {
            if (!this._form.current) return

            const nextInput = this._form.current.getComponent('password').refs.input
            nextInput.focus()
          }
        },
        password: {
          template: textbox,
          editable: fetching === false,
          config: {
            type: 'password',
            wrapperStyle
          },
          secureTextEntry: true,
          placeholder: 'pass',
          onSubmitEditing: () => {
            this.handleLogin()
          }
        },
        remember: {
          template: checkbox
        }
      }
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
    backgroundColor: '#F9F0FF',
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
