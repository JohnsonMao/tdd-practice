import { Interval } from "@/utils/getNumberIntervals/getNumberIntervals.type";

export interface AgeGroupPriceListProps {
  onChange: (value: any) => void;
}

type Price = string | number;

export type AgeGroup = Interval;

export interface Value {
  ageGroup: AgeGroup;
  price: Price;
}
