/**
 * 將數字加上千分位
 * @example addComma(-7855948.9527) => '-7,855,948.9527'
 *
 * @param {string | number} number
 * @returns {string}
 */
export const addComma = (number) => {
  const value = String(number);
  const numberRegExp = new RegExp('^-?\\d+(\\.\\d+)?$');

  if (!numberRegExp.test(value)) return '';

  const [integerPart, decimalPart] = value.split('.');
  const commaRegExp = new RegExp('\\B(?=(\\d{3})+$)', 'g');
  const formattedIntegerPart = integerPart.replace(commaRegExp, ',');

  if (decimalPart) {
    return formattedIntegerPart + '.' + decimalPart;
  }

  return formattedIntegerPart;
};
