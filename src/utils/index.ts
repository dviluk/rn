export { NavigationActions, StackActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const createAction = (type: string) => (payload: any) => ({ type, payload })
