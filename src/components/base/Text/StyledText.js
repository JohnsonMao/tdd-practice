import styled, { css } from 'styled-components';

/**
 * @typedef StyledTextProps
 * @prop {boolean} [$isError]
 */

/** @type {import('styled-components').IStyledComponent<'web', StyledTextProps & import('react').HTMLAttributes>} */
const StyledText = styled.p`
  color: var(--gray-color-500);

  ${(props) =>
    props.$isError &&
    css`
      color: var(--danger-color);
      background-color: var(--danger-color-100);
    `}
`;

export default StyledText;
