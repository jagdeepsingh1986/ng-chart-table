import { NUMERAL_FORMAT, DATE_FORMAT } from '../constants/siteConstants';
import * as moment from 'moment';


/**
 * Format number
 * @param  {number} number
 * @param  {String} suffix
 * @param  {string} format
 */
export const formatNumber = (number, suffix = '', format = NUMERAL_FORMAT) => {
    let nNumeral = number(number);
    if (nNumeral.value()) {
        return nNumeral.format(format) + suffix;
    }
    return number;
};

export function isWeekday(dateValue): boolean {
    const date = moment(dateValue);
    if (date.isValid()) {
      const isWeekday = [0, 6].indexOf(date.toDate().getDay()) !== -1;
      if (isWeekday) {
        return true;
      }
    }
    return false;
  }
