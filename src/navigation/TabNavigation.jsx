import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { itemsTab } from './../items/itemsTab'
import tw from '../lib/tailwind'
import { BG_COLOR } from '../constant'
import useMovementsStore from '../stores/movementsStore'

const { Navigator, Screen } = createBottomTabNavigator()

const TabNavigation = () => {
  const sales = useMovementsStore((state) => state.sales)

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: '#004d70',
        tabBarStyle: { height: 60 },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '9ad6e65a',
        headerTitleAlign: 'center',
        headerShown: false,
        headerStyle: { backgroundColor: BG_COLOR }
      }}
    >
      {itemsTab.map((item) => (
        <Screen
          key={item.title}
          name={item.title}
          component={item.component}
          options={({ navigation: { isFocused } }) => ({
            tabBarIcon: ({ color, size }) => (
              <View style={tw`flex items-center justify-center w-16 h-full`}>
                <Ionicons
                  name={`${item.icon}${isFocused() ? '' : '-outline'}`}
                  color={color}
                  size={size + 10}
                />
              </View>
            ),
            tabBarBadge: item.title === 'Listado de ventas' ? sales?.length : null,
            tabBarBadgeStyle: {
              backgroundColor: '#004c70b7',
              color: '#fff',
              position: 'absolute',
              left: -32
            }
          })}
        />
      ))}
    </Navigator>
  )
}

export default TabNavigation
