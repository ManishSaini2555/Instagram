export const getKeyFromCookies = (document: any) => {
  const inputString = document?.cookie
  const pairs = inputString.split('; ')
  const keyValuePairs: any = {}
  pairs.forEach((pair) => {
    const [key, value] = pair.split('=')
    keyValuePairs[key] = value
  })
  return keyValuePairs
}
