import type { AddCommaType } from './addComma.type';

const commaRegExp = new RegExp('\\B(?=(\\d{3})+$)', 'g');

// TODO: 重構
/**
 * 將金額加上千分位
 * @example addComma(-7855948.9527) => '-7,855,948.9527'
 */
const addComma: AddCommaType = (price) => {
  let value = String(price).replace(/,/g, '');

  if (!/^-?\d+(\.\d+)?$/.test(value)) return '';
  if (/^0\d*/.test(value)) {
    value = String(Number(value));
  }

  const [integerPart, decimalPart] = value.split('.');
  const formattedIntegerPart = integerPart.replace(commaRegExp, ',');

  if (decimalPart) {
    return formattedIntegerPart + '.' + decimalPart;
  }

  return formattedIntegerPart;
}

export default addComma;
