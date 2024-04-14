import styled from 'styled-components';

const StyledList = styled.ul``;

export const StyledItem = styled.li`
  padding: var(--list-item-y-padding) var(--list-item-x-padding);

  & + & {
    border-top: var(--border-width) solid var(--gray-color-300);
  }
`;

export default StyledList;
