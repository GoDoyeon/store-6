import styled from 'styled-components';

export const TitleContainer = styled.div`
  height: 30px;
  transition: all 300ms;
  padding: 6px 10px;
  border-radius: 5px;
  &:hover {
    div {
      color: #2ac0bc;
    }
  }
`;
export const Title = styled.div`
  font-size: 23px;
  margin-bottom: 5px;
  cursor: pointer;
  &.selected {
    transition: all 150ms;
    color: #2ac0bc;
  }
`;
