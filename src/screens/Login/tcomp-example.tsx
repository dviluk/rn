import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle, ImageStyle, Button } from 'react-native';
import { NavigationDescriptor } from 'react-navigation';
import t, { FormRef } from 'tcomb-form-native'

const FormLoginModel = t.struct({
  name: t.String,
  surname: t.maybe(t.String),
  age: t.Number,
  rememberMe: t.Boolean,
  birthDate: t.Date,
  gender: t.enums({
    1: 'Male',
    2: 'Female'
  })
})

const FormLogin = t.form.Form
type FormLogin = t.form.Form


interface Props extends NavigationDescriptor { };
interface State {
  username: string
  password: string
};

class LoginScreen extends React.Component<Props, State> {
  public state: State = {
    username: '',
    password: ''
  }

  private _form: FormRef<FormLogin>

  private options = {
    // auto: 'placeholders',
    fields: {
      name: {
        returnKeyType: 'next',
        onSubmitEditing: () => {
          if(!this._form.current){
            return
          }
          const ageInput = this._form.current.getComponent('age').refs.input
          // ageInput.setNativeProps(({
          //   returnKeyType: 'next'
          // }))
          ageInput.focus()
          console.log(ageInput)
        }
      },
      birthDate: {
        label: 'Fecha de Nacimiento:',
        help: 'AAA',
        error: 'La fecha es requerida',
        mode: 'date', // display the Date field as a DatePickerAndroid,
        config: {
          format: (date: Date) => {
            return date.getDay()
          }
        }
      }
    }
  }

  public constructor(props: Props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.goToHomeScreen = this.goToHomeScreen.bind(this)

    this._form = React.createRef()
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <FormLogin
          ref={this._form}
          type={FormLoginModel}
          options={this.options}
        />
        <Button title={'Login'} onPress={this.handleLogin} />
        <Button title={'Screen'} onPress={this.goToHomeScreen} />
      </View>
    );
  }

  private goToHomeScreen() {
    this.props.navigation.navigate('App')
  }

  private handleLogin() {
    console.log('send login')

    if(!this._form.current){
      return
    }
    
    const form = this._form.current.getValue()
    const validate = this._form.current.validate()
    console.log('validate', validate)
    if (form) {
      console.log(form)
    }
  }

}

export default LoginScreen

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
