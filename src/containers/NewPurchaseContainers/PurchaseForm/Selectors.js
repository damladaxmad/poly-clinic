import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from "react-redux";

const Selectors = (props) => {

  const medicine = useSelector(state => state.products.products)

    // const medicine = ["Emoxicilin Tablet", "Ampicilin Tablet", "Syrup Injection"];
    const types = ["invoice", "cash"]

    return (
        <div style = {{display: "flex", gap: "40px", flexDirection: "row",
        justifyContent: "space-between"}}>

          <div style = {{display: "flex", gap: "30px"}}>
           <Autocomplete
           autoComplete = {false}
           size="small"
           onChange={(event, value) => props.item(value.name)} 
            id="country-select-demo"
            sx={{ width: 200 }}
            options={medicine}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
              class = "myText"
               variant="outlined"
               placeholder="Select Medicine"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px"}}
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
            sx={{ width: 200 }}
            options={medicine}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
               variant="outlined"
               placeholder="Select Vendor"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  }}
              />
            )}
          />

          </div>

          <div style = {{display: "flex", gap: "30px"}}>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 140 }}
            options={types}
            autoHighlight
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option} 
                {/* ({option.code}) +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
               variant="outlined"
               placeholder="Select Type"
               style = {{border: "1.5px solid #6E6E6E",
              borderRadius: "8px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  }}
              />
            )}
          />

      <input
        // value={name}
        type="date"
        style={{
          width: "140px",
          height: "40px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          background: "white",
          border: "1px solid black",
        }}
        // onChange={(e) => props.quantity(e.target.value)}
      />

      </div>
          
          </div>
    )
}

export default Selectors