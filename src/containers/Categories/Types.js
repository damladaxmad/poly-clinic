import { Button } from "@material-ui/core"
import Table from "../../utils/Table"


const Types = (props) => {

    const columns = [
        {title: "Type Name", field: "typeName"}
    ]

    const data = [
        {typeName: "Sharoobo"},
        {typeName: "Inventory"},
        {typeName: "Kaniini"},
    ]

    return (
        <div style = {{display: "flex", flexDirection: "column",
        gap: "20px", width: "320px"}}>
            <Button
          style={{
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#4421DE",
            borderRadius: "10px",
            height: "52px",
            color: "white",
            marginTop: "20px",
          }}
          type="submit"
          variant="contained"
        >
         Add Type
        </Button>

        <Table columns =  {columns} data = {data} 
        page = "New Purchase" />
        </div>
    )
}

export default Types
