import { useField } from '../Field';
import StyledLabel from './StyledLabel';

const Label = ({ children, ...props }) => {
  const { id, name } = useField();

  return (
    <StyledLabel htmlFor={`${name}-${id}`} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;
