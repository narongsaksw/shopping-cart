import React, { useState } from "react";
import { Button } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import { create_promotion } from "../../constant";
import { functionPost } from "../../services/employee";

const AddButton = ({ getPromotion }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("dataValues", JSON.stringify(values.dataValues));
    formData.append("file", values.image[0].originFileObj);
    functionPost(create_promotion, formData, (res) => {
      if (res.message === "OK") {
        getPromotion();
        setVisible(false);
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        เพิ่มโปรโมชั่น
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        field={[]}
      />
    </>
  );
};

export default AddButton;
