import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { v4 } from 'uuid'
import { userInfo } from './user'
import {
  getSessionStorageItem,
  removeSessionStorageItem
} from './local-storage'
import { CustomerRoutes, StatusCodes } from '../enums'
import { environmentUrl, getHashQueryParams } from './environment'
import { toast } from 'react-toastify'

const axiosInstance = axios.create()

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = ''
    if (
      getSessionStorageItem('manageTripToken') &&
      !config.url?.includes(CustomerRoutes.GET_CUSTOMER_BY_EMAIL) &&
      !config.url?.includes('customeremail')
    ) {
      accessToken = getSessionStorageItem('manageTripToken')
    } else {
      accessToken = userInfo().tokken
    }

    const authorization =
      accessToken && accessToken !== '' ? `Bearer ${accessToken}` : ''

    const headers = {
      'x-correlation-id': v4(),
      Authorization: authorization
    }

    config.headers = headers

    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { response } = error as AxiosError

    if (response?.status === StatusCodes.UNAUTHORIZED) {
      if (response?.data?.value === 'Token Expired') {
        window.location.href = `${environmentUrl()}/my-account/deeplink/signin?ReturnUrl=${encodeURIComponent(
          window.location.href
        )}`
      } else if (response?.data?.message === 'Token is expired') {
        removeSessionStorageItem('manageTripToken')
        window.location.reload()
      }
    } else if (
      [
        StatusCodes.BAD_REQUEST,
        StatusCodes.BAD_GATEWAY,
        StatusCodes.FORBIDDEN,
        StatusCodes.GATEWAY_TIMEOUT,
        StatusCodes.INTERNAL_SERVER_ERROR,
        StatusCodes.SERVICE_UNAVAILABLE,
        StatusCodes.NOT_FOUND
      ].some((item) => item === response?.status)
    ) {
      if (window.location.hash.includes('manage-trip')) {
        const params = getHashQueryParams()
        const lastName = params.lastName
        const confirmationNumber = params.confirmationNumber
        // eslint-disable-next-line no-console
        console.log('Error : ', response)
        toast.error('Something went wrong. Try again.')
        if (lastName && confirmationNumber) {
          window.location.href = `${environmentUrl()}/my-account/#/manage-trip?lastName=${lastName}&confirmationNumber=${confirmationNumber}`
          // window.location.href = `http://localhost:8080/my-account/#/manage-trip?lastName=${lastName}&confirmationNumber=${confirmationNumber}`
        } else {
          window.location.href = `${environmentUrl()}/my-account/#/summary`
        }
      }
    } else {
      toast.error('Something went wrong. Try again.')
      // window.location.href = `${environmentUrl()}`
    }

    return await Promise.reject(response)
  }
)

export const httpRequest = async <T>(
  options: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(options)
    return response.data
  } catch (error) {
    return await Promise.reject(error)
  }
}

export const wpEngineHttpRequest = async <T>(
  options: AxiosRequestConfig
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(options)
    return response.data
  } catch (error) {
    return await Promise.reject(error)
  }
}
