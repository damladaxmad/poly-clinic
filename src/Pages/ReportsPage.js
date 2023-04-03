import { TextField, Typography } from "@material-ui/core";
import Reports from "../utils/Report";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { setPurchases } from "../redux/actions/purchasesActions";
import useFetch from "../funcrions/DataFetchers";
import PurchasesReport from "../containers/Reports/PurchasesReport";
import GeneralReport from "../containers/ReportContainers/GeneralReports";
import PersonalReport from "../containers/ReportContainers/PersonalReport";

const ReportsPage = () => {
  const titles = ["customers", "vendors", "sales", "purchases", "services"];
  const [currentTitle, setCurrentTitle] = useState("customers");
  const [view, setView] = useState();
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );

  const sales = useSelector((state) => state.sales.sales);
  const purchases = useSelector((state) => state.purchases.purchases);

  const clickHandler = (title) => {
    setCurrentTitle(title);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "80%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          width: "100%",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {titles?.map((title) => {
          return (
            <div
              style={{
                background: currentTitle == title ? "#4421DE" : "#F0F2FA",
                color: currentTitle == title ? "white" : "black",
                padding: "8px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => clickHandler(title)}
            >
              <Typography style={{ fontWeight: "bold" }}> {title} </Typography>
            </div>
          );
        })}
      </div>

      {(currentTitle == "purchases" ||
        currentTitle == "sales" ||
        currentTitle == "services") && (
        <GeneralReport
          name={currentTitle}
          type={`${currentTitle.charAt(0).toUpperCase()}${currentTitle.slice(
            1
          )}`}
        />
      )}

      {(currentTitle == "customers" ||
        currentTitle == "vendors" ) && (
        <PersonalReport
          name={currentTitle}
          type={`${currentTitle.charAt(0).toUpperCase()}${currentTitle.slice(
            1
          )}`}
        />
      )}
    </div>
  );
};

export default ReportsPage;
