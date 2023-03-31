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

const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const dispatch = useDispatch()
  const [state, setState] = useState(1)
  const products = useSelector(state => state.products.products)
  const customers = useSelector(state => state.customers.customers)
  const vendors = useSelector(state => state.vendors.vendors)
  const sales = useSelector(state => state.sales.sales)
  const services = useSelector(state => state.services.services)
  const purchases = useSelector(state => state.purchases.purchases)

  let salesMoney = 0
  sales?.map(sale => {
    salesMoney += sale.total
  })

  let purchasesMoney = 0
  purchases?.map(purchase => {
    purchasesMoney += purchase.total
  })

  let servicesMoney = 0
  services?.map(service => {
    servicesMoney += service.total
  })

  let recievable = 0
  customers?.map(customer => {
    recievable += customer.balance
  })

  let payble = 0
  vendors?.map(vendor => {
    payble += vendor.balance
  })

  const myDate = [
    {label: "total products", value: products?.length, isMoney: false},
    {label: "total customers", value: customers?.length, isMoney: false},
    {label: "total vendors", value: vendors?.length, isMoney: false},
    {label: "sales revenue", value: salesMoney, isMoney: true},
    {label: "purchase revenue", value: purchasesMoney, isMoney: true},
    {label: "service revenue", value: servicesMoney, isMoney: true},
    {label: "recievable", value: recievable, isMoney: true},
    {label: "payable", value: payble, isMoney: true},
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

    </div>
  );
};

export default Dashboard;
