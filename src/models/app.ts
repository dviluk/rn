import { createAction, NavigationActions } from '../utils'
import * as Storage from '../utils/storage'
import * as authService from '../services/auth'
import { UserLogin } from '../@types';

export interface AppModel {
  login: boolean,
  loading: boolean,
  fetching: boolean,
  user: UserLogin | null
}

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
    user: null
  },
  reducers: {
    updateState(state: any, { payload }: any) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action: any, { call, put }: any) {
      const user: UserLogin = yield call(Storage.get, 'user', null)
      yield put(createAction('updateState')({ user, loading: false }))
    },
    *login({ payload, callback }: any, { call, put }: any) {
      // decirle al sistema que comenzara una petición
      yield put(createAction('updateState')({ fetching: true }))
      // petición
      const user = yield call(authService.login, payload)
      // cuando termine la petición se le avisara de nuevo al sistema
      yield put(createAction('updateState')({ user, fetching: false }))

      Storage.set('user', user)

      if (callback) {
        callback()
      }
    },
    *logout({ callback }: any, { call, put }: any) {
      yield call(Storage.set, 'user', null)
      yield put(createAction('updateState')({ user: null }))

      if (callback) {
        callback()
      }
    },
  },
  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({ type: 'loadStorage' })
    },
  },
}


// put: ejecutar acción
// call: llamar servicio
