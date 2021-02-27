import React, { useState } from "react";
import { Container } from "./style";
import CardItems from "../../components/CardItems";
import Drawer from "./Drawer";

const EmployeePage = () => {
  const [visible, setVisible] = useState(false);
  const num = 10;
  const data = [];
  for (let i = 1; i <= num; i++) {
    data.push(
      <CardItems
        key={i}
        title={i}
        description={`price ${i} BATH`}
        image={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
        setVisible={(e) => {
          setVisible(e);
        }}
      />
    );
  }

  return (
    <Container>
      {data}
      <Drawer visible={visible} setVisible={(e) => setVisible(e)} />
    </Container>
  );
};

export default EmployeePage;
