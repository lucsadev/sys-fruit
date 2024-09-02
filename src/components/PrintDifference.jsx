import { View, Text } from 'react-native'
import { formatPrice } from '../lib/formatPrice'
import { total } from '../lib/totals'
import tw from '../lib/tailwind'

const PrintDifference = ({ sales, purchases }) => {
  return (
    <View style={tw`flex flex-row items-center justify-between p-2 border-b-2 border-teal-600`}>
      <Text style={tw`text-lg font-bold md:text-3xl`}>Diferencia ( ventas y salidas )</Text>
      <Text style={tw`text-lg font-bold text-red-500 md:text-3xl`}>
        {formatPrice(total(sales) - total(purchases))}
      </Text>
    </View>
  )
}

export default PrintDifference
