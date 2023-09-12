import { Button, FormControl, Select, TextField, Typography } from "@material-ui/core";
import test from "../../src/assets/images/test.png"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import AddResults from "../containers/Laboratory/AddResults";
import { setVisitors } from "../redux/actions/vistorsActions";
import useFetch from "../funcrions/DataFetchers";
import ResultsPrint from "../containers/Visits/ResultsPrint";
import Urine from "../containers/Laboratory/Urine";
import UrinePrint from "../containers/Visits/UrinePrint";
import Stool from "../containers/Laboratory/Stool";
import StoolPrint from "../containers/Visits/StoolPrint";

const Laboratory = () => {

  const tests = useSelector(state => state.visitors.visitors)
  const [del, setDel] = useState(1)
  const dispatch = useDispatch()
  const [showResults, setShowResults] = useState(false)
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("MM-DD-YYYY"))
  const [labTests, setLabTests] = useState()
  

  const handler = (data) => {
    console.log(data)
    if (data?.length > 0) {
        return data.filter((std) => {
           if (std.tests?.length < 1) return
           return (std.patient?.name?.toLowerCase().includes(query) )
    });

    } else {
      return;
    }
  };

  const AddResultHandler = () => {
    setShowResults(true)
  }

  dispatch(
    setVisitors(
      useFetch(`visitors/get-visitors-with-tests/${startDate}/${endDate}`, del, "visitors")
    )
  );
  
  let readyTests = 0
  let waitingTests = 0
  let visitorTests = []
  tests?.map(test => {
    visitorTests.push(test.tests)
  })

  visitorTests?.flat().map(v => {
    if (v.testItem?.type.toLowerCase() == "urine" || v.testItem?.type.toLowerCase() == "stool") return
    if (v.response) readyTests += 1
    if (!v.response) waitingTests += 1
    })

  console.log(visitorTests)
  console.log(readyTests, waitingTests)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        width: "95%",
        margin: "auto",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "30px" }}>
        Laboratory
      </Typography>

      <div style = {{display: "flex", flexDirection: "row", width: "80%",
    gap: "20px"}}>
      <div
        style={{
          background: "white",
          padding: "20px",
          width: "50%",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <div style = {{height: "100px", 
        backgroundImage: `url(${test})`, backgroundSize: "cover", width: "100px",
    borderRadius: "10px"}}> </div>

        <div style = {{display: "flex", flexDirection: "column"}}>
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "26px",
            color: "red"
          }}
        >
          {" "}
          {waitingTests}
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          Tests Waiting Result
        </Typography>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          width: "50%",
          borderRadius: "10px",
          display: "flex",
          gap: "15px",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <div style = {{height: "100px", 
        backgroundImage: `url(${test})`, backgroundSize: "cover", width: "100px",
    borderRadius: "10px"}}> </div>

        <div style = {{display: "flex", flexDirection: "column"}}>
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "26px",
          }}
        >
          {" "}
          {readyTests}
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          Ready Results
        </Typography>
        </div>
      </div>

      </div>
        
      <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "25px",
            background: "white",
            width: "100%",
            margin: "auto",
            marginTop: "0px",
            border: "1px solid lightGrey",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "400px",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />

<div style = {{width: "40%", display: "flex", gap: "20px"}}>
      <TextField
            variant="outlined"
            type="date"
            label = "Start Date"
            value= {moment(new Date(startDate)).format("YYYY-MM-DD")}
            style={{ width: "50%", background: "white" }}
            onChange={(e) => {
                setStartDate(e.target.value)
                // setView(state => state + 1)
            }}
          />
          <TextField
             variant="outlined"
            type="date"
            label = "End Date"
            value= {moment(new Date(endDate)).format("YYYY-MM-DD")}
            placeholder="Search"
            style={{ width: "50%", background: "white" }}
            onChange={(e) => {
                setEndDate(e.target.value)
                // setView(state => state + 1)
            }}
          />
{/* 
        <Button
          style={{
            width: "28%",
            fontSize: "16px",
            fontWeight: "bold",
            height: "40px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          onClick = {() => alert("View your stuff")}
          variant="contained"
        >
          View
        </Button> */}

          </div>
          
        </div>

        {showResults && <AddResults hideModal = {() => {
          setShowResults(false)
          setDel(state => state + 1)
        }} data = {labTests}/>}

      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      {handler(tests)?.reverse().map(test => {
        return <Sections data = {test} addResult = {(data) => {
          AddResultHandler()
          setLabTests(data)
        }}
        refresh = {() => {
          setDel(state => state + 1)
        }}/>
      })}
      </div>
    </div>
  );
};



