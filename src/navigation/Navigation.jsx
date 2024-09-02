import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import useAuthStore from '../stores/authStore'
import { AuthScreen } from '../screens'
import TabNavigation from './TabNavigation'

const { Navigator, Screen } = createNativeStackNavigator()

const Navigation = () => {
  const session = useAuthStore((state) => state.session)

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen
          name='Home'
          component={session ? TabNavigation : AuthScreen}
        />
      </Navigator>
    </NavigationContainer>
  )
}
export default Navigation
