import { Button, TextField, TextareaAutosize, Typography } from "@material-ui/core"
import { useState } from "react"
import {MdOutlineDelete} from "react-icons/md"
import { constants } from "../../Helpers/constantsFile"
import axios from "axios"
import moment from "moment"
import RequestTests from "./RequestTest"
import PrintStuff from "./PrintStuff"
import PrintSingle from "./PrintSingle"
import { deleteFunction } from "../../funcrions/deleteStuff"
import Perscription from "./Form/Perscription"
import UpdataPerscription from "./UpdatePerscription"
import PrintPerscription from "./PrintPerscription"
import ResultsPrint from "./ResultsPrint"
import UrinePrint from "./UrinePrint"
import StoolPrint from "./StoolPrint"

const VisitDetail = (props) => {
    const [history, setHistory] = useState()
    const [diagnosis, setDiagnosis] = useState()
    const [requestTests, setRequestTests] = useState(false)
    const [showPrinter, setShowPrinter] = useState(false)
    const [showPrintPerscription, setShowPrintPerscription] = useState(false)
    const [showPrintSingle, setShowPrintSingle] = useState(false)
    const [singlePrint, setSinglePrint] = useState()
    const [result, setResult] = useState(false)
    const [showPerscription, setShowPerscription] = useState(false)
    const [showUpdatePerscription, setShowUpdatePerscription] = useState(false)
    const [showResultsPrint, setShowResultsPrint] = useState(false)
    const [showUrinePrint, setShowUrinePrint] = useState(false)
    const [showStoolPrint, setShowStoolPrint] = useState(false)


    console.log(history, diagnosis)
    console.log(props.data)
    
    const updateHandler = () => {
      axios.patch(`${constants.baseUrl}/visitors/${props.data?._id}`, {
        history: history,
        diagnosis: diagnosis
      },
    {
      headers: {
        "authorization": constants.token
      }
    }
    ).then((res) => {
      console.log(res.data?.data?.visitor)
      alert("Succesfully Updated!")
      props.change(res?.data?.data?.visitor)
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

        <Button
          style={{
            width: props.data?.prescription?.length > 0  ? "250px" : "190px",
            fontSize: "16px",
            height: "50px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={()=> {
            if (props.data?.prescription?.length > 0)
            return setShowUpdatePerscription(true)
            setShowPerscription(true)
          }}
          type="submit"
          variant="contained"
        >
       {props.data?.prescription?.length > 0 ? "Update Perscription" : "Perscribe"}
        </Button>
        </div>

        {requestTests && <RequestTests hideModal = {() => {
          setRequestTests(false)
          setShowPrinter(true)
        }}
        visitor = {props.data?._id}
        data = {props.data?.tests}
        newChange = {(data) => {
          props.newChange(data)
        }}
        />}

        {showPerscription && <Perscription hideModal = {() => {
          setShowPerscription(false)
        }} visitor = {props.data?._id}
        change = {(data) => {
          props.change(data)
        }}/>}

        {showUpdatePerscription && <UpdataPerscription hideModal = {() => {
          setShowUpdatePerscription(false)
        }} visitor = {props.data?._id} data = {props.data?.prescription}
        change = {(data) => {
          props.change(data)
        }}/>}

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
            }}> {props.data?.patient?.name}</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> {props.data?.patient?.phone} - {props.data.age} Jir</Typography>
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
    {props.data?.tests?.map(test => {
      return <RequestedTests data = {test} 
      printStuff = {(data, id) => {
        console.log(data)
        if (id == "result") setResult(true)
        if (id == "result") setSinglePrint(data)
        if (id == "print") setSinglePrint(data?.testItem)
        if (id == "urine") return setShowUrinePrint(true)
        if (id == "stool") return setShowStoolPrint(true)
        console.log(data?.testItem)
        setShowPrintSingle(true)}}
        newChange = {(data) => {
          props.newChange(data)
        }} 
        visitor = {props.data?._id}/>
    })}
    </div>

    {showPrinter && <PrintStuff hideModal = {() => {
        setShowPrinter(false)
        setResult(false)
      }} data = {props.data} singlePrint = {singlePrint}
      />}

      {showResultsPrint && <ResultsPrint hideModal = {() => {
        setShowResultsPrint(false)
      }} data = {props.data}/>}

    {showPrintPerscription && <PrintPerscription hideModal = {() => {
        setShowPrintPerscription(false)
      }} data = {props.data} />}

    {showPrintSingle && <PrintSingle hideModal = {() => {
        setShowPrintSingle(false)
        setResult(false)
      }} data = {props.data} singlePrint = {singlePrint}
      result = {result}/>}

      {showUrinePrint && <UrinePrint data = {props.data} hideModal = {() => {
        setShowUrinePrint(false)
      }}/>}
      {showStoolPrint && <StoolPrint data = {props.data} hideModal = {() => {
        setShowStoolPrint(false)
      }}/>}
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
          onClick={() => setShowPrinter(true)}
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
          onClick={() => {
            setShowResultsPrint(true)
          }}
          type="submit"
          variant="contained"
        >
         Print Tests Result
        </Button>
        <Button
          style={{
            width: "80%",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "black",
            color: "white",
          }}
          onClick={()=> setShowPrintPerscription(true)}
          type="submit"
          variant="contained"
        >
         Print Perscription
        </Button>
        </div>
    </div> 

    </div>
}

const RequestedTests = (props) => {

  const deleteTestFun = () => {
    deleteFunction(
      "Delete Test", props.data?.testItem?.name, `${constants.baseUrl}/tests/${props.data._id}`,
      async () => {
        await axios
      .get(
        `${constants.baseUrl}/visitors/${props?.visitor}`,
        {
          headers: {
            authorization: constants.token,
          },
        }
      )
      .then((res) => {
        props.newChange(res?.data?.data)
      })
      .catch((err) => {
        alert(err.response.data?.message);
      });
      },
      () => {
        
      }
    )
    }

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
            {props.data?.testItem?.name}
          </Typography>
    
          {/* <Typography style = {{
            fontSize: "16px",
            color: "#737373"
          }}>
            {moment(props.data?.date).format("YYYY-MM-DD")}
          </Typography> */}
    
          <MdOutlineDelete style = {{color: "red", fontSize: "20px",
        cursor: "pointer"}} 
        onClick = {() => deleteTestFun()}
        />
        </div>
    
        <div style = {{height: "1px", background: "lightGrey", width: "100%"}}> </div>
        </div>
    
        <Typography>
          {props.data?.response ? props.data?.response : "no response"}
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
              onClick={() => {
                props.printStuff(props.data, "print")
              }}
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
              onClick={() => {
                if (props.data?.testItem?.type?.toLowerCase() == "urine" || props.data?.testItem?.type?.toLowerCase() == "stool" )
                return props.printStuff(props.data, props.data?.testItem?.type?.toLowerCase())
                props.printStuff(props.data, "result")
              }}
            >
             Result
            </Button>
    
            </div>
        
      </div>
}

export default VisitDetail