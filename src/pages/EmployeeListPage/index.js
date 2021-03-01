import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

function EmployeeList() {
  return (
    <Container>
      <h1>EmployeeList</h1>
    </Container>
  );
}

export default EmployeeList;
