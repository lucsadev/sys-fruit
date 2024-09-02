import AdminUser from '../screens/AdminUser'
import CashWithdrawals from '../screens/CashWithdrawals'
import CombosSummary from '../screens/CombosSummary'
import DailySummary from '../screens/DailySummary'
import MonthlySummary from '../screens/MonthlySummary'
import MovementsPerDay from '../screens/MovementsPerDay'

// images fvBelén
const retiros =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/CajaRegistradora.png?t=2023-06-13T00%3A23%3A15.272Z'
const dailySummary =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/resumen.png?t=2023-06-13T00%3A23%3A27.583Z'
const monthlySummary =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/resMensual.png'
const users = 'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/users.png'
const calendar =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/calendario.png'
const fruitsAndVegetables =
  'https://tvxaeuiagsyfchgrzbpx.supabase.co/storage/v1/object/public/images/cajaFV.png?t=2023-06-20T22%3A55%3A01.759Z'

export const itemsMenuAdmin = [
  {
    name: 'Retiros de caja',
    image: retiros,
    page: 'cashWithdrawalsScreen',
    screen: CashWithdrawals
  },
  {
    name: 'Resumen del día',
    image: dailySummary,
    page: 'dailySummary',
    screen: DailySummary
  },
  {
    name: 'Resumen mensual',
    image: monthlySummary,
    page: 'monthlySummary',
    screen: MonthlySummary
  },
  {
    name: 'Administración de usuarios',
    image: users,
    page: 'adminUserScreen',
    screen: AdminUser
  },
  {
    name: 'Movimientos por día',
    image: calendar,
    page: 'movementsPerDay',
    screen: MovementsPerDay
  },
  {
    name: 'Combos',
    image: fruitsAndVegetables,
    page: 'combos',
    screen: CombosSummary
  }
]
