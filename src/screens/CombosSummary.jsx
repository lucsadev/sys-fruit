import { Alert, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Fontisto, Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import { supabase } from '../lib/supabase'
import { AR } from '../constant'
import Select from 'react-native-select-dropdown'
import useUsersStore from '../stores/userStore'
import tw from '../lib/tailwind'
import { PrintCombos } from '../components'

const getMovements = async (date) => {
  try {
    const { data, error } = await supabase
      .from('movementsOfTheDay')
      .select(
        `    
    sales (
      amount,typeOfPayment,userId,isCombo,id
    )
  `
      )
      .eq('date', date)
    if (error) throw new Error(error)
    return data
  } catch (error) {
    Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
  }
}

const CombosSummary = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [day, setDay] = useState(formatInTimeZone(Date.now(), AR, 'dd-MM-yyyy'))
  const [sales, setSales] = useState([])
  const getUsers = useUsersStore((state) => state.getUsers)
  const [users, setUsers] = useState([{ name: 'Todos', id: '' }])
  const [filterUser, setFilterUser] = useState('')

  useEffect(() => {
    setUsers([{ name: 'Todos', id: '' }])
    getUsers().then((list) => {
      let listUsers = list.map((el) => ({ name: el.username, id: el.id }))
      setUsers((prev) => [...prev, ...listUsers])
    })
  }, [])

  useEffect(() => {
    setSales([])
    getMovements(day)
      .then((data) => {
        data?.forEach((el) => {
          if (el.sales?.length) {
            const sales = filterUser
              ? el.sales?.reduce((acc, val) => {
                  if (val.userId === filterUser) acc = [...acc, val]
                  return acc
                }, [])
              : el.sales
            setSales(sales)
          }
        })
      })
      .catch((error) => Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }]))
  }, [day, filterUser])

  return (
    <SafeAreaView>
      <View>
        <View style={tw`flex flex-row mb-3 justify-evenly`}>
          <TouchableOpacity
            style={tw`flex flex-row items-center self-center justify-between w-3/5 border-b border-black md:w-1/2`}
            onPress={() => setDatePickerVisibility(true)}
          >
            <TextInput
              value={formatInTimeZone(
                day.split('-').reverse().join('-'),
                AR,
                "eeee, dd ' de' MMMM yyyy",
                {
                  locale: es
                }
              )}
              style={tw`mb-1 font-bold text-orange-800 md:text-2xl`}
              editable={false}
            />
            <Fontisto
              name='date'
              size={22}
              color='black'
            />
          </TouchableOpacity>
          <Select
            data={users}
            onSelect={(sel) => setFilterUser(sel.id)}
            defaultButtonText='Seleccionar usuario'
            defaultValueByIndex={0}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item, index) => item.name}
            buttonStyle={tw`h-8 bg-transparent border-b border-black w-30 md:h-10 md:w-40`}
            buttonTextStyle={tw`text-sm font-bold md:text-3xl`}
            dropdownStyle={tw`rounded-lg`}
            rowStyle={tw`h-7 md:h-10`}
            rowTextStyle={tw`text-sm font-bold md:text-2xl`}
            selectedRowStyle={tw`bg-teal-600`}
            selectedRowTextStyle={tw`font-bold text-white`}
            renderDropdownIcon={(isOpened) => {
              return (
                <Entypo
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#000'}
                  size={18}
                />
              )
            }}
            dropdownIconPosition={'right'}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={(date) => {
            setDatePickerVisibility(false)
            setDay(formatInTimeZone(date, AR, 'dd-MM-yyyy'))
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
      <ScrollView>
        <PrintCombos sales={sales} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CombosSummary
