import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
`;

const DateCard = styled.div`
  height: 100px;
  position: relative;
  margin: 20px 10px 20px 0;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
`;

const TitleDate = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

const Column = styled.div`
  text-align: center;
`;
const Record = styled.div`
  text-align: center;
`;

const NegativePrice = styled.div`
  color: red;
`;
const PositivePrice = styled.div`
  color: #07fe06;
`;

export {
  Container,
  DateCard,
  TitleDate,
  Column,
  Record,
  NegativePrice,
  PositivePrice,
};
