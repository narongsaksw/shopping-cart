export const ip = 'http://localhost:3001';
export const warehouse_find_all = ip + '/api/v1/warehouse/findAll';
export const product_group_find_all = ip + '/api/v1/product-group/find-all';
export const warehouse_product_group =
  ip + '/api/v1/warehouse/find-by-product-group/';
export const warehouse_find_one = ip + '/api/v1/warehouse/find/';
export const createOrder = ip + '/api/v1/trading-orders/create/';
export const createItems = ip + '/api/v1/order-items/create';

//admin
export const getHistoryByDate = ip + '/api/v1/trading-orders/find-by-date/';
export const getWarehouseAll = ip + '/api/v1/warehouse/findAll';
const userId = JSON.parse(localStorage.getItem('userData')).id;
export const getEmployeeList =
  ip + `/api/v1/act-membership/findAllMember/${userId}`;
