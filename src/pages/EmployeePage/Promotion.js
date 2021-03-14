import React, { useEffect, useState } from "react";
import CardItems from "../../components/CardItems";
import { functionGet } from "../../services/employee";
import { old_file_value } from "../../form/employee";
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
