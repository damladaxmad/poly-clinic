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
  // dispatch(setDashboard(useFetch("dashboard", state, "dashboard")))

  const myDate = [
    {label: "total users", value: 100, isMoney: false},
    {label: "recievable", value: 20, isMoney: false},
    {label: "net profit", value: 400, isMoney: false},
    {label: "total fee", value: 600, isMoney: false},
 
]

  return (
          <Typography style={{ fontWeight: "600", fontSize: "25px",
          padding: "0px 20px"}}>
        {" "}
        Dashboard is coming soon!!!
      </Typography>
    // <div
    //   id="uni"
    //   style={{
    //     height: "100%",
    //     width: "95%",
    //     margin: "0px auto",
    //     display: "flex",
    //     gap: "32px",
    //     flexDirection: "column",
    //   }}
    // >
    //   <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
    //     {" "}
    //     Dashboard{" "}
    //   </Typography>
    //   <div
    //     style={{
    //       display: "flex",
    //       gap: "20px",
    //       width: "100%",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     {dashboard?.overview.map((d, index) => (
    //       <StatCard value={d} key={index} type = "summary"/>
    //     ))}
    //     {/* {!dashboard?.overview.map((d, index) => (
    //       <StatCard value={d} key={index} type = "summary"/>
    //     ))} */}

    //   </div>

    //   <Typography
    //     style={{
    //       fontWeight: "600",
    //       color: "#928E8E",
    //       fontSize: "25px",
    //       marginTop: "40px",
    //     }}
    //   >
    //     Monthly Statistics
    //   </Typography>

    //   <div
    //     style={{
    //       display: "flex",
    //       gap: "20px",
    //       width: "100%",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     {dashboard?.thisMonth.map((d, index) => (
    //       <StatCard value={d} key={index} type = "month"/>
    //     ))}
    //     {/* {!dashboard?.overview.map((d, index) => (
    //       <StatCard value={d} key={index} type = "summary"/>
    //     ))} */}

    //   </div>

    //   <Typography
    //     style={{
    //       fontWeight: "600",
    //       color: "#928E8E",
    //       fontSize: "25px",
    //       marginTop: "40px",
    //     }}
    //   >
    //     User Statistics
    //   </Typography> 

    //      <div
    //     style={{
    //       display: "flex",
    //       width: "98.5%",
    //       gap: "50px",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     <Top5DeenCustomers  /> 
    //     <Top5OrderCustomers  /> 
    //     </div>
    // </div>
  );
};

export default Dashboard;
