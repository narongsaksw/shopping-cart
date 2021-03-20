import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 5px;
  margin: 20px 10px 20px 0;
`;

const Title = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 18px;
`;

const Amount = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  font-size: 30px;
`;
const Card = ({ title, amount }) => {
  return (
    <Container>
      <Typography.Text>{title}</Typography.Text>
      <Amount>{amount}</Amount>
    </Container>
  );
};

export default Card;
