import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthStore from '../stores/authStore'
import { PurchasesListingScreen, ShoppingScreen } from '../screens'
import { BG_COLOR } from '../constant'
import { Text, View } from 'react-native'
import { formatDate } from '../lib/formatDate'
import { FontAwesome } from '@expo/vector-icons'
import tw from '../lib/tailwind'

const { Navigator, Screen } = createNativeStackNavigator()

const StackPurchases = ({ navigation }) => {
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: BG_COLOR }
      }}
    >
      <Screen
        name='ShoppingScreen'
        component={ShoppingScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text style={tw`text-2xl font-extrabold text-red-500 md:text-4xl`}>
                Ingreso de salidas
              </Text>
              <Text style={tw`text-center text-white md:text-xl`}>{formatDate(Date.now())}</Text>
            </View>
          ),
          headerRight: () => (
            <FontAwesome
              name='list-alt'
              size={32}
              color='white'
              onPress={() => {
                navigation.navigate('PurchasesListingScreen')
              }}
            />
          )
        }}
      />
      <Screen
        name='PurchasesListingScreen'
        component={PurchasesListingScreen}
        options={{
          headerTitle: () => (
            <View>
              <Text style={tw`text-2xl font-bold text-white md:text-4xl`}>Listado de salidas</Text>
              <Text style={tw`text-center text-white md:text-xl`}>{formatDate(Date.now())}</Text>
            </View>
          )
        }}
      />
    </Navigator>
  )
}
export default StackPurchases
