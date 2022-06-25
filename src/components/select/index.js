import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectComponent = ({ option, loading, disabled, handleChange, width, height, style }) => {
  return (
    <Select
      defaultValue={option.length > 0 ? option.find((item, index) => index == 1) : ""}
      style={style ? { width: width ? width : 120, ...style } : { width: width ? width : 120 }}
      onChange={handleChange}
      disabled={disabled}
      loading={loading}
    >
      {option ? (
        option.map((item, index) => (
          <Option value={item} key={index}>
            {item}
          </Option>
        ))
      ) : (
        <></>
      )}
    </Select>
  );
};

export default SelectComponent;
