import { createNativeStackNavigator } from '@react-navigation/native-stack'
import useAuthStore from '../stores/authStore'
import { AdminScreen, NoPermissions } from '../screens'
import { itemsMenuAdmin } from '../items/itemsMenuAdmin'
import { formatDate } from './../lib/formatDate'
import { Text, View } from 'react-native'
import tw from '../lib/tailwind'
import { BG_COLOR } from '../constant'

const { Navigator, Screen } = createNativeStackNavigator()

const StackAdmin = () => {
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: BG_COLOR },
        headerTitle: () => (
          <View>
            <Text style={tw`text-2xl font-bold text-center text-white`}>Administración</Text>
            <Text style={tw`mb-1 text-center text-white md:text-xl`}>{formatDate(Date.now())}</Text>
          </View>
        )
      }}
    >
      <Screen
        name='homeAdmin'
        component={profile.role === 'ADMIN' ? AdminScreen : NoPermissions}
      />
      {itemsMenuAdmin.map((item) => (
        <Screen
          key={item.page}
          name={item.page}
          component={item.screen}
          options={{
            headerTitle: () => (
              <View>
                <Text style={tw`text-2xl font-bold text-center text-white`}>{item.name}</Text>
                <Text style={tw`mb-1 text-center text-white md:text-xl`}>
                  {formatDate(Date.now())}
                </Text>
              </View>
            )
          }}
        />
      ))}
    </Navigator>
  )
}
export default StackAdmin
