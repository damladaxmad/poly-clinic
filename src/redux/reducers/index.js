import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { productsReducer } from "./productsReducer";
import { productTypesReducer } from "./productTypesReducer";
import { categoryReducer } from "./categoryReducer";
import { ordersReducer } from "./ordersReducer";
import { menusReducer } from "./menusReducer";
import { usersReducer } from "./usersReducer";
import { companyInfoReducer } from "./companyInfoReducer";
import { activeUserReducer } from "./activeUserReducer";
import { employeesReducer } from "./employeesReducer"; 
import { stylesReducer } from "./stylesReducer"; 
import { employeeTitleReducer } from "./employeeTitleReducer"; 
import { isLoginReducer } from "./isLoginReducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  products: productsReducer,
  productTypes: productTypesReducer,
  categories: categoryReducer,
  orders: ordersReducer,
  menus: menusReducer,
  users: usersReducer,
  companyInfo: companyInfoReducer,
  activeUser: activeUserReducer,
  employees: employeesReducer,
  styles: stylesReducer,
  employeeTitle: employeeTitleReducer,
  isLogin: isLoginReducer,

});
export default reducers;
