import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { productsReducer } from "./productsReducer";
import { testsReducer } from "./testsReducer";
import { patientsReducer } from "./patientsReducer";
import { availableReducer } from "./availableReducer";
import { customersReducer } from "./customersReducer";
import { tableDataReducer } from "./tableDataReducer";
import { tableDalabReducer } from "./tableDalabReducer";
import { tableTestDataReducer } from "./tableTestDataReducer";
import { purchasesReducer } from "./purchasesReducer";
import { purchases2Reducer } from "./purchases2Reducer";
import { salesReducer } from "./salesReducer";
import { servicesReducer } from "./servicesReducer";
import { vendorsReducer } from "./vendorsReducer";
import { productTypesReducer } from "./productTypesReducer";
import { serviceTypesReducer } from "./serviceTypesReducer";
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
import { tokenReducer } from "./tokenReducer";
import {visitorsReducer} from "./visitorsReducer"

const reducers = combineReducers({
  dashboard: dashboardReducer,
  products: productsReducer,
  tests: testsReducer,
  visitors: visitorsReducer,
  patients: patientsReducer,
  available: availableReducer,
  purchases: purchasesReducer,
  purchases2: purchases2Reducer,
  sales: salesReducer,
  services: servicesReducer,
  customers: customersReducer,
  tableData: tableDataReducer,
  tableTestData: tableTestDataReducer,
  tableDalab: tableDalabReducer,
  vendors: vendorsReducer,
  productTypes: productTypesReducer,
  serviceTypes: serviceTypesReducer,
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
  token: tokenReducer,

});
export default reducers;
