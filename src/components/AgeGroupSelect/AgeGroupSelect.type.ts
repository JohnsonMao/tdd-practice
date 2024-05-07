import type { Target } from "@/types";

export interface AgeGroupSelectProps {
  name: string;
  value: [number, number];
  min?: number;
  max?: number;
  errorMessage?: string;
  onChange?: (event: { target: Target<number> }) => void;
}
