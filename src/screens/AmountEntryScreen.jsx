import { Text, TouchableOpacity, View } from 'react-native'
import tw from '../lib/tailwind'
import { KEYS } from '../constant'
import { useEffect, useState } from 'react'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '../lib/supabase'
import { WITH_COMBO } from '../lib/env'

const AmountEntryScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState('')
  const [isCombo, setIsCombo] = useState(false)
  const userId = useAuthStore((state) => state.profile.id)
  const { day, getMovements } = useMovementsStore((state) => ({
    getMovements: state.getMovements,
    day: state.id
  }))
  const { typeOfPayment } = route.params
  const toast = useToast()

  const handlePress = (value) => {
    if (value === '🗑️') return setAmount('')
    if (value === '⌫') return setAmount((prev) => (prev = prev.slice(0, -1)))
    if (value === '.' && amount.includes('.')) return
    if (amount.includes('.') && amount.slice(amount.indexOf('.')).length > 2) return

    amount.length < 12 && setAmount((prev) => (prev += value))
  }

  const handleSave = async () => {
    try {
      if (typeOfPayment === 'Cambio en caja') {
        const { error } = await supabase
          .from('movementsOfTheDay')
          .update({ cashChange: amount })
          .eq('id', day)

        if (error) throw error

        getMovements()
        toast.show(`Cambio en caja $${amount}`, { type: 'normal' })
        navigation.goBack()
        return
      }

      if (!userId && !amount && !day) return

      const { error } = await supabase
        .from('sales')
        .insert([{ userId, amount, typeOfPayment, day, isCombo }])

      if (error) throw error

      toast.show(`Venta de $${amount} agregada`, { type: 'success' })
      navigation.goBack()
    } catch (error) {
      toast.show(`Error: operación no realizada`, { type: 'danger' })
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`mb-1 text-2xl text-center text-white md:text-4xl md:mb-4`}>
            Tipo de operación:
          </Text>
          <Text style={tw`text-4xl font-bold text-center text-red-500 md:text-6xl`}>
            {typeOfPayment}
          </Text>
        </View>
      )
    })
  }, [navigation])

  return (
    <View style={tw`w-11/12 mx-auto mt-10`}>
      <View
        style={tw`w-full h-16 overflow-hidden bg-white border border-gray-900 rounded-md md:h-28 md:w-10/12 md:mx-auto`}
      >
        <View style={tw`flex flex-row items-center justify-end w-full h-full p-1`}>
          <Text style={tw`my-auto text-5xl md:text-8xl `}>{amount}</Text>
        </View>
      </View>
      <View style={tw`flex flex-row flex-wrap w-full h-auto mt-5 md:w-10/12 md:mx-auto`}>
        {KEYS.map((el) => (
          <TouchableOpacity
            key={el}
            style={tw`flex items-center justify-center w-1/4 h-24 bg-gray-300 border border-black rounded-md md:h-36`}
            onPress={() => (el === '💾' ? handleSave() : handlePress(el))}
          >
            <Text style={tw`pt-3 text-5xl font-bold text-teal-600 md:text-7xl`}>{el}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {typeOfPayment !== 'Cambio en caja' && WITH_COMBO && (
        <TouchableOpacity
          style={tw`flex flex-row items-center w-1/2 gap-3 mt-5`}
          onPress={() => setIsCombo(!isCombo)}
        >
          <View style={tw`flex justify-center w-6 h-6 border border-black rounded-md`} />
          <Text style={tw`absolute text-3xl -left-1`}>{isCombo ? '✔️' : ''}</Text>

          <Text style={tw`text-lg`}>{isCombo ? 'Es un combo' : 'No es un combo'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
export default AmountEntryScreen
