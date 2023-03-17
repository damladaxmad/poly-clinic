import { Button } from "@material-ui/core"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useFetch from "../../funcrions/DataFetchers"
import { constants } from "../../Helpers/constantsFile"
import Table from "../../utils/Table"
import { setCategory } from "../../redux/actions/categoryActions"
import { setProductTypes } from "../../redux/actions/productTypesActions"


const Types = (props) => {
    const [type, setType] = useState()
    const [query, setQuery] = useState("")
    const productTypes = useSelector(state => state.productTypes.productTypes)
    const [del, setDel] = useState(1)

    const dispatch = useDispatch()

    dispatch(
        setProductTypes(
          useFetch("product-types", del, "productTypes")
        )
      );

    const columns = [
        {title: "Product Type", field: "typeName"}
    ]
    const changeHandler = () => {
        setDel((state) => state + 1);
      };

    const addType = () => {
        axios.post(`${constants.baseUrl}/product-types`, {
            typeName: type
        }).then(res => {
            alert("Successfully added type")
            setType("")
            setQuery("")
            setDel((state) => state + 1);
        }).catch(err => {
            alert(err.response?.data?.message)
        })
    }

    const handler = (data) => { 
        if (data?.length > 0) {
          return data.filter(
            (std) =>
            std.typeName.toString().toLowerCase().includes(query)
          );
        } else {
          return
        }  
      };

    return (
        <div style = {{display: "flex", flexDirection: "column",
        gap: "20px", width: "320px"}}>

            <div style = {{width: "100%", display: "flex",
        flexDirectio: "row", alignItems: "center",
        justifyContent: "space-between"}}>
            <input
            value={query}
            type="text"
            placeholder="Type Name"
            style={{
              width: "70%",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "1px solid black",
            }}
            onChange={(e) => {
                setType(e.target.value)
                setQuery(e.target.value)
            }}
          />
            <Button
          style={{
            width: "25%",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#4421DE",
            borderRadius: "10px",
            height: "45px",
            color: "white",
          }}
          onClick = {addType}
          variant="contained"
        >
         Add
        </Button>
        </div>

        <Table columns =  {columns} data = {handler(productTypes)} 
        page = "New Purchase" name = "Type" 
        url = "product-types" change = {changeHandler} />

        </div>
    )
}

export default Types
