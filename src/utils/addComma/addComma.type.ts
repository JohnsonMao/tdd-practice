export type InvalidPriceType = 'Invalid Price';

export type AddCommaType = (
  price: string | number
) => string | InvalidPriceType;

export interface NumberExecArray extends RegExpExecArray {
  
}
