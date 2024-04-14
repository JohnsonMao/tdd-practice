import styled from 'styled-components';
import StyledText from '../Text/StyledText';
import StyledInput from '../Input/StyledInput';

const StyledGroup = styled.div`
  display: flex;
  border-radius: var(--field-radius);
  align-items: stretch;

  > * {
    border: var(--border-width) solid var(--border-color);
    padding: var(--field-y-padding) var(--field-x-padding);
  }
  > * + * {
    margin-left: -1px;
  }
  > ${StyledText} {
    background-color: var(--gray-color-100);
  }
  > ${StyledInput} {
    position: relative;
    z-index: 1;
  }
  :first-child {
    border-top-left-radius: var(--field-radius);
    border-bottom-left-radius: var(--field-radius);
  }
  :last-child {
    border-top-right-radius: var(--field-radius);
    border-bottom-right-radius: var(--field-radius);
  }
`;

export default StyledGroup;
