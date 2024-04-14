import { StyledOption, StyledSelect } from './StyledSelect';

export default function Select({ options, ...props }) {
  return (
    <StyledSelect {...props}>
      {Array.isArray(options) &&
        options.map((option) => (
          <StyledOption key={option.value}>{option.label}</StyledOption>
        ))}
    </StyledSelect>
  );
}
