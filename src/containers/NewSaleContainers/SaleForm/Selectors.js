import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import moment from "moment";
import { DateRangeRounded } from "@material-ui/icons";

const Selectors = (props) => {
  const medicine = useSelector((state) => state.products.products);
  const productTypes = useSelector((state) => state.productTypes.productTypes);
  const customers = useSelector((state) => state.customers.customers);
  const [date, setDate] = useState(moment(new Date()).format("MM-DD-YYYY"));
  const [productType, setProductType] = useState(null);


  let newMedicine = []

    medicine?.map(med => {
      if (med.prodcutType?.typeName == productType?.typeName || productType == null) newMedicine.push(med)
    }) 

    console.log(productType)

    // useEffect(() => {
    // }, [productType]) 

    useEffect(() => {
      setProductType(null)
    }, [props.reset])

  const types = ["cash", "invoice"];

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "30px" }}>
        <Autocomplete
          autoComplete={false}
          onChange={(event, value) => props.item(value?.name)}
          key={`${props.autoReset}m`}
          id="country-select-demo"
          sx={{ width: 200 }}
          options={newMedicine}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.name}
              {/* ({option.code}) +{option.phone} */}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              class="myText"
              variant="outlined"
              placeholder="Select Medicine"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

        <Autocomplete
          id="country-select-demo"
          // key={props.autoReset}
          sx={{ width: 200 }}
          onChange={(event, value) => props.customer(value?._id)}
          options={customers}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.name}
              {/* ({option.code}) +{option.phone} */}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Select Customer"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </div>

      <div style={{ display: "flex", gap: "30px" }}>
        <Autocomplete
          id="country-select-demo"
          value={types[0]}
          // key={props.autoReset}
          onChange={(event, value) => props.type(value)}
          sx={{ width: 150 }}
          options={types}
          autoHighlight
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option}
              {/* ({option.code}) +{option.phone} */}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Select Type"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

        <Autocomplete
          id="country-select-demo"
          key={`${props.autoReset}t`}
          onChange={(event, value) => setProductType(value)}
          sx={{ width: 150 }}
          options={productTypes}
          autoHighlight
          getOptionLabel={(option) => option.typeName}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.typeName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Category"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Selectors;
