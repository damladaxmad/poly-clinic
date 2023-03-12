import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Selectors = () => {

    const medicine = ["Emoxicilin Tablet", "Ampicilin Tablet", "Syrup Injection"];

    return (
        <div style = {{display: "flex", gap: "40px", flexDirection: "row",
        justifyContent: "start"}}>
           <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={medicine}
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
               placeholder="Select medicine"
               style = {{border: "1.5px solid black",
              borderRadius: "10px"}}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
           <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={medicine}
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
               placeholder="Select medicine"
               style = {{border: "1.5px solid black",
              borderRadius: "10px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
           <Autocomplete
            id="country-select-demo"
            style = {{marginLeft: "18%"}}
            sx={{ width: 200 }}
            options={medicine}
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
               style = {{border: "1.5px solid black",
              borderRadius: "10px", }}
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
          </div>
    )
}

export default Selectors