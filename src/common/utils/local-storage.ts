export const setLocalStorageItem = (key: string, value: string): void => { window.localStorage.setItem(key, value) }

export const getCurrentLocale = (): string | undefined => {
  try {
    const currentLocale = localStorage.getItem('currentLocale')
    if (currentLocale === null) {
      return undefined
    }
    return JSON.parse(currentLocale)
  } catch (e) {
    return undefined
  }
}

export const setCurrentLocale = (currentLocale: string) => {
  localStorage.setItem('currentLocale', JSON.stringify(currentLocale))
}

export const removeLocalStorageItem = (key: string): void => { localStorage.removeItem(key) }

export const getLocalStorageItem = (key: string): string =>
  window.localStorage.getItem(key) || ''

export const setSessionStorageItem = (key: string, value: string) => { window.sessionStorage.setItem(key, value) }

export const getSessionStorageItem = (key: string) =>
  window.sessionStorage.getItem(key) || ''
export const removeSessionStorageItem = (key: string) => { window.sessionStorage.removeItem(key) }
