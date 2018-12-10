import { delay } from '../utils'
import { LoginForm } from '../@types';

export const login = async (payload: LoginForm) => {
  await delay(2000)
  console.log('auth.login', payload)
  return {
    username: payload.username,
    password: payload.password,
    remember: payload.remember
  }
}
