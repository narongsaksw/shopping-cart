import React, { useState } from "react";
import { Container } from "./style";
import CardItems from "../../components/CardItems";
import Drawer from "./Drawer";

const items = {
  code: 200,
  dataValues: [
    {
      key: "cfad98b0-7905-11eb-9300-fd0a72369124",
      title: "ไก่ทอด",
      price: "60",
      image:
        "http://i0.wp.com/www.thaismescenter.com/wp-content/uploads/2019/05/1010.jpg",
    },
    {
      key: "cfadbfc0-7905-11eb-9300-fd0a72369124",
      title: "หมูทอด",
      price: "100",
      image: "https://i.ytimg.com/vi/dWWecEXAr5M/maxresdefault.jpg",
    },
    {
      key: "cfadbfc1-7905-11eb-9300-fd0a72369124",
      title: "เบอร์เกอร์หมู",
      price: "45",
      image:
        "https://lh3.googleusercontent.com/proxy/8FSJNigSrEAOkOvSkQ2gxZuyuWKq83D7hN05sNvTDg0w1fEVu2NXa-nB_giZg1l_vxvhhxFip6OwWuX09XiCvokh4KxlgBKWj2ac-m7iDY0psEA4RUgkjf0bPhxIk_oa5GLolKLz1XmNUv25PqyZRiHyg3_Y9uUzRYzFHugHLsshxpYNcOcA_jvrCVNRvRRp9DwmOSCV-fZRNppnhQuhJScHLDaPUfMBAv2yC35aaN0ZPFQ_qM39lzKKL93Omb4f00vFP-bHPg",
    },
  ],
};

const EmployeePage = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const data = [];
  items.dataValues.forEach((element) => {
    data.push(
      <CardItems
        {...element}
        description={`price ${element.price} BATH`}
        setVisible={(e) => {
          setVisible(e);
          setValue(element);
        }}
      />
    );
  });

  return (
    <Container>
      {data}
      <Drawer
        visible={visible}
        setVisible={(e) => setVisible(e)}
        value={value}
      />
    </Container>
  );
};

export default EmployeePage;
