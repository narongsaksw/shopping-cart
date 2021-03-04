export const order_sell = {
  order_sale_id: String,
  dataValues: Array,
};

export const order_item = {
  warehouse_id: String,
  dataValues: {
    value: Number,
    price: Number,
  },
};

export const old_file_value = {
  item_id: String,
  value: 0,
};
