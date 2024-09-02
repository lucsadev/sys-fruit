import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { itemsTypesSales } from './../items'
import tw from '../lib/tailwind'
import { useEffect } from 'react'
import useMovementsStore from '../stores/movementsStore'
import { supabase } from '../lib/supabase'

const HomeScreen = ({ navigation }) => {
  const { day, getCashWithdrawals, getMovements, getPurchases, getSales } = useMovementsStore(
    (state) => ({
      getMovements: state.getMovements,
      day: state.id,
      getSales: state.getSales,
      getPurchases: state.getPurchases,
      getCashWithdrawals: state.getCashWithdrawals
    })
  )

  useEffect(() => {
    getMovements().catch((error) =>
      Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
    )
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sales'
        },
        () =>
          getSales().catch((error) =>
            Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
          )
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'purchases'
        },
        () =>
          getPurchases().catch((error) =>
            Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
          )
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cashWithdrawals'
        },
        () =>
          getCashWithdrawals().catch((error) =>
            Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
          )
      )
      .subscribe()
    return () =>
      supabase
        .removeChannel(channel)
        .catch((error) => Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }]))
  }, [day])

  return (
    <View style={tw`flex items-center w-full h-full gap-3 p-5 mx-auto md:w-4/5`}>
      {itemsTypesSales.map((item) => (
        <TouchableOpacity
          key={item.name}
          onPress={() => {
            navigation.navigate('AmountEntry', { typeOfPayment: item.name })
          }}
          style={styles.card}
        >
          <Image
            source={{ uri: item.image }}
            resizeMode='contain'
            style={tw`w-2/5 h-14 md:h-24`}
          />
          <Text style={tw`text-2xl font-bold text-[#004c70b7] md:text-5xl`}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: '#000',
    elevation: 5
  }
})
