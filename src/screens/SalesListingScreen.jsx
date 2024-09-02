import { FlatList, Text, View } from 'react-native'
import { FlatListHeaderSales, ItemSale } from '../components'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import tw from '../lib/tailwind'
import { useEffect } from 'react'

const SalesListingScreen = ({ navigation }) => {
  const sales = useMovementsStore((state) => state.sales)
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={tw`mb-2 text-2xl font-bold text-center text-white md:text-4xl`}>
          Listado de ventas
        </Text>
      )
    })
  }, [navigation])

  return (
    <FlatList
      data={sales}
      renderItem={({ item }) => (
        <ItemSale
          role={profile.role}
          item={item}
        />
      )}
      ListHeaderComponent={FlatListHeaderSales}
      ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
      keyExtractor={(item) => item.id}
    />
  )
}

export default SalesListingScreen
