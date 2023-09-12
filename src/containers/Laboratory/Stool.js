import { Button, Typography } from "@material-ui/core";
import MyModal from "../../Modal/Modal"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";


const Stool = (props) => {

    const [physicalData, setPhysicalData] = useState()
    const [microscopicalData, setMicroscopicalData] = useState()

    const handleSave = () => {
        axios.patch(`${constants.baseUrl}/tests/${props.testId}`, {
            stoolResult: {
                response: [
                    {
                        name: "Physical Examination",
                        result: physicalData
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
            alert("Succesfully added stool")
            props.hideModal()
        }).catch(err => {
            alert(err.response.data?.message);
        })
    }

    return ( 
        <MyModal
    onClose={() => props.hideModal()}
    pwidth="760px"
  //   pheight = "478px"
    top="15%"
    left="28%"
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "450px",
        // overflowY:  "none",
        alignItems: "center",
        gap: "15px",
        width: "740px",
        overFlowX: "hidden",
        padding: "15px",
     
      }}
    >
        {/* <Typography style = {{
            fontSize: "23px", fontWeight: "bold"
        }}> Urine Results</Typography> */}
        <div style = {{width: "100%", display: "flex", flexDirection: "row",
    justifyContent: "start", gap: "20px", flexWrap: "wrap"}}>


         <div style = {{width: "40%", display: "flex",
        flexDirection: "column", gap: "20px"}}> 
         <Physical data = {(data) => {
           setPhysicalData(data)
         }} />
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

         <div style = {{width: "57%",  display: "flex",
        flexDirection: "column", gap: "20px"}}> 
          <Microscopical data = {(data) => {
           setMicroscopicalData(data)
         }}/>
        
         </div>    

        </div>

    </div>
  </MyModal>
);

}

const Physical = (props) => {

    const [inputStates, setInputStates] = useState({
        consistency: null,
        color: null,
        grossBlood: null
    })  

    const inputs = [
        {name: "color", placeholder: "Color"},
        {name: "consistency", placeholder: "Consistency", },
        {name: "grossBlood",placeholder: "Gross Blood"},
    ]

    const [results, setResults] = useState([])

    useEffect(() => {
        setResults([
            {key: "Color", value: inputStates.color},
            {key: "Consistency", value: inputStates.consistency},
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
              width: "100px",
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
        AncylostomaDuodenale: null,
        AscarisLumbricoides: null,
        EnterobiusVermicularis: null,
        HymenolepisNana: null,
        SchistosomaHaematobium: null,
        TrichurisTrichiura: null,
        EntamoebaHistolyticaCyst: null,
        EHistolyticaTrophozoite: null,
        GiardialambliaCyst: null,
        GiardialambliaTrophozoite: null,
        WBC: null,
        RBC: null,
    })  

    const inputs = [
        {name: "AncylostomaDuodenale", placeholder: "Ancylostoma duodenale", },
        {name: "AscarisLumbricoides", placeholder: "Ascaris lumbricoides"},
        {name: "EnterobiusVermicularis",placeholder: "Enterobius vermicularis"},
        {name: "HymenolepisNana", placeholder: "Hymenolepis nana", },
        {name: "SchistosomaHaematobium", placeholder: "Schistosoma haematobium"},
        {name: "TrichurisTrichiura",placeholder: "Trichuris trichiura"},
        {name: "EntamoebaHistolyticaCyst",placeholder: "Entamoeba histolytica Cyst"},
        {name: "EHistolyticaTrophozoite", placeholder: "E.histolytica Trophozoite"},
        {name: "GiardialambliaCyst",placeholder: "GiardialambliaCyst"},
        {name: "GiardialambliaTrophozoite", placeholder: "Giardialamblia Trophozoite", },
        {name: "WBC", placeholder: "WBC"},
        {name: "RBC",placeholder: "RBC"},
    ]
       

    const [results, setResults] = useState([])

    useEffect(() => {
        setResults([
            {key: "Ancylostoma duodenale", value: inputStates.AncylostomaDuodenale },
            {key:  "Ascaris lumbricoides", value: inputStates.AscarisLumbricoides},
            {key: "Enterobius vermicularis", value: inputStates.EnterobiusVermicularis},
            {key: "Hymenolepis Nana", value: inputStates.HymenolepisNana },
            {key: "Schistosoma haematobium", value: inputStates.SchistosomaHaematobium},
            {key:  "Trichuris trichiura", value: inputStates.TrichurisTrichiura},
            {key:  "Entamoeba histolytica Cyst", value: inputStates.EntamoebaHistolyticaCyst},
            {key:  "E.histolytica Trophozoite", value: inputStates.EHistolyticaTrophozoite},
            {key:  "GiardialambliaCyst", value: inputStates.GiardialambliaCyst},
            {key:  "Giardialamblia Trophozoite", value: inputStates.GiardialambliaTrophozoite},
            {key:  "WBC", value: inputStates.WBC},
            {key:  "RBC", value: inputStates.RBC},
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
              width: "170px",
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


export default Stool