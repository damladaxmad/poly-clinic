import { useSelector } from "react-redux"
import SummaryReport from "../ReportContainers/SummaryReport"
import StockSummary from "../ReportContainers/StockSummary"


const Stock = () => {

    const products = useSelector(state => state.available.available)
    let topValues = products?.sort((a,b) => b.unitPrice-a.unitPrice).slice(0,products?.length);

    return (
        <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            margin: "auto",
            marginTop: "30px"
          }}> 
            <StockSummary type = "Stock" data = {topValues}/>
        </div>
    )
}

export default Stock