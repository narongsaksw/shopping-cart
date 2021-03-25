import React, { useEffect, useState } from "react";
import { promotion_find_all } from "../../constant";

const Promotion = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.card(promotion_find_all).then((res) => {
      setData(res);
    });
  }, []);

  return <>{data}</>;
};

export default Promotion;
