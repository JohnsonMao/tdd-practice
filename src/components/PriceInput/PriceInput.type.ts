import type { Target } from "@/types";

export interface PriceInputProps {
  name: string;
  value: number | string;
  onChange?: (event: { target: Target<number | string> }) => void;
  errorMessage?: string;
}
