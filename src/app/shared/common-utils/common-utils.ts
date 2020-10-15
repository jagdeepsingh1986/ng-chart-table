import { NUMERAL_FORMAT } from '../constants/siteConstants';



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