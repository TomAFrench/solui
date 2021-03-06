import {
  format,
  toDate as toDateOrig,
  parseISO,
} from 'date-fns'

/**
 * Parse given string, number or `Date` into a `Date` instance.
 *
 * @param  {String|Number|Date} d Input date
 * @return {Date}
 */
export const toDate = d => {
  if (typeof d === 'string') {
    return parseISO(d)
  } else {
    return toDateOrig(d)
  }
}

/**
 * Parse given date string, number or Date and return a pretty string
 * representation (format: MMM d, YYYY).
 *
 * @param  {String|Number|Date} d Input date
 * @param  {String} [formatStr] Format, default is MMM d, yyyy
 * @return {String} e.g. _Oct 27, 2019_
 */
export const prettyDate = (d, formatStr = 'MMM d, yyyy') => {
  try {
    return format(toDate(d), formatStr)
  } catch (err) {
    console.error(`Error formatting date: ${d}`, err)
    return ''
  }
}
