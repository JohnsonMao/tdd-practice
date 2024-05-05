export interface AgeGroupPriceListProps {
  onChange: (value: any) => void;
}

type Price = string | number;
type Age = number;
export type AgeGroup = [Age, Age];

export interface Value {
  ageGroup: AgeGroup;
  price: Price;
}