const Sections = (props) => {

  const [showPrintResults, setShowPrintResults] = useState(false)
  const [showUrine, setShowUrine] = useState(false)
  const [showUrinePrint, setShowUrinePrint] = useState(false)
  const [showStool, setShowStool] = useState(false)
  const [showStoolPrint, setShowStoolPrint] = useState(false)
  const [testId, setTestId] = useState()

  return (
    <div
      style={{
        width: "100%",
        background: "white",
        padding: "30px",
        display: "flex",
        borderRadius: "10px",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{}}>
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "24px",
          }}
        >
          {props.data?.patient?.name}
      
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          {props.data?.patient?.phone} - {props.data?.patient?.age} Jir
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          {moment(props.data?.date).format("YYYY-MM-DD")}
        </Typography>
      </div>

      <div style={{}}>
        <div style={{ display: "flex", gap: "5px" }}>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "24px",
              color: "red",
            }}
          >
            {" "}
            {props.data?.tests?.length}
          </Typography>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "24px",
            }}
          >
            {" "}
            Test(s)
          </Typography>
        </div>
        {props.data?.tests?.map(test => {
          if (test.testItem?.type.toLowerCase() == "urine" || test.testItem?.type.toLowerCase() == "stool" ) return
          return <TestStatus data = {test} />
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              padding: "8px 15px",
              background: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
              color: "grey"
            }}
            onClick = {() => setShowPrintResults(true)}
          >
            {" "}
            Print Test Results
          </div>
          {/* <div
            style={{
              padding: "8px 15px",
              background: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          >
            {" "}
            View All
          </div> */}
        </div>
        {showPrintResults && <ResultsPrint data = {props.data} hideModal = {() => {
        setShowPrintResults(false)
      }}/>}
        <Button
          style={{
            width: "180px",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          onClick = {() => props.addResult(props.data?.tests)}
          type="submit"
          variant="contained"
        >
          Add Result
        </Button>
        <div style={{ display: "flex", gap: "10px",  width: "180px", }}>
        {props.data?.tests.map(t => {
          if (t.testItem?.type == "urine") return ( 
          <><p style = {{
            width: "48%", textAlign: "center",
            padding: "5px 16px", border: "1px solid grey", borderRadius: "5px",
            margin: "0px", cursor: "pointer"
          }}
          onClick={() => {
            setTestId(t?._id)
            setShowUrine(true)
          }}> URINE</p>
          
          <p style = {{
            width: "48%", textAlign: "center",
            padding: "5px 16px", border: "1px solid grey", borderRadius: "5px",
            margin: "0px", cursor: "pointer"
          }}
          onClick={() => {
            setTestId(t?._id)
            setShowUrinePrint(true)
          }}> Print</p></>)
        })}
        {showUrine && <Urine testId = {testId} hideModal = {() => {
          setShowUrine(false)
          props.refresh()
        }} />}
        {showUrinePrint && <UrinePrint data = {props.data} hideModal = {() => {
          setShowUrinePrint(false)
        }} />}
        </div>
        <div style={{ display: "flex", gap: "10px",  width: "180px", }}>
        {props.data?.tests.map(t => {
          if (t.testItem?.type == "stool") return ( 
          <><p style = {{
            width: "48%", textAlign: "center",
            padding: "5px 16px", border: "1px solid grey", borderRadius: "5px",
            margin: "0px", cursor: "pointer"
          }}
          onClick={() => {
            setTestId(t?._id)
            setShowStool(true)
          }}> STOOL</p>
          
          <p style = {{
            width: "48%", textAlign: "center",
            padding: "5px 16px", border: "1px solid grey", borderRadius: "5px",
            margin: "0px", cursor: "pointer"
          }}
          onClick={() => {
            setTestId(t?._id)
            setShowStoolPrint(true)
          }}> Print</p></>)
        })}
        {showStool && <Stool testId = {testId} hideModal = {() => {
          setShowStool(false)
          props.refresh()
        }} />}
        {showStoolPrint && <StoolPrint data = {props.data} hideModal = {() => {
          setShowStoolPrint(false)
        }} />}
        </div>
      </div>
    </div>
  );
};

const TestStatus = (props) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Typography
        style={{
          color: "grey",
          fontSize: "20px",
        }}
      >
        {" "}
        {props.data?.testItem?.name} -
      </Typography>
      <Typography
        style={{
          color: props.data?.response ? "green" : "red",
          fontSize: "20px",
        }}
      >
        {props.data?.response ? "ready" : "waiting"}
      </Typography>
    </div>
  );
};

export default Laboratory;
