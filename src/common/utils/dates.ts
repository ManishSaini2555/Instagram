import moment from 'moment'

export const currentDateIsoFormat = () => {
  return moment().toISOString()
}

export const isoToMomentDate = (isoDate: string) => {
  return moment(isoDate)
}

export const displayDifferenceInterval = (isoDate: string) => {
  const currentDate = moment()
  const anotherDate = moment(isoDate)
  const differenceInMinutes = currentDate.diff(anotherDate, 'minutes')
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minute${
      differenceInMinutes === 1 ? '' : 's'
    } ago`
  } else {
    const differenceInHours = Math.floor(differenceInMinutes / 60)
    if (differenceInHours < 24) {
      return `${differenceInHours} hour${
        differenceInHours === 1 ? '' : 's'
      } ago`
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24)
      if (differenceInDays < 7) {
        return `${differenceInDays} day${differenceInDays === 1 ? '' : 's'} ago`
      } else {
        const differenceInWeeks = Math.floor(differenceInDays / 7)
        return `${differenceInWeeks} week${
          differenceInWeeks === 1 ? '' : 's'
        } ago`
      }
    }
  }
}
