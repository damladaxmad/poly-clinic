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


const pages = [
     <Route path= "/dashboard" element = {<Dashboard/>} />,
     <Route path= "/adminstration" element = {<Adminstration/>} />,  
     <Route path= "/products" element = {<Products/>} />,  
     <Route path= "/purchase" element = {<Purchase/>} />,  
     <Route path= "/sale" element = {<Sale/>} />,  
     <Route path= "/categories" element = {<Categories/>} />,  

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
    setProductTypes(
      useFetch("product-types", isLogin, "productTypes")
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
