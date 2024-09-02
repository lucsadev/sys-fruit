import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from '../lib/tailwind'
import { itemsMenuAdmin } from '../items/itemsMenuAdmin'
import { WITH_COMBO } from '../lib/env'

const AdminScreen = ({ navigation }) => {
  return (
    <View style={tw`flex flex-row flex-wrap justify-between w-11/12 gap-3 mx-auto mt-3`}>
      {itemsMenuAdmin.map((item) => {
        if (item.name === 'Combos' && !WITH_COMBO) return null
        return (
          <TouchableOpacity
            key={item.name}
            style={tw`w-[48%] flex justify-center h-40 border border-black rounded-lg md:h-60`}
            onPress={() => {
              navigation.navigate(item.page)
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={tw`mx-auto rounded-lg h-3/5 md:h-[60%] w-[45%]`}
            />
            <Text style={tw`w-full text-lg text-center md:text-2xl`}>{item.name}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default AdminScreen
