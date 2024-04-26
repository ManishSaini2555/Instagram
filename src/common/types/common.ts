export interface errorStateType {
  atfAttach?: string | null
  reservationFound?: string | null
  reservationAdded?: string | null
  prefUpdate?: string | null
  cancelFlightStatus?: string | null
  deletePaymentStatus?: string | null
  editPaymentStatus?: string | null
  sendEmailConf?: string | null
  addTravelerStatus?: boolean | null | undefined
}
export interface ApiStatusesType {
  wpBannerApi: boolean | undefined
  flightListApi: boolean | undefined
  flightListPastApi: boolean | undefined
  flightListCancelApi: boolean | undefined
  paymentHistoryApi: boolean | undefined
  paymentMethodsApi: boolean | undefined
  profileDetailsApi: boolean | undefined
  capitalOneApi: boolean | undefined
  calendarDataApi: boolean | undefined
  updateDealStatus: boolean | undefined
  flightCalendarDataDepartApi: boolean | undefined
  flightCalendarDataReturnApi: boolean | undefined
}
export interface Location {
  desPlace: string
  desShorthand: string
  desTime: string
  orgPlace: string
  orgShorthand: string
  orgTime: string
}

export interface Traveler {
  name: string
  ktn: string
  redress: string
  depseat: string
  depcarryBag: number
  depcheckedBag: number
  deppriority: number
  deppet: number
  depwheelchair: boolean
  isReturn: boolean
  retseat: string
  retcarryBag: number
  retcheckedBag: number
  retpriority: number
  retpet: number
  retwheelchair: boolean
  ind: number
}

export interface cartralwerDataType {
  dataSource: {
    language: string
    currency: string
    clientID: string
    passengers: {
      adults: number
      teens: number
      children: number
      infants: number
    }
    flight: {
      legs: [
        {
          key: string
          departure: {
            iata: string
            datetime: string
          }
          arrival: {
            iata: string
            datetime: string
          }
          flightNo: string
        },
        {
          key: string
          departure: {
            iata: string
            datetime: string
          }
          arrival: {
            iata: string
            datetime: string
          }
          flightNo: string
        }
      ]
      class: string
      farePrice: number
    }
    customer: {
      mobile: any
      phone: any
      loyalty: any
    }
  } // end datasource
  //   events: {
  // onReady: function(state, data) {
  // console.info('onReady', state, data);
  // },
  // onProducts: function(state, data) {
  // console.info('onProducts', state, data);
  // },
  // onProduct: function(state, data) {
  // console.info('onProduct', state, data);
  // },
  // onBasket: function(state, data) {
  // console.info('onBasket', state, data);
  // },
  // onDestroy: function(state, data) {
  // console.info('onDestroy', state, data);
  // },
  // onError: function(state, data) {
  // console.info('onError', state, data);
  // }
  // }
}
