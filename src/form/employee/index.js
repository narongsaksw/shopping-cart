export const order_sell = {
  order_sale_id: String,
  dataValues: Array,
};

export const order_item = {
  id: String,
  dataValues: {
    value: Number,
    price: Number,
    old_value: Number,
  },
};

export const old_file_value = {
  item_id: String,
  value: 0,
};

export const tradingOrder = {
  storeInformation: String,
  dataValues: {
    price: Number,
    order_id: Number,
    product_name: String,
  },
};
