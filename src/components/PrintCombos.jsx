import { View, Text } from 'react-native'
import tw from '../lib/tailwind'
import { formatPrice } from '../lib/formatPrice'
import { total, totals } from '../lib/totals'

const PrintCombos = ({ sales }) => {
  const salesCombos = sales.filter((el) => el.isCombo)
  const totalsSales = totals(salesCombos)

  return (
    <View style={tw`flex gap-1 p-2 border-b-2 border-teal-600`}>
      <View style={tw`flex flex-row items-center justify-between border-b border-black`}>
        <Text style={tw`font-semibold md:text-2xl`}>T.Operación</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Cantidad</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Importe</Text>
      </View>
      {Object.keys(totalsSales).map((el) => (
        <View
          key={el}
          style={tw`flex flex-row items-center justify-between`}
        >
          <Text style={tw`w-[45%] text-lg font-semibold md:text-2xl`}>{el}</Text>
          <Text style={tw`w-[15%] text-lg font-semibold text-center md:text-2xl`}>
            {totalsSales[el].quantity}
          </Text>
          <Text style={tw`w-[40%] text-right text-lg font-semibold text-red-600 md:text-2xl`}>
            {formatPrice(totalsSales[el].amount)}
          </Text>
        </View>
      ))}
      <View style={tw`flex flex-row items-center border-t border-black`}>
        <Text style={tw`w-[45%] text-xl font-bold md:text-3xl`}>Total de ventas</Text>
        <Text style={tw`w-[15%] text-center text-lg font-bold text-green-500 md:text-2xl`}>
          {salesCombos.length}
        </Text>
        <Text style={tw`w-[40%] text-xl text-right font-bold text-red-500 md:text-3xl`}>
          {formatPrice(total(salesCombos))}
        </Text>
      </View>
    </View>
  )
}

export default PrintCombos
