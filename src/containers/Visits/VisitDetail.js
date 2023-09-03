import { Button, TextField, TextareaAutosize, Typography } from "@material-ui/core"
import { useState } from "react"
import {MdOutlineDelete} from "react-icons/md"
import { constants } from "../../Helpers/constantsFile"
import axios from "axios"
import moment from "moment"
import RequestTests from "./RequestTest"

const VisitDetail = (props) => {

    const [history, setHistory] = useState()
    const [diagnosis, setDiagnosis] = useState()
    const [requestTests, setRequestTests] = useState(false)

    console.log(history, diagnosis)
    console.log(props.data)
    
    const updateHandler = () => {
      axios.patch(`${constants.baseUrl}/visitors/${props.data.id}`, {
        history: history,
        diagnosis: diagnosis
      },
    {
      headers: {
        "authorization": constants.token
      }
    }
    ).then((res) => {
      alert("Succesfully Updated!")
      // dispach(addTest(res.data?.data?.test))
      // props.togglePrint(tableTestData)
      // dispach(setTableTestData([]))
      // props.hideModal()
    }).catch((err) => {
      alert(err.response?.data?.message)
    })
    }

    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: "95%",
        gap: "30px",
        margin: "auto",
      }}>
        
        <div style = {{display: "flex", flexDirection: "row", gap: "20px",
            marginTop: "20px"}}>
         <Button
          style={{
            width: "190px",
            fontSize: "16px",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={updateHandler}
          type="submit"
          variant="contained"
        >
         Upate Visit
        </Button>
         <Button
          style={{
            width: "190px",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          onClick = {() => setRequestTests(true)}
          type="submit"
          variant="contained"
        >
         Request Test
        </Button>
        </div>

        {requestTests && <RequestTests hideModal = {() => {
          setRequestTests(false)
        }}
        visitor = {props.data?.id}
        />}

        <div style = {{width: "100%", display: "flex", flexDirection: "row", gap: "20px"}}>
        <div style = {{
            width: "45.5%",
            padding: "25px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            background: "White",
        }}
        >
            
            <div style = {{display: "flex", width: "100%",
        justifyContent: "space-between", alignItems: "center", gap: "10px"}}>
          
            </div>
            <div style = {{cursor: "pointer"}}>

            <Typography style = {{
                fontWeight: "600",
                fontSize: "24px",
            }}> {props.data?.name}</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> {props.data?.phone} - {props.data.age} Jir</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> {moment(props.data?.date).format("YYYY-MM-DD")}</Typography>
            </div>

        </div>
        <div style = {{
            width: "45.5%",
            padding: "25px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            background: "White",
        }}
        >
            
            <div style = {{display: "flex", width: "100%",
        justifyContent: "space-between", alignItems: "center", gap: "10px"}}>
          
            </div>
            <div style = {{cursor: "pointer"}}>

            <Typography style = {{
                fontWeight: "600",
                fontSize: "26px",
            }}> 24</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> Tests Waiting</Typography>
           
            </div>

        </div>
            
        </div>  



        <div style = {{display: "flex", flexDirection: "row", gap: "20px"}}>
            <div style = {{width: "45.5%", display: "flex", flexDirection: "column",
        background: "white", padding: "0px",
        borderRadius: "10px 10px"}}> 
            <Typography style = {{
                fontWeight: "600",
                fontSize: "22px",
                padding: "15px 20px",
            }}> History Taken</Typography>
            <div style = {{height: "1px", background: "lightGray", width: "100%"}}> </div>
            <TextareaAutosize
                
                style = {{   padding: "15px 20px", fontSize: "20px",
                    border: "none"}}
                id="standard-textarea" 
                onChange={e => { setHistory(e.target?.value) }}
                  defaultValue= {props.data?.history}
                placeholder="Empty"
            />
            </div>
            <div style = {{width: "45.5%", display: "flex", flexDirection: "column",
        background: "white", padding: "0px",
        borderRadius: "10px 10px"}}> 
            <Typography style = {{
                fontWeight: "600",
                fontSize: "22px",
                padding: "15px 20px",
            }}> Diagnosis</Typography>
            <div style = {{height: "1px", background: "lightGray", width: "100%"}}> </div>
            <TextareaAutosize
                style = {{   padding: "15px 20px", fontSize: "20px",
                    border: "none"}}
                id="standard-textarea" 
                  defaultValue={props.data?.diagnosis}
                  onChange={e => { setDiagnosis(e.target?.value) }}
                placeholder="Empty"
            />
            </div>
        </div>


    <Typography style = {{
                fontWeight: "600",
                fontSize: "26px",
                marginTop: "20px"
    }}> Requested Tests</Typography> 

    <div style = {{display: "flex", gap: "20px", width: "100%"}}>
        <div style = {{display: "flex", gap: "20px", width: "65%",
    flexWrap: "wrap"}}>
    <RequestedTests/>
    <RequestedTests/>
    <RequestedTests/>
    </div>

    <div style = {{height: "183px", width: "2px", background: "lightGray"}}> </div> 

    <div style = {{display: "flex", flexDirection: "column", width: "30%",
gap: "20px"}}>
    <Button
          style={{
            width: "80%",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
         Print Tests Invoice
        </Button>

        <Button
          style={{
            width: "80%",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
         Print Tests Result
        </Button>
        </div>
    </div> 

    </div>
}

const RequestedTests = () => {

    return <div style = {{
        width: "45%",
        background: "white",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        alignItems: "center"
    
      }}>
        <div style = {{width: "100%", display: "flex",
      flexDirection: "column", gap: "4px"}}>
        <div style = {{display: "flex", 
        width: "100%", alignItems: "center",
      justifyContent: "space-between"}}>
          <Typography style = {{
            fontSize: "16px",
            fontWeight: "bold"
          }}>
            HIV
          </Typography>
    
          {/* <Typography style = {{
            fontSize: "16px",
            color: "#737373"
          }}>
            {moment(props.data?.date).format("YYYY-MM-DD")}
          </Typography> */}
    
          <MdOutlineDelete style = {{color: "red", fontSize: "20px",
        cursor: "pointer"}} 
        // onClick = {() => deleteTestFun()}
        />
        </div>
    
        <div style = {{height: "1px", background: "lightGrey", width: "100%"}}> </div>
        </div>
    
        <Typography>
          Negative
        </Typography>
    
        <div style = {{display: "flex", width: "100%",
      flexDirection: "row", gap: "12px", justifyContent: "space-between"}}>
      
        <Button
              //   disabled = {disable}
              style={{
                width: "45%",
                fontSize: "16px",
                backgroundColor: "white",
                color: "black",
                height: "40px",
                fontWeight: "bold",
              }}
              variant="contained"
            //   onClick={() => responseHandler()}
            >
              Print
            </Button>
        <Button
              //   disabled = {disable}
              style={{
                width: "45%",
                fontSize: "16px",
                backgroundColor: "white",
                color: "red",
                height: "40px",
                fontWeight: "bold",
              }}
              variant="contained"
            //   onClick={() => responseHandler()}
            >
             Delete
            </Button>
    
            </div>
        
      </div>
}

export default VisitDetail