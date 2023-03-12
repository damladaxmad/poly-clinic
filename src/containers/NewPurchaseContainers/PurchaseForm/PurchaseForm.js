import { Button } from "@material-ui/core";
import AdditionalInfo from "./AdditionalInfo";
import PriceBox from "./PriceBox";
import Selectors from "./Selectors";

const PurchaseForm = () => {
  return (
    <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
      <Selectors />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PriceBox />
        <AdditionalInfo />
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <Button
          style={{
            width: "150px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#4421DE",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Add List
        </Button>
        <Button
          style={{
            width: "150px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#F22417",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default PurchaseForm;
