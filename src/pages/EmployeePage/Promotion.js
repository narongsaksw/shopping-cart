import React, { useEffect, useState } from "react";
import { promotion_find_all } from "../../constant";

const Promotion = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.card(promotion_find_all).then((res) => {
      setData(res);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{data}</>;
};

export default Promotion;
