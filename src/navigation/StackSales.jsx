import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AmountEntryScreen, HomeScreen } from '../screens'
import { FontAwesome, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { formatDate } from './../lib/formatDate'
import { BackHandler, Text, View } from 'react-native'
import useAuthStore from '../stores/authStore'
import tw from '../lib/tailwind'
import { BG_COLOR } from '../constant'

const { Navigator, Screen } = createNativeStackNavigator()

const StackSales = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout)

  const closeApp = async () => {
    await logout()
    BackHandler.exitApp()
  }

  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: BG_COLOR }
      }}
    >
      <Screen
        name='sales'
        component={HomeScreen}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name='cash-register'
              size={40}
              color='#ef4444'
              style={tw`mr-2`}
              onPress={() =>
                navigation.navigate('AmountEntry', { typeOfPayment: 'Cambio en caja' })
              }
            />
          ),
          headerLeft: () => (
            <SimpleLineIcons
              name='logout'
              size={32}
              color='#ef4444'
              style={tw`ml-2`}
              onPress={closeApp}
            />
          ),
          headerTitle: () => (
            <View style={tw`flex items-center justify-center`}>
              <Text style={tw`text-2xl font-bold text-white`}>Sistema de Ventas</Text>
              <Text style={tw`text-white md:text-xl`}>{formatDate(Date.now())}</Text>
            </View>
          )
        }}
      />
      <Screen
        name='AmountEntry'
        component={AmountEntryScreen}
      />
    </Navigator>
  )
}
export default StackSales
