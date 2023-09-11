import { Button, Typography } from "@material-ui/core";
import MyModal from "../../Modal/Modal"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";


const Urine = (props) => {

    const [physicalData, setPhysicalData] = useState()
    const [chemicalData, setChemicalData] = useState()
    const [microscopicalData, setMicroscopicalData] = useState()

    const handleSave = () => {
        axios.patch(`${constants.baseUrl}/tests/${props.testId}`, {
            urineResult: {
                response: [
                    {
                        name: "Physical Examination",
                        result: physicalData
                    },
                    {
                        name: "Chemical Examination",
                        result: chemicalData
                    },
                    {
                        name: "Microscopical Examination",
                        result: microscopicalData
                    },
                ]
            }
        }, 
            {
                headers: {
                  authorization: constants.token,
                },
              }
        ).then(res => {
            alert("Succesfully added urine")
            console.log(res?.data?.data)
        }).catch(err => {
            alert(err.response.data?.message);
        })
    }

    return ( 
        <MyModal
    onClose={() => props.hideModal()}
    pwidth="720px"
  //   pheight = "478px"
    top="15%"
    left="30%"
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "450px",
        // overflowY:  "none",
        alignItems: "center",
        gap: "15px",
        width: "700px",
        overFlowX: "hidden",
        padding: "15px",
     
      }}
    >
        {/* <Typography style = {{
            fontSize: "23px", fontWeight: "bold"
        }}> Urine Results</Typography> */}
        <div style = {{width: "100%", display: "flex", flexDirection: "row",
    justifyContent: "start", gap: "20px", flexWrap: "wrap"}}>


         <div style = {{width: "47%", display: "flex",
        flexDirection: "column", gap: "20px"}}> 
         <Physical data = {(data) => {
           setPhysicalData(data)
         }} />
         <Microscopical data = {(data) => {
           setMicroscopicalData(data)
         }}/>
         </div>

         <div style = {{width: "47%",  display: "flex",
        flexDirection: "column", gap: "20px"}}> 
         <Chemical data = {(data) => {
           setChemicalData(data)
         }}/>
          <Button
          //   disabled = {disable}
          style={{
            width: "200px",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "45px",
            fontWeight: "bold",
            marginTop: "10px"
          }}
          type="submit"
          variant="contained"
          onClick={() => handleSave()}
        >
          Save All
        </Button>
         </div>

         
       

        </div>

    </div>
  </MyModal>
);

}

