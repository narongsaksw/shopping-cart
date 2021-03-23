export const ip = 'http://localhost:3001';
export const warehouse_find_all = ip + '/api/v1/warehouse/findAll';
export const product_group_find_all = ip + '/api/v1/product-group/find-all';
export const warehouse_product_group =
  ip + '/api/v1/warehouse/find-by-product-group/';
export const warehouse_find_one = ip + '/api/v1/warehouse/find/';
export const createOrder = ip + '/api/v1/trading-orders/create/';
export const createItems = ip + '/api/v1/order-items/create';

//history
export const getHistoryByDate = ip + '/api/v1/trading-orders/find-by-date';
export const getWarehouseAll = ip + '/api/v1/warehouse/findAll';
const userId = JSON.parse(localStorage.getItem('userData'))?.id;
export const getEmployeeList =
  ip + `/api/v1/act-membership/findAllMember/${userId}`;

//employee-list
export const createEmployee = ip + '/api/v1/act-membership/create';
export const deleteEmployee = ip + '/api/v1/act-membership/delete-member';
export const updateEmployee = ip + '/api/v1/act-membership/update-member';

//stock
export const createStock = ip + '/api/v1/store-information/create-item ';
export const deleteStockById = ip + '/api/v1/warehouse/delete';
export const updateStockById = ip + '/api/v1/warehouse/update';
