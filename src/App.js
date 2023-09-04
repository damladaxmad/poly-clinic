import React, {useState,useEffect} from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Adminstration from "./Pages/Adminstration";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignupAndLogin from "./SignupAndLogin/SignupAndLogin";
import "./App.css"
import { useSelector } from "react-redux";
import { setCompanyInfo } from "./redux/actions/companyInfoActions";
import NewLayout from "./containers/NewLayout";
import { setIsConnected } from "./redux/actions/isLoginActions";
import { setDashboard } from "./redux/actions/dashboardActions";
import useFetch from "./funcrions/DataFetchers";
import { constants } from "./Helpers/constantsFile";
import Calculator from "./Pages/Purchase";
import Products from "./Pages/Products";
import { setProductTypes } from "./redux/actions/productTypesActions";
import { setCategory } from "./redux/actions/categoryActions";
import { setProducts } from "./redux/actions/productsActions";
import Purchase from "./Pages/Purchase";
import Sale from "./Pages/Sale";
import Categories from "./Pages/Categories";
import { setCustomers } from "./redux/actions/customersActions";
import Customers from "./Pages/Customers";
import { setVendors } from "./redux/actions/vendorsActions";
import Vendors from "./Pages/Vendors";
import Service from "./Pages/Service";
import { setServiceTypes } from "./redux/actions/serviceTypesActions";
import ReportsPage from "./Pages/ReportsPage";
import { setUsers } from "./redux/actions/usersActions";
import { setSales } from "./redux/actions/salesActions";
import { setPurchases } from "./redux/actions/purchasesActions";
import { setServices } from "./redux/actions/servicesActions";
import Transactions from "./Pages/Transactions.js";
import TransactionPage from "./Pages/Transactions.js";
import { setAvailable } from "./redux/actions/availableActions";
import ImportProducts from "./Pages/ImportProducts";
import Tests from "./Pages/Tests";
import { setPatients } from "./redux/actions/patientsActions";
import { setTests } from "./redux/actions/testsActions";
import Visits from "./Pages/Visits";
import Laboratory from "./Pages/Laboratory";
import TestsSetup from "./Pages/TestsSetup";
import { setVisitors } from "./redux/actions/vistorsActions";
import { setTableTestData } from "./redux/actions/tableTestDataActions";

const pages = [
     <Route path= "/dashboard" element = {<Dashboard/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,  
     <Route path= "/products" element = {<Products/>} />,  
     <Route path= "/purchase" element = {<Purchase/>} />,  
     <Route path= "/sale" element = {<Sale/>} />,  
     <Route path= "/service" element = {<Service/>} />,  
     <Route path= "/visits" element = {<Visits/>} />,  
     <Route path= "/laboratory" element = {<Laboratory/>} />,  
     <Route path= "/tests-setup" element = {<TestsSetup/>} />,  
     <Route path= "/categories" element = {<Categories/>} />,  
     <Route path= "/customers" element = {<Customers/>} />,  
     <Route path= "/vendors" element = {<Vendors/>} />,  
     <Route path= "/reports" element = {<ReportsPage/>} />,  
     <Route path= "/tests" element = {<Tests/>} />,  
     <Route path= "/import" element = {<ImportProducts/>} />,  

]

function App() {
  
  const isLogin = useSelector(state => state.isLogin.isLogin)
  // const isReports = useSelector(state => state.isLogin.isReports)
  const isConnected = useSelector(state => state.isLogin.isConnected)
  const [showLayout, setShowLayout] = useState(isLogin)
  const dispatch = useDispatch();
  // const companyInfo = useSelector(state => state.companyInfo.companyInfo)

  // dispatch(setDashboard(useFetch("dashboard", isLogin, "dashboard")))

  dispatch(
    setProducts(
      useFetch("products", isLogin, "products")
    )
  );
  dispatch(
    setPatients(
      useFetch("patients", isLogin, "patients")
    )
  );
  dispatch(
    setTests(
      useFetch("test-items", isLogin, "testItems")
    )
  );

  dispatch(
    setVisitors(
      useFetch("visitors/get-visitors-with-tests", isLogin, "visitors")
    )
  );

  dispatch(
    setAvailable(
      useFetch("products/available", isLogin, "products")
    )
  );


  dispatch(
    setCustomers(
      useFetch("customers/customers-with-transactions", isLogin, "customers")
    )
  );

  dispatch(
    setVendors(
      useFetch("vendors/vendors-with-transactions", isLogin, "vendors")
    )
  );
  
  dispatch(
    setSales(
      useFetch("sales", isLogin, "sales")
    )
  );
  dispatch(
    setPurchases(
      useFetch("purchases", isLogin, "purchases")
    )
  );
  dispatch(
    setServices(
      useFetch("services", isLogin, "services")
    )
  );

  dispatch(setUsers(useFetch("users", isLogin, "users")))

  dispatch(
    setProductTypes(
      useFetch("product-types", isLogin, "productTypes")
    )
  );

  dispatch(
    setServiceTypes(
      useFetch("service-types", isLogin, "serviceTypes")
    )
  );

  dispatch(
    setCategory(
      useFetch("product-categories", isLogin, "categories")
    )
  );

  const showHandler = () => {
    setShowLayout(true)
  }

  useEffect(()=> {
    setShowLayout(isLogin)
  }, [isLogin])

  return (
    

   <div className="App" style={{backgroundColor: "#F0F2FA", display: "flex",
   justifyContent: "center",}}>

      <Router>
    {!showLayout && 
    <Route path= "/signup" element = {<SignupAndLogin
    showHandler = {showHandler}/>} />}
      {showLayout &&  <NewLayout>
          <Routes>
            {pages.map(page => (
              page
            ))}
          </Routes>
        </NewLayout>}
      </Router>
    </div>
         
  );
}

export default App;
