export const ip = "http://localhost:3001";
export const warehouse_find_all = ip + "/api/v1/warehouse/findAll";
export const product_group_find_all = ip + "/api/v1/product-group/find-all";
export const warehouse_product_group = ip + "/api/v1/warehouse/find-by-product-group/";
export const warehouse_find_one = ip + "/api/v1/warehouse/find/";
export const createOrder = ip + "/api/v1/trading-orders/create/";
export const createItems = ip + "/api/v1/product-history/create";
export const promotion_find_all = ip + "/api/v1/promotion/findAll";
export const promotion_find_one = ip + "/api/v1/promotion/findOne/";
export const promotion_item_find_pid = ip + "/api/v1/promotion-item/find-all-by-promotion/";
export const find_warehouse_all = ip + "/api/v1/promotion-item/find-warehouse-all/";
export const create_promotion = ip + "/api/v1/promotion/create";
export const find_value_id = ip + "/api/v1/promotion-item/value-id/";
export const update_promotion = ip + "/api/v1/promotion/update";
export const delete_promotion = ip + "/api/v1/promotion/delete/";

//history
export const getHistory = ip + "/api/v1/trading-orders";
export const getHistoryByDate = ip + "/api/v1/transaction/find-by-date";
export const getHistoryByDateV2 = ip + "/api/v2/transaction/find-by-date";
export const getWarehouseAll = ip + "/api/v1/warehouse/findAll";
const userId = JSON.parse(localStorage.getItem("userData"))?.id;
export const getEmployeeList = ip + `/api/v1/act-membership/findAllMember/${userId}`;

//employee-list
export const createEmployee = ip + "/api/v1/act-membership/create";
export const deleteEmployee = ip + "/api/v1/act-membership/delete-member";
export const updateEmployee = ip + "/api/v1/act-membership/update-member";

//stock
export const createStock = ip + "/api/v1/store-information/create-item";
export const deleteStockById = ip + "/api/v1/warehouse/delete";
export const updateStockById = ip + "/api/v1/warehouse/update";

//company-list
export const companyAPI = ip + "/api/v1/personal-information";
export const addQuote = ip + "/api/v1/quote";
export const updateQuote = ip + "/api/v1/quote";
export const getQuoteById = ip + "/api/v1/quote/";
export const getQuoteItemById = ip + "/api/v1/quote/";
export const deleteQuoteItemById = ip + "/api/v1/quote/";

export const createTransaction = ip + "/api/v1/transaction";
export const cancleTransaction = ip + "/api/v1/transaction/cancle";
