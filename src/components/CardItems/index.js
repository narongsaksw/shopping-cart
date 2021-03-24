import React from "react";
import { Card } from "antd";
import { style } from "./style";

const { Meta } = Card;

const CardItrems = (props) => {
  return (
    <>
      <Card
        hoverable
        style={style.cardStyle}
        cover={
          <div style={style.imagePanel}>
            <img
              alt="example"
              src={props.image != null ? props.image : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
              style={style.imageStyle}
            />
          </div>
        }
        onClick={(e) => {
          props.setVisible(true);
        }}
      >
        <Meta title={props.title} description={props.description} />
      </Card>
    </>
  );
};

export default CardItrems;
