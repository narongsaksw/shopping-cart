import React, { useState } from "react";
import { Button } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import { create_promotion } from "../../constant";
import { functionPost } from "../../services/employee";

const AddButton = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    functionPost(create_promotion, values, (res) => {
      if (res.message === "OK") {
        setVisible(false);
      }
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Promotion
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
