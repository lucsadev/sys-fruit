import { View, Text, StyleSheet } from 'react-native'
import tw from '../lib/tailwind'

FlatListHeaderSales = () => (
  <View
    elevation={5}
    style={styles.header}
  >
    <View style={tw`flex flex-row items-center w-full h-6 px-1 md:mb-1`}>
      <Text style={tw`w-[17%] text-xs md:text-base font-bold text-center`}>Operación</Text>
      <Text style={tw`w-[20%] text-xs md:text-base font-bold text-center`}>Usuario</Text>
      <Text
        style={tw`w-[40%] text-right pr-14 text-xs md:text-base font-bold md:text-center md:pl-20`}
      >
        Importe
      </Text>
      <Text style={tw`w-[13%] text-center text-xs md:text-base font-bold`}>Hora</Text>
    </View>
  </View>
)

export default FlatListHeaderSales

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
