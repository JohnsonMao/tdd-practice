import type { AddCommaType, InvalidPriceType } from './addComma.type';

const numberRegExp = new RegExp(
  '^(?<integerPart>-?[1-9]\\d*|\\d)(?<decimalPart>(\\.\\d*[1-9])?)$'
);
const findThousandsRegExp = new RegExp('\\B(?=(\\d{3})+$)', 'g');

export const InvalidPrice: InvalidPriceType = 'Invalid Price';

/**
 * 將金額加上千分位
 * @example
 * addComma(-7855948.9527) => '-7,855,948.9527'
 * addComma(127.0.0.1) => 'Invalid Price'
 */
const addComma: AddCommaType = (price) => {
  if (Number.isNaN(price)) return InvalidPrice;

  const value = String(price).trim().replace(/,/g, '');
  const numberExecArray = numberRegExp.exec(value);

  if (!numberExecArray?.groups) return InvalidPrice;

  const { integerPart, decimalPart } = numberExecArray.groups;
  const formattedIntegerPart = integerPart.replace(findThousandsRegExp, ',');

  return `${formattedIntegerPart}${decimalPart}`;
};

export default addComma;
