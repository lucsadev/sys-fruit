import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import tw from '../lib/tailwind'
import { formatInTimeZone } from 'date-fns-tz'
import { formatPrice } from '../lib/formatPrice'
import { supabase } from '../lib/supabase'
import { AR, CASH } from '../constant'
import { Entypo } from '@expo/vector-icons'

const handleDelete = (purchases) => {
  try {
    Alert.alert('Eliminar', '¿Seguro que desea eliminar la salida?', [
      {
        text: 'No'
      },
      {
        text: 'Si',
        onPress: async () => {
          const { error } = await supabase.from('purchases').delete().eq('id', purchases)
          if (error) throw new Error(error)
        }
      }
    ])
  } catch (error) {
    Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
  }
}

const ItemPurchase = ({ item, role }) => {
  return (
    <View style={tw`flex flex-row items-center w-full h-12 md:h-18`}>
      <Text style={tw`w-[10%] text-center text-xl md:text-5xl md:w-14`}>
        {item.typeOfPayment === CASH ? '💰' : '🪙'}
      </Text>
      <Text style={tw`w-[35%] text-center text-xs md:text-xl`}>{item.description}</Text>
      <Text style={tw`w-[35%] text-base text-center text-red-500 md:text-3xl`}>
        {formatPrice(item.amount)}
      </Text>
      <Text style={tw`w-[11%] text-xs text-center md:text-xl`}>
        {formatInTimeZone(item.created_at, AR, 'HH:mm')}
      </Text>
      {role === 'ADMIN' && (
        <TouchableOpacity
          style={tw`w-[10%]`}
          onPress={() => handleDelete(item.id)}
        >
          <Entypo
            name='trash'
            size={24}
            style={tw`text-center text-red-700`}
            onPress={() => handleDelete(item.id)}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default ItemPurchase

/* 

<View style={tw`flex items-start justify-start w-full h-24 gap-2 p-3 md:h-32`}>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <View>
          <Text style={tw`text-base font-semibold md:text-3xl`}>Descripción</Text>
          <Text style={tw`text-base md:text-3xl`}>{item.description}</Text>
        </View>
        <View>
          <Text style={tw`text-base font-semibold md:text-3xl`}>Importe</Text>
          <Text style={tw`text-base md:text-3xl`}>{formatPrice(item.amount)}</Text>
        </View>
      </View>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <Text style={tw`text-base md:text-3xl`}>
          Hora: {formatInTimeZone(item.created_at, AR, 'HH:mm')}
        </Text>
        <Text style={tw`text-xl w-7 md:text-5xl md:w-14`}>
          {item.typeOfPayment === CASH ? '💰' : '🪙'}
        </Text>
        {role === 'ADMIN' ? (
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 border border-red-500 rounded-md w-30 md:h-12 md:w-44 md:border-2`}
            onPress={async () => {
              const { error } = await supabase.from('purchases').delete().eq('id', item.id)
            }}
          >
            <Text style={tw`font-bold text-red-500 md:text-2xl`}>Eliminar</Text>
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>
    </View>
*/
