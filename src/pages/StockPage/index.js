import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

function Stock() {
  return (
    <Container>
      <h1>Stock</h1>
    </Container>
  );
}

export default Stock;
