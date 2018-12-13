
import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, } from 'react-native';
import { Button, InputItem, Flex, WingBlank, Card } from 'antd-mobile-rn'
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

  /**
   * Opciones de los campos del formulario
   */
  private options = {
    // auto: 'placeholders',
    fields: {
      username: {
        template: textbox,
        error: this.state.errors.username,
        config: {
          //
        },
        placeholder: 'username',
        returnKeyType: 'next',
        onSubmitEditing: () => {
          if (!this._form.current) return

          const nextInput = this._form.current.getComponent('password').refs.input
          nextInput.focus()
        }
      },
      password: {
        template: textbox,
        error: this.state.errors.username,
        config: {
          type: 'password'
        },
        secureTextEntry: true,
        onSubmitEditing: () => {
          this.handleLogin()
        }
      },
      remember: {
        template: checkbox
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
    const options = this.generateOptions()
    return (
      <View style={styles.container}>
        <Flex direction={'column'} justify={'center'} style={{ backgroundColor: 'gray', flex: 1 }}>
          <View style={{ width: '80%', maxWidth: 300 }}>
            <Card>
              <FormLogin
                ref={this._form}
                type={FormLoginModel}
                options={options}
                value={this.state.user}
                onChange={this.handleFormChange}
              />
            </Card>
            <Flex>
              <Flex.Item>
                <Button disabled={fetching} onClick={this.handleLogin} type={'primary'} activeStyle={false}>{'Login'}</Button>
              </Flex.Item>
              <Flex.Item>
                <Button onClick={this.goToHomeScreen} >{'Screen'}</Button>
              </Flex.Item>
            </Flex>
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

  private generateOptions() {
    const { fetching } = this.props.app
    return {
      // auto: 'placeholders',
      fields: {
        username: {
          template: textbox,
          editable: fetching === false,
          config: {
            //
          },
          placeholder: 'username',
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
            type: 'password'
          },
          secureTextEntry: true,
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
