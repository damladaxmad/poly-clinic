import { useDispatch, useSelector } from "react-redux";
import SummaryReport from "../../ReportContainers/SummaryReport";
import StockSummary from "../../ReportContainers/StockSummary";
import TheForm from "./TheForm";
import ThePage from "./ThePage";
import TheTable from "./TheTable";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { addTableDalab, deleteTableDalab } from "../../../redux/actions/tableDalab";

const Dalab = () => {
  const products = useSelector((state) => state.available.available);
  const [reset, setReset] = useState(false);
  const [autoReset, setAutoReset] = useState(1);

  const [dalabData, setDalabData] = useState({
    item: null,
    quantity: null,
    category: null,
  });

  console.log(dalabData);

  const dispatch = useDispatch()

  const removeItem = (item) => {
    dispatch(deleteTableDalab(item))
    setDalabData((prevState) => {
      return {
        ...prevState,
        item: null,
      };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        margin: "auto",
        marginTop: "30px",
        background: "white",
        borderRadius: "8px",
        padding: "50px 20px",
        gap: "30px",
      }}
    >

        <div style = {{display: "flex", width: "85%", 
    justifyContent: "space-between"}}>
      <TheForm
        reset={reset}
        item={(data) => {
          setDalabData((prevState) => {
            return {
              ...prevState,
              item: data,
            };
          });
        }}
        category={(data) => {
          setDalabData((prevState) => {
            return {
              ...prevState,
              category: data,
            };
          });
        }}
        quantity={(data) => {
          setDalabData((prevState) => {
            return {
              ...prevState,
              quantity: data,
            };
          });
        }}
        autoReset={autoReset}
      />

      <Button
        style={{
          width: "140px",
          fontSize: "15px",
          height: "40px",
          borderRadius: "8px",
          fontWeight: "bold",
          background: "black",
          marginRight: "12px",
          color: "white",
        }}
        type="submit"
        variant="contained"
        onClick={() => {
          if (!dalabData.item || !dalabData.category || !dalabData.quantity) {
            return alert("Buuxi dhamaan meelaha bannaan!");
          }
          dispatch(addTableDalab(dalabData))
          setReset(true);
          setAutoReset((state) => state + 1);
        }}
      >
        Add Item
      </Button>
      </div>

      <TheTable  removeItem={(item) => removeItem(item)}/>
      <ThePage />
      {/* <StockSummary type = "Stock" data = {topValues}/> */}
    </div>
  );
};

export default Dalab;
