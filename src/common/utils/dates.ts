import moment from 'moment'

export const getDateYYYYDDMM = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  return new Date(year, month - 1, day)
}

export const convertStringToDate = (dateString: string) => {
  const dateParts = dateString.split('-')
  const year = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1
  const day = parseInt(dateParts[2])

  const dateObject = new Date(year, month, day)

  const formattedDate = `${dateObject.getFullYear()}-${String(
    dateObject.getDate()
  ).padStart(2, '0')}-${String(dateObject.getMonth() + 1).padStart(2, '0')}`

  return formattedDate
}

export const formatDateInIntervals = (
  date1: string,

  date2: string,
  year?: boolean,
  isReturnFlight?: boolean
) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  if (date1 && date2) {
    const start = moment(date1)
    const end = moment(date2)

    const startMonth = months[start.month()]
    const startDay = start.date()
    const startYear = start.year()

    const endMonth = months[end.month()]
    const endDay = end.date()
    const endYear = end.year()
    if (year) {
      if (startDay === endDay && startMonth === endMonth) {
        if (startYear === endYear) {
          return `${startMonth} ${startDay}, ${startYear}`
        } else {
          return `${startMonth} ${startDay}, ${startYear}-${startMonth} ${startDay}, ${endYear}`
        }
      } else if (startMonth === endMonth) {
        if (startYear === endYear) {
          return `${startMonth} ${startDay}-${endDay}, ${endYear}`
        } else {
          return `${startMonth} ${startDay}, ${startYear}-${startMonth} ${startDay}, ${endYear}`
        }
      } else {
        if (startYear === endYear) {
          return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${startYear}`
        } else {
          return `${startMonth} ${startDay}, ${startYear}-${endMonth} ${endDay}, ${endYear}`
        }
      }
    } else {
      if (startDay === endDay && startMonth === endMonth && !isReturnFlight) {
        return `${startMonth} ${startDay}`
      } else if (
        startDay === endDay &&
        startMonth === endMonth &&
        isReturnFlight
      ) {
        return `${startMonth} ${startDay}-${startMonth} ${startDay}`
      } else if (
        startMonth === endMonth &&
        isReturnFlight &&
        startDay !== endDay
      ) {
        return `${startMonth} ${startDay}-${endDay}`
      } else if (
        startDay !== endDay &&
        startMonth !== endMonth &&
        startYear !== endYear &&
        isReturnFlight
      ) {
        return `${startMonth} ${startDay}, ${startYear}-${endMonth} ${endDay}, ${endYear}`
      } else {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}`
      }
    }
  }
  return ''
}
export const getExpiryDateFormat = (date: string) => {
  if (date) {
    const parts = date.split('-')
    const year = parts[0]
    const month = parts[1].padStart(2, '0')

    return `${month}/${year.slice(-2)}`
  }
  return ''
}

export const getDuration = (duration: string) => {
  let result = ''
  if (
    duration &&
    duration &&
    duration.includes(' h') &&
    duration.includes(' m')
  ) {
    result =
      duration.slice(0, duration.indexOf('h') - 1) +
      'h ' +
      duration.slice(duration.indexOf('h') + 1, duration.indexOf('m') - 1) +
      'm'
    return result
  } else return duration
}

export const mergeDateAndTime = (date: string) => {
  // const [datePart, timePart] = date.split(" ");
  const datePart = date.split(' ')[0]
  const timePart = `${date.split(' ')[1]} ${date.split(' ')[2]}`
  const [hoursString, minutes] = timePart.split(':')

  const [year, month, day] = datePart.split('-')
  const parsedMonth = parseInt(month, 10) - 1 // Adjust month value (0-based index)
  const isPM = timePart.includes('PM')
  let hours = parseInt(hoursString, 10)
  if (isPM && hours !== 12) {
    hours += 12 // Convert to 24-hour format
  } else if (!isPM && hours === 12) {
    hours = 0 // Midnight
  }

  const formattedDate = new Date(
    Date.UTC(
      parseInt(year, 10),
      parsedMonth,
      parseInt(day, 10),
      hours,
      parseInt(minutes, 10)
    )
  ).toISOString()
  return formattedDate
}

export const checkIfCardExpired = (expiryDate: string) => {
  const currentDate = new Date()
  const [year, month] = expiryDate.split('-')
  const cardExpiry = new Date(parseInt(year, 10), parseInt(month, 10) - 1)

  // Set the time to the end of the last day of the month
  cardExpiry.setHours(23, 59, 59, 999)

  return currentDate > cardExpiry
}
export const twoDigitsDate = (date: string) => {
  if (date) {
    const [, month, day] = date.split('-')
    return `${month}/${day}`
  }
  return ''
}

export const getFormattedDateForCalendarInput = (
  inputDate: string
): { day: string, date: string, dateTxt: string, month: string } => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  if (inputDate) {
    // const dateObject = new Date(inputDate);
    const dayOfWeek = moment(inputDate).day()
    const date = moment(inputDate).format('DD')
    const month = moment(inputDate).format('MMM')

    return {
      day: days[dayOfWeek],
      date: `${date} ${month}`,
      dateTxt: date.toString(),
      month
    }
  }
  return { day: '', date: '', dateTxt: '', month: '' }
}

export const getMonthHeaderContent = (inputDate: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  if (inputDate && inputDate.length > 0) {
    const [year, monthIndex] = inputDate.split('-')
    const monthName = months[parseInt(monthIndex, 10) - 1] // Months are 0-indexed

    return `${monthName} ${year}`
  }
  return ''
}

export const formatDateToYYYYMMDD = (inputDate: string) => {
  const year = moment(inputDate).format('YYYY-MM-DD')
  // const month = moment(inputDate).format("MM"); // Months are 0-indexed
  // const day = moment(inputDate).format("DD");

  return year
}
export const getMonthNameByIndex = (index: number) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return months[index]
}
export const getIndexOfMonth = (month: string) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return months.indexOf(month)
}

/**
 *
 * @param dateStr : example date "2023-10-15"
 * @param timeStr : example time "09:40 AM"
 * @returns ISO format date string
 */
export const getISODateTime = (dateStr: string, timeStr: string) => {
  // Combine the date and time strings into a single datetime string
  const datetimeString = dateStr + ' ' + timeStr

  // Parse the combined string into a Moment.js object
  const momentObj = moment(datetimeString, 'YYYY-MM-DD hh:mm A')

  // Convert the Moment.js object to an ISO date-time string
  const isoDateTimeString = momentObj.toISOString()

  return isoDateTimeString
}

/**
 * @startDateISO: should be ISO format : "2023-10-16T12:00:00Z"
 * @endDateISO: should be ISO format : "2023-10-16T12:00:00Z"
 */
export const getTimeDifferenceHours = (
  startDateISO: string,
  endDateISO: string
) => {
  // Parse the date strings into Moment.js objects
  const date1 = moment(startDateISO)
  const date2 = moment(endDateISO)

  // Calculate the time difference in hours
  const hoursDifference = date2.diff(date1, 'hours')

  return hoursDifference
}

/**
 *
 * @param time : example time "09:40 AM"
 * @returns time: example time "9:40 AM"
 */
export const getFormattedTime = (time: string) => {
  const updatedTimeString = time.startsWith('0') ? time.slice(1) : time

  return updatedTimeString
}
export const calculateMonthsDifference = (
  month1: any,
  year1: any,
  month2: any,
  year2: any
) => {
  const startDate = moment(`${year1}-${month1}`, 'YYYY-MM')
  const endDate = moment(`${year2}-${month2}`, 'YYYY-MM')

  return endDate.diff(startDate, 'months')
}
