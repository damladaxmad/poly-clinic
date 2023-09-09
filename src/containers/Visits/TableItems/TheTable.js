import MyTable from "../../../utils/MyTable"
import Table from "../../../utils/Table"

const columns = [
    { title: "Medication", field: "medication", width: "25%" },
    { title: "Quantity", field: "quantity" },
    { title: "Frequency", field: "frequency" },
    { title: "Instruction", field: "instruction",  }, 
  ]


const TheTable = (props) => {

    console.log(props.data)

    return (
        <div style={{width: "102%", marginTop: "15px",}}>
            <MyTable columns = {columns} data = {props.data} 
            page = "New Purchase" name = "Purchase" 
            removeItem = {(item) => {
                props.removeItem(item)
            }}/>
        </div>
    )
}

export default TheTable