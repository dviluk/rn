declare module "tcomb-form-native" {
  import * as __React from 'react'
  import * as __RN from 'react-native'

  export interface FormRef<T> extends __React.RefObject<T> { }

  namespace TcombForm {
    const String: {
      getValidationErrorMessage: (value: any, path: any, context: any) => string
    }
    const Boolean: any
    const Number: any
    const Date: any
    namespace form {
      class Form extends __React.Component<{ type: any, options?: any, value?: any, onChange?: (form: any) => void }>{
        public getComponent(input: string): any
        public getValue(): any
        public validate(): any
      }
    }
    function struct(fields: { [key: string]: any }): any
    function maybe(type: any): any
    function enums(type: { [key: string]: string | number }): any
  }

  export type FormType = TcombForm.form.Form

  export default TcombForm
}
