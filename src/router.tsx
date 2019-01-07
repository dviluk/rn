import * as React from 'react'
import { Easing, Animated, BackHandler, Text } from 'react-native'
import {
  createStackNavigator,
  createDrawerNavigator,
  // @ts-ignore no viene en @types/react-navigation
  createAppContainer,
  NavigationActions,
  NavigationStackScreenOptions,
  NavigationState,
  NavigationScreenProps,
  createSwitchNavigator
} from 'react-navigation'

// redux stuff
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
  ReducerState,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
// end redux stuff

// screens
import {
  HelloWorldScreen, HelloWorld2Screen, LoginScreen
} from './screens'

// modals
import {
  ModalTest
} from './modals'

import { Middleware, Reducer } from 'redux';
import { ActivityIndicator } from '@ant-design/react-native';

/**
 * Navigator principal, contiene todas las secciones principales de la app
 *
 */
const MainNavigation = createDrawerNavigator({
  Home: {
    screen: HelloWorldScreen
  },
  HomeScreen: {
    screen: HelloWorld2Screen
  }
})

MainNavigation.navigationOptions = ({ navigation }: NavigationScreenProps): NavigationStackScreenOptions => {
  const { routeName } = navigation.state.routes[navigation.state.index]
  return {
    headerTitle: routeName,
  }
}

/**
 * El contenedor del navigator principal.
 *
 * Sirve para agregar screen en paralelo, como los modales.
 */
const RootNavigation = createStackNavigator(
  {
    Main: {
      screen: MainNavigation
    },
    Modal: {
      screen: ModalTest
    },
  },
  {
    // los modales no tienen Toolbar
    headerMode: 'none',
    // todas las vistas que se agreguen en este navigator actuaran como un modal
    mode: 'modal',
    // iOS, deshabilitar los gestos para navegar
    navigationOptions: {
      gesturesEnabled: false,
    },
    // transicion que tendran todas las vistas
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

const AuthNavigation = createSwitchNavigator(
  {
    Auth: LoginScreen,
    App: RootNavigation
  },
  {
    initialRouteName: 'Auth'
  }
)

/**
 * Reducer para manejar la navegacion
 */
export const routerReducer = createNavigationReducer(AuthNavigation)
export const routerMiddleware = createReactNavigationReduxMiddleware<{ router: any }>(
  'root',
  state => state.router
)
const App = reduxifyNavigator(AuthNavigation, 'root')

interface Props {
  app?: any
  router?: any
  dispatch?: any
}

/**
 * Router de la app.
 *
 * Se encarga de manejar la navegacion.
 *
 */
// @ts-ignore
@connect(({ app, router }) => ({ app, router }))
class Router extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.handleBack = this.handleBack.bind(this)
  }

  public componentWillMount() {
    // crear el listener para encargarse del boton back
    BackHandler.addEventListener('hardwareBackPress', this.handleBack)
  }

  public componentWillUnmount() {
    // eliminar lister al desmontar el componente
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  public render() {
    const { app, dispatch, router } = this.props

    // mostrar 'loading' cuando la app este cargando el estado inicial
    if (app.loading) {
      return <ActivityIndicator toast={app.loading} />
    }

    return (<App dispatch={dispatch} state={router} />)
  }

  /**
   * Se encarga del boton Back
   */
  private handleBack() {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Modal') {
      return true
    }
    if (currentScreen === 'Auth') {
      return false
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }
}

// gets the current screen from navigation state
function getActiveRouteName(navigationState: NavigationState): string | null {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    // @ts-ignore
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default Router
