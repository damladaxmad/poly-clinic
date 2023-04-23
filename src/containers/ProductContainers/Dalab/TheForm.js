import { Box, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const TheForm = (props) => {
  const medicine = useSelector((state) => state.products.products);
  const productTypes = [
    "INJECTION",
    "TAB",
    "SYRUP",
    "DROP",
    "CREAM",
    "SOLUTION",
    "SOUP",
    "GESAC",
    "INVENTORY",
    "GEL",
    "MALAP",
    "SUMPOSTRY",
    "HERBAL",
    "SHAMPOO",
    "LIPIN",
  ];
  const [productType, setProductType] = useState(null);
  const [quantity, setQuantity] = useState()

  let newMedicine = [];

  medicine?.map((med) => {
    if (med.category == productType || productType == null)
      newMedicine.push(med);
  });

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <Autocomplete
        autoComplete={false}
        onChange={(event, value) => props.item(value?.name)}
        // key={`${props.autoReset}m`}
        id="country-select-demo"
        sx={{ width: 220 }}
        options={newMedicine}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <p style={{ margin: "0px", fontSize: "16px" }}> {option.name}</p>
            <p style={{ margin: "0px", fontSize: "12px", color: "#A2A0A0" }}>
              {" "}
              {option.quantity} + {option.category} ({option.unitMeasurment})
            </p>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            class="myText"
            variant="outlined"
            placeholder="Select Product"
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
        onChange={(event, value) => {
          props.category(value);
          setProductType(value);
        }}
        sx={{ width: 220 }}
        options={productTypes}
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option}
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

<input
          value={quantity}
          type="number"
          style={{
            width: "100px",
            height: "38px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.quantity(e.target.value);
            setQuantity(e.target.value);
          }}
        />
    </div>
  );
};

export default TheForm;
