import { Alert, View, Text, ScrollView } from 'react-native'
import tw from '../lib/tailwind'
import { Entypo } from '@expo/vector-icons'
import Select from 'react-native-select-dropdown'
import { AR, months } from './../constant'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { formatInTimeZone } from 'date-fns-tz'
import { PrintDifference, PrintTotalsPurchases, PrintTotalsSales } from '../components'

const years = Array.from({ length: 50 }, (_, index) => index + 2023)

const getMovementsOfTheMonth = async (date) => {
  try {
    const { data, error } = await supabase
      .from('movementsOfTheDay')
      .select(
        `    
    sales (
      amount,typeOfPayment
    ),
    purchases (
      amount,typeOfPayment
    )
  `
      )
      .like('date', `%-${date}`)
    if (error) throw new Error(error)
    return data
  } catch (error) {
    Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
  }
}

const MonthlySummary = ({ navigation }) => {
  const [date, setDate] = useState(formatInTimeZone(Date.now(), AR, 'MM-yyyy'))
  const [salesOfTheMonth, setSalesOfTheMonth] = useState([])
  const [purchasesOfTheMonth, setPurchasesOfTheMonth] = useState([])

  useEffect(() => {
    setSalesOfTheMonth([])
    setPurchasesOfTheMonth([])
    getMovementsOfTheMonth(date).then((data) =>
      data?.forEach((el) => {
        el.sales?.length && setSalesOfTheMonth((prev) => [...prev, ...el.sales])
        el.purchases?.length && setPurchasesOfTheMonth((prev) => [...prev, ...el.purchases])
      })
    )
  }, [date])

  return (
    <>
      <View>
        <View style={tw`flex flex-row items-center justify-evenly`}>
          <Select
            data={months}
            defaultButtonText='Seleccionar Mes'
            onSelect={(_sel, index) => {
              const str = String(index + 1) + date.substring(date.indexOf('-'))
              setDate(str.padStart(7, 0))
            }}
            defaultValueByIndex={Number(date.slice(0, 2)) - 1}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonStyle={tw`w-40 h-8 mb-2 bg-transparent border-b border-black md:h-10 md:w-56`}
            buttonTextStyle={tw`font-bold md:text-3xl`}
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
          <Select
            data={years}
            defaultButtonText='Seleccionar Año'
            defaultValueByIndex={years.indexOf(Number(date.slice(3)))}
            onSelect={(selectedItem) =>
              setDate((prev) => prev.substring(0, prev.indexOf('-')) + '-' + selectedItem)
            }
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonStyle={tw`w-40 h-8 mb-2 bg-transparent border-b border-black md:h-10 md:w-56`}
            buttonTextStyle={tw`font-bold md:text-3xl`}
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
      </View>
      <ScrollView>
        <PrintTotalsSales sales={salesOfTheMonth} />

        <PrintTotalsPurchases purchases={purchasesOfTheMonth} />

        <PrintDifference
          sales={salesOfTheMonth}
          purchases={purchasesOfTheMonth}
        />
      </ScrollView>
    </>
  )
}

export default MonthlySummary
