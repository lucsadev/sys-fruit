import { FlatList, View, Text } from 'react-native'
import { FlatListHeaderPurchases, ItemPurchase } from '../components'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import tw from '../lib/tailwind'

const PurchasesListingScreen = () => {
  const purchases = useMovementsStore((state) => state.purchases)
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <FlatList
      data={purchases}
      renderItem={({ item }) => (
        <ItemPurchase
          role={profile.role}
          item={item}
        />
      )}
      ListHeaderComponent={FlatListHeaderPurchases}
      stickyHeaderIndices={[0]}
      ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
      keyExtractor={(item) => item.id}
    />
  )
}

export default PurchasesListingScreen
