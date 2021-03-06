import styled from 'styled-components';

export const CartItemWrapper = styled.div`
  padding: 41px 10px;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const CartImg = styled.img`
  margin: 0;
  width: 90px;
  height: 120px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(2px 2px 12px rgba(0, 0, 0, 0.15));
  cursor: pointer;
`;

export const CartTitle = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  height: 105px;
  line-height: 1.4;
  overflow-y: auto;
  text-overflow: ellipsis;
  margin-left: 80px;
  cursor: pointer;
`;

export const CartPrice = styled.div`
  width: 140px;
  margin-left: 60px;
`;

export const CartCount = styled.div`
  width: 140px;
  margin-left: 20px;
`;

export const CartCounter = styled.div`
  margin-left: 12px;
  width: 80px;
  display: flex;
`;

export const CountBtn = styled.button`
  color: #999999;
  cursor: pointer;

  &:hover {
    color: #45c8c4;
  }
`;

export const Count = styled.div`
  min-width: 40px;
  text-align: center;
`;

export const CartCancle = styled.div`
  width: 10px;
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 80px;

  &:hover {
    transition: transform 300ms;
    transform: scale(1.08);
  }
`;
