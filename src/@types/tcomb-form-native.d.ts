declare module "tcomb-form-native" {
  import * as __React from 'react'
  import * as __RN from 'react-native'

  export interface FormRef<T> extends __React.RefObject<T> {}
  
  namespace TcombForm {
    const String: any
    const Boolean: any
    const Number: any
    const Date: any
    namespace form {
      class Form extends __React.Component<{ type: any, options?: any }>{ 
        getComponent(input: string): any
        getValue(): any
        validate(): any
      }
    }
    function struct(fields: { [key: string]: any }): any
    function maybe(type: any): any
    function enums(type: { [key: string]: string | number }): any
  }

  export type FormType = TcombForm.form.Form

  export default TcombForm
}
