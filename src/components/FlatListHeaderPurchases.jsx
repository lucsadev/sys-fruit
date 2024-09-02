import { View, Text, StyleSheet } from 'react-native'
import tw from '../lib/tailwind'

FlatListHeaderPurchases = () => (
  <View
    elevation={5}
    style={styles.header}
  >
    <View style={tw`flex flex-row items-center w-full h-6 px-1 md:mb-1`}>
      <Text style={tw`w-[10%] text-xs md:text-base font-bold text-center`}>Op.</Text>
      <Text style={tw`w-[35%] text-xs md:text-base font-bold text-center`}>Descripción</Text>
      <Text
        style={tw`w-[35%] text-right pr-14 text-xs md:text-base font-bold md:text-center md:pl-20`}
      >
        Importe
      </Text>
      <Text style={tw`w-[11%] text-center text-xs md:text-base font-bold`}>Hora</Text>
    </View>
  </View>
)

export default FlatListHeaderPurchases

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    border: 2.9,
    borderColor: 'black',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 1,
    shadowRadius: 7.49
  }
})
