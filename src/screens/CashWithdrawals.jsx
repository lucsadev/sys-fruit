import { useRef, useState } from 'react'
import { Alert, View, Text, TextInput, TouchableOpacity } from 'react-native'
import tw from '../lib/tailwind'
import { inputStyle } from '../styles'
import { useToast } from 'react-native-toast-notifications'
import useAuthStore from '../stores/authStore'
import useMovementsStore from '../stores/movementsStore'
import { supabase } from '../lib/supabase'

const CashWithdrawals = ({ navigation }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('Retiro')
  const userId = useAuthStore((state) => state.profile.id)
  const day = useMovementsStore((state) => state.id)
  const cashAvailable = useMovementsStore((state) => state.cashAvailable)
  const getCashWithdrawals = useMovementsStore((state) => state.getCashWithdrawals)
  const inputRef = useRef(null)
  const toast = useToast()

  const save = async () => {
    try {
      if (!amount || !description)
        return toast.show('La descripción y el importe son requeridos', { type: 'warning' })

      if (amount > cashAvailable)
        return Alert.alert('', 'El monto ingresado es mayor que el dinero disponible en caja', [
          { text: 'Aceptar' }
        ])

      const { error } = await supabase
        .from('cashWithdrawals')
        .insert([{ amount, description, userId, day }])

      if (error) throw error

      getCashWithdrawals()
      setAmount('')
      navigation.goBack()

      toast.show('Operación Realizada con éxito', { type: 'success' })
    } catch (error) {
      Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
    }
  }

  return (
    <>
      <View style={tw`items-center w-full gap-3 mx-auto mt-10 md:w-9/12`}>
        <View style={tw`items-center w-11/12`}>
          <Text style={tw`self-start w-full text-lg md:text-2xl`}>Descripción</Text>
          <TextInput
            autoFocus={true}
            enterKeyHint='next'
            enablesReturnKeyAutomatically={true}
            autoCapitalize='words'
            inputMode='text'
            value={description}
            onChangeText={setDescription}
            onSubmitEditing={() => inputRef.current?.focus()}
            style={[inputStyle, tw`w-full pt-1 text-3xl md:h-16`]}
          />
        </View>
        <View style={tw`items-center w-11/12`}>
          <Text style={tw`self-start w-full text-lg md:text-2xl`}>Importe</Text>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            enterKeyHint='done'
            enablesReturnKeyAutomatically={true}
            inputMode='numeric'
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={save}
            style={[inputStyle, tw`w-full pt-1 text-4xl font-bold text-right md:h-16`]}
          />
        </View>
        <TouchableOpacity
          style={tw`flex items-center justify-center w-11/12 bg-[#004d70] rounded-lg h-14 md:h-20`}
          onPress={save}
        >
          <Text style={tw`text-2xl text-white md:text-5xl`}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
export default CashWithdrawals
