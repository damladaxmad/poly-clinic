import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/Summary/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import WeeklyChart from "../containers/DashboardContainers/Weekly/WeeklyChart";
import OrderUpdates from "../containers/DashboardContainers/Weekly/OrderUpdates";
import RevenueStats from "../containers/DashboardContainers/Weekly/RevenueStats";
import Top5Employees from "../containers/DashboardContainers/Monthly/Top5Employees";
import Top5DeenCustomers from "../containers/DashboardContainers/Customer/Top5DeenCustomers";
import { setDashboard } from "../redux/actions/dashboardActions";
import useFetch from "../funcrions/DataFetchers";
import Top5OrderCustomers from "../containers/DashboardContainers/Customer/Top5OrderCustomers";
import { read } from "original-fs";
import Top5DeenVendors from "../containers/DashboardContainers/Customer/Top5OrderCustomers";
import moment from "moment";

const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const dispatch = useDispatch()
  const [state, setState] = useState(1)
  const products = useSelector(state => state.products.products)
  const available = useSelector(state => state.available.available)
  const customers = useSelector(state => state.customers.customers)
  const vendors = useSelector(state => state.vendors.vendors)
  const sales = useSelector(state => state.sales.sales)
  const services = useSelector(state => state.services.services)
  const purchases = useSelector(state => state.purchases.purchases)
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM")
  );

  let moneyFromSales = 0
  let moneyFromPurchases = 0
  let moneyFromServices = 0

  sales?.map(sale => {
    if ( moment(sale.date).format("MM") == startDate) {
      moneyFromSales += sale.total
    }
  })

  purchases?.map(purchase => {
    if ( moment(purchase?.date).format("MM") == startDate) {
      moneyFromPurchases += purchase?.total
    }
  })

  services?.map(service => {
    if ( moment(service?.date).format("MM") == startDate) {
      moneyFromServices += service?.total
    }
  })

  let recievable = 0
  customers?.map(customer => {
    recievable += customer.balance
  })

  let payble = 0
  vendors?.map(vendor => {
    payble += vendor.balance
  })

  let totalItems = 0
  products?.map(product => {
    totalItems += product.quantity
  })

  let inventory = 0
  available?.map(a => {
    inventory += a.totalCost
  })

  const myDate = [
    {label: "total customers", value: customers?.length, isMoney: false},
    {label: "total vendors", value: vendors?.length, isMoney: false},
    {label: "recievable", value: recievable, isMoney: true},
    {label: "payable", value: payble, isMoney: true},
    {label: "total products", value: products?.length, isMoney: false},
    {label: "items number", value: totalItems, isMoney: false},
    {label: "inventory", value: inventory, isMoney: true},
]

  const thisMonth = [
    {label: "sales revenue", value: moneyFromSales, isMoney: true},
    {label: "services revenue", value: moneyFromServices, isMoney: true},
    {label: "purchases cost", value: moneyFromPurchases, isMoney: true},
  ]

  return (

    <div
      id="uni"
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
        {" "}
        Dashboard{" "}
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {myDate.map((d, index) => (
          <StatCard value={d} key={index} type = "summary"/>
        ))}
      </div>

      <Typography
        style={{
          fontWeight: "600",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        Monthly Statistics
      </Typography>

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {thisMonth?.map((d, index) => (
          <StatCard value={d} key={index} type = "month"/>
        ))}
      </div>

      <Typography
        style={{
          fontWeight: "600",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        Macaamiil Statistics
      </Typography> 

         <div
        style={{
          display: "flex",
          width: "98.5%",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Top5DeenCustomers  /> 
        <Top5DeenVendors  /> 
        </div>

    </div>
  );
};

export default Dashboard;
