import StackAdmin from '../navigation/StackAdmin'
import StackPurchases from '../navigation/StackPurchases'
import StackSales from '../navigation/StackSales'
import { SalesListingScreen } from '../screens'

export const itemsTab = [
  {
    title: 'Ventas',
    icon: 'home',
    component: StackSales
  },
  {
    title: 'Listado de ventas',
    icon: 'list',
    component: SalesListingScreen
  },
  {
    title: 'Salidas',
    icon: 'cart',
    component: StackPurchases
  },
  {
    title: 'Administración',
    icon: 'ellipsis-horizontal',
    component: StackAdmin
  }
]
