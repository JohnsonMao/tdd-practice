import styled, { css } from 'styled-components';

/**
 * @typedef StyledInputProps
 * @prop {boolean} [$isError]
 */

/** @type {import('styled-components').IStyledComponent<'web', StyledInputProps & import('react').HTMLAttributes>} */
const StyledInput = styled.input`
  flex: 1;
  outline: none;
  ${(props) =>
    props.$isError &&
    css`
      border-color: var(--danger-color);
    `}
`;

export default StyledInput;
