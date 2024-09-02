import { CASH, CREDIT, CUENTA_DNI, DEBIT, MERCADO_PAGO, MODO, TRANSFER } from '../constant'

// images fvBelén
const cash =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/money.android.png'
const dni =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/DNI.android.jpg'
const debit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/debit.android.png'
const credit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/credit.android.png'
const mp =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/credit.android.png'
const transfer =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/transfer.png'
const modo = 'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/modo.png'

/* 
  // images lucas
const cash =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/money.android.png?t=2023-06-08T13%3A59%3A49.362Z'
const dni =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/DNI.android.jpg?t=2023-06-08T14%3A01%3A41.934Z'
const debit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/debit.android.png?t=2023-06-08T14%3A01%3A57.480Z'
const credit =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/credit.android.png?t=2023-06-08T14%3A02%3A18.889Z'
const mp =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/mp.android.png?t=2023-06-08T14%3A02%3A38.174Z'
const transfer =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/transfer.png?t=2023-06-08T14%3A02%3A55.739Z'
const modo =
  'https://fnrggtvnecuajkfgookn.supabase.co/storage/v1/object/public/images/modo.png?t=2023-06-08T14%3A03%3A13.293Z' */

export const itemsTypesSales = [
  {
    name: CASH,
    image: cash
  },
  {
    name: CUENTA_DNI,
    image: dni
  },
  {
    name: DEBIT,
    image: debit
  },
  {
    name: CREDIT,
    image: credit
  },
  {
    name: MERCADO_PAGO,
    image: mp
  },
  {
    name: TRANSFER,
    image: transfer
  },
  {
    name: MODO,
    image: modo
  }
]

export const typeOfPayment = (type) => {
  switch (type) {
    case CUENTA_DNI:
      return dni
    case MERCADO_PAGO:
      return mp
    case DEBIT:
      return debit
    case CREDIT:
      return credit
    case CASH:
      return cash
    case MODO:
      return modo
    case TRANSFER:
      return transfer
  }
}
