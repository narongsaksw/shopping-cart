import React from "react";
import AddListButton from "../../components/Button/AddButton";
import Modal from "./Modal";

const AddButton = ({ isModalVisible, setModalVisible }) => {
  return (
    <>
      <AddListButton
        title="เพิ่มรายการ"
        onClick={() => setModalVisible((state) => (state = !state))}
      />

      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default AddButton;
