export const environmentUrl = () => {
  const url = window.location.origin
  if (url == 'http://localhost:8080') return 'https://uat.aveloair.com'
  // else if (url == "https://beta.aveloair.com")
  //   return "https://beta.aveloair.com";
  return url
}
export const environmentApiUrl = () => {
  const url = window.location.origin
  if (url == 'http://localhost:8080') {
    return 'http://localhost:7034/manage/v1.0/api'
  }
  // else if (url == "https://beta.aveloair.com")
  //   return "https://aveloair.com/manage/v1.0/api";

  return `${url}/manage/v1.0/api`
}

export const isProduction = () => {
  const url = window.location.origin
  if (
    url === 'https://beta.aveloair.com' ||
    url === 'https://aveloair.com' ||
    url === 'https://www.aveloair.com' ||
    url === 'https://www.beta.aveloair.com'
  ) {
    return true
  } else return false
}

export const environmentBraintree = () => {
  const envUrl = window.location.origin

  if (
    envUrl === 'https://beta.aveloair.com' ||
    envUrl === 'https://aveloair.com' ||
    envUrl === 'https://www.aveloair.com' ||
    envUrl === 'https://www.beta.aveloair.com'
  ) {
    return 'production_38gjg7xc_tz8vz77f2f7ptc7q'
  } else return 'sandbox_ndcc597j_fjgw4gf3c8bgtq7k'
}

export const environmentCarTrawlerURL = () => {
  const envUrl = window.location.origin

  if (
    envUrl === 'https://beta.aveloair.com' ||
    envUrl === 'https://aveloair.com' ||
    envUrl === 'https://www.aveloair.com' ||
    envUrl === 'https://www.beta.aveloair.com'
  ) {
    return 'https://product-router.cartrawler.com'
  } else return 'https://product-router.preview.cartrawler.com'
}

export const wpApiId = () => {
  const envUrl = window.location.origin
  if (
    envUrl === 'https://dev.aveloair.com' ||
    envUrl === 'http://localhost:8080' ||
    envUrl === 'https://www.dev.aveloair.com'
  ) {
    return {
      CapitalOne: '4787',
      atfFaq: '4788',
      placement: '4780',
      addOnsBuySave: '4874',
      carryOnBag: '4856',
      checkedBag: '4858',
      carRental: '4853',
      hotelBlock: '4854',
      loggedInTopBanner: '4887',
      notLoggedInTopBanner: '4889',
      ancCarryOnBag: '4823',
      ancCheckedBag: '4822',
      ancSeats: '4821',
      ancPriorityBoarding: '4820'
    }
  } else if (
    envUrl === 'https://uat.aveloair.com' ||
    envUrl === 'https://www.uat.aveloair.com'
  ) {
    return {
      CapitalOne: '5390',
      atfFaq: '5389',
      placement: '5419',
      addOnsBuySave: '5403',
      carryOnBag: '5384',
      checkedBag: '5383',
      carRental: '5387',
      hotelBlock: '5385',
      loggedInTopBanner: '5381',
      notLoggedInTopBanner: '5379',
      ancCarryOnBag: '5412',
      ancCheckedBag: '5414',
      ancSeats: '5415',
      ancPriorityBoarding: '5416'
    }
  } else if (
    envUrl === 'https://beta.aveloair.com' ||
    envUrl === 'https://aveloair.com' ||
    envUrl === 'https://www.aveloair.com' ||
    envUrl === 'https://www.beta.aveloair.com'
  ) {
    return {
      CapitalOne: '5482',
      atfFaq: '5843',
      placement: '5841',
      addOnsBuySave: '5840',
      carryOnBag: '5837',
      checkedBag: '5836',
      carRental: '5839',
      hotelBlock: '5838',
      loggedInTopBanner: '5835',
      notLoggedInTopBanner: '5834',
      ancCarryOnBag: '5844',
      ancCheckedBag: '5845',
      ancSeats: '5847',
      ancPriorityBoarding: '5848'
    }
  }
}

export function getHashQueryParams () {
  const hash = window.location.hash
  const queryParamsIndex = hash.indexOf('?')
  if (queryParamsIndex === -1) return {}

  const queryString = hash.substring(queryParamsIndex + 1)
  const params = {}
  const regex = /([^&=]+)=([^&]*)/g
  let m
  while ((m = regex.exec(queryString)) !== null) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }
  return params
}
