import { View, Text, ScrollView } from 'react-native'
import useMovementsStore from '../stores/movementsStore'
import tw from '../lib/tailwind'
import { formatPrice } from '../lib/formatPrice'
import {
  PrintDifference,
  PrintTotalsCashWithdrawals,
  PrintTotalsPurchases,
  PrintTotalsSales
} from '../components'

const DailySummary = ({ navigation }) => {
  const { cashAvailable, cashWithdrawals, cashChange, purchases, sales } = useMovementsStore(
    (state) => ({
      cashAvailable: state.cashAvailable,
      cashChange: state.cashChange,
      sales: state.sales,
      cashWithdrawals: state.cashWithdrawals,
      purchases: state.purchases
    })
  )

  return (
    <ScrollView style={tw`w-full`}>
      <View style={tw`flex flex-row items-center justify-between p-2 border-b border-black`}>
        <Text style={tw`text-xl font-semibold md:text-4xl md:m-2`}>Cambio en caja:</Text>
        <Text style={tw`text-xl font-semibold text-red-600 md:text-4xl md:m-2`}>
          {formatPrice(cashChange || 0)}
        </Text>
      </View>

      <PrintTotalsSales sales={sales} />

      <PrintTotalsPurchases purchases={purchases} />

      <PrintTotalsCashWithdrawals cashWithdrawals={cashWithdrawals} />

      <PrintDifference
        sales={sales}
        purchases={purchases}
      />

      <View style={tw`flex flex-row items-center justify-between p-2 border-b-2 border-teal-600`}>
        <Text style={tw`text-2xl font-bold md:text-4xl md:m-2`}>Efectivo en caja</Text>
        <Text style={tw`text-2xl font-bold text-red-500 md:text-4xl md:m-2`}>
          {formatPrice(cashAvailable)}
        </Text>
      </View>
    </ScrollView>
  )
}
export default DailySummary