const Physical = (props) => {

    const [inputStates, setInputStates] = useState({
        appearance: null,
        color: null,
        grossBlood: null
    })  

    const inputs = [
        {name: "appearance", placeholder: "Appearance", },
        {name: "color", placeholder: "Color"},
        {name: "grossBlood",placeholder: "Gross Blood"},
    ]

    const [results, setResults] = useState([])

    useEffect(() => {
        setResults([
            {key: "Appearance", value: inputStates.appearance},
            {key: "Color", value: inputStates.color},
            {key: "Gross Blood", value: inputStates.grossBlood},
        ])
    }, [inputStates])

    props.data(results)

    return (
        <div style = {{width: "98%", display: "flex",
        flexDirection: "row", gap: "10px", flexWrap: "wrap", 
        border: "1px solid grey", padding: "15px", borderRadius: "10px",
        background: "#F0F2FA",  alignSelf: "flex-start"
        }}>
            <Typography style = {{fontWeight: "bold",
        fontSize: "16px"}}> Physical Examination:</Typography>
        {inputs?.map((input, index) => {
            return    <input key = {index}
            name = {input.name}
            value = {input?.value}
            type="text"
            style={{
              width: "125px",
              height: "35px",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "8px",
              background: "white",
              border: "1px solid #6E6E6E",
            }}
            placeholder= {input.placeholder}
            onChange={(e) => {
                const value = e?.target?.value
                setInputStates((prevState) => {
                    return {
                      ...prevState,
                      [input.name]: value
                    };
                  });

            }}
          />
        })}
     
        </div>
    )
}
const Chemical = (props) => {

    const [inputStates, setInputStates] = useState({
        Leukocytes:  null,
        Nitrite: null,
        Urobilinogen: null,
        Protein: null,
        PH: null,
        OccultBlood: null,
        SpGravity: null,
        Keton: null,
        Glucose: null,
        Bilirubin: null
    })  

    const inputs = [
        {name: "Leukocytes", placeholder: "Leukocytes", },
        {name: "Nitrite", placeholder: "Nitrite"},
        {name: "Urobilinogen",placeholder: "Urobilinogen"},
        {name: "Protein", placeholder: "Protein", },
        {name: "PH", placeholder: "PH"},
        {name: "OccultBlood",placeholder: "Occult Blood"},
        {name: "SpGravity",placeholder: "Sp. Gravity"},
        {name: "Keton", placeholder: "Keton", },
        {name: "Glucose", placeholder: "Glucose"},
        {name: "Bilirubin",placeholder: "Bilirubin"},
    ]

    const [results, setResults] = useState([])

    useEffect(() => {
        setResults([
            {key: "Leukocytes", value: inputStates.Leukocytes },
            {key:  "Nitrite", value: inputStates.Nitrite},
            {key: "Urobilinogen", value: inputStates.Urobilinogen},
            {key: "Protein", value: inputStates.Protein },
            {key: "PH", value: inputStates.PH},
            {key:  "Occult Blood", value: inputStates.OccultBlood},
            {key:  "Sp. Gravity", value: inputStates.SpGravity},
            {key: "Keton", value: inputStates.Keton },
            {key: "Glucose", value: inputStates.Glucose},
            {key: "Bilirubin", value: inputStates.Bilirubin},
        ])
    }, [inputStates])

    props.data(results)

    return (
        <div style = {{width: "98%", display: "flex",
        flexDirection: "row", gap: "10px", flexWrap: "wrap", 
        border: "1px solid grey", padding: "15px", borderRadius: "10px",
        background: "#F0F2FA",  alignSelf: "flex-start"
        }}>
            <Typography style = {{fontWeight: "bold",
        fontSize: "16px"}}> Chemical Examination:</Typography>
        {inputs?.map((input, index) => {
            return    <input key = {index}
            name = {input.name}
            value = {input?.value}
            type="text"
            style={{
              width: "125px",
              height: "35px",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "8px",
              background: "white",
              border: "1px solid #6E6E6E",
            }}
            placeholder= {input.placeholder}
            onChange={(e) => {
                const value = e?.target?.value
                setInputStates((prevState) => {
                    return {
                      ...prevState,
                      [input.name]: value
                    };
                  });

            }}
          />
        })}
     
        </div>
    )
}
const Microscopical = (props) => {

    const [inputStates, setInputStates] = useState({
        WBC: null,
        RBC: null,
        EpithelialCells: null,
        Fungi: null,
        Casts: null,
        CrystAls: null,
        CrystAls: null,
        Parasite: null
    })  

    const inputs = [
        {name: "WBC", placeholder: "WBC", },
        {name: "RBC", placeholder: "RBC"},
        {name: "EpithelialCells",placeholder: "Epithelial Cells"},
        {name: "Fungi", placeholder: "Fungi", },
        {name: "Casts", placeholder: "Casts"},
        {name: "Crystals",placeholder: "Cryst als"},
        {name: "Parasite",placeholder: "Parasite"},
    ]

    const [results, setResults] = useState([])

    useEffect(() => {
        setResults([
            {key: "WBC", value: inputStates.WBC },
            {key:  "RBC", value: inputStates.RBC},
            {key: "Epithelial Cells", value: inputStates.EpithelialCells},
            {key: "Fungi", value: inputStates.Fungi },
            {key: "Casts", value: inputStates.Casts},
            {key:  "Cryst als", value: inputStates.CrystAls},
            {key:  "Parasite", value: inputStates.Parasite}
        ])
    }, [inputStates])

    console.log(inputStates)
    props.data(results)
    console.log(results)

    return (
        <div style = {{width: "98%", display: "flex",
        flexDirection: "row", gap: "10px", flexWrap: "wrap", 
        border: "1px solid grey", padding: "15px", borderRadius: "10px",
        background: "#F0F2FA",  alignSelf: "flex-start"
        }}>
            <Typography style = {{fontWeight: "bold",
        fontSize: "16px"}}> Microscopical Examination:</Typography>
        {inputs?.map((input, index) => {
            return    <input key = {index}
            name = {input.name}
            value = {input?.value}
            type="text"
            style={{
              width: "125px",
              height: "35px",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "8px",
              background: "white",
              border: "1px solid #6E6E6E",
            }}
            placeholder= {input.placeholder}
            onChange={(e) => {
                const value = e?.target?.value
                setInputStates((prevState) => {
                    return {
                      ...prevState,
                      [input.name]: value
                    };
                  });

            }}
          />
        })}
     
        </div>
    )
}


export default Urine