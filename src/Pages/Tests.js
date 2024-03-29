import { Button, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TestComponanats from "../containers/Tests/TestComponants";
import TestDetails from "../containers/Tests/TestDetails";
import TestPopUp from "../containers/Tests/Form/Popup";
import TestPrint from "../containers/Tests/TestPrint";
import { setPatients } from "../redux/actions/patientsActions";
import useFetch from "../funcrions/DataFetchers";
import { setTests } from "../redux/actions/testsActions";
import { useEffect } from "react";
import Register from "../utils/Register";

const Tests = () => {

    const patients = useSelector(state => state.patients.patients)
    const [testDetails, setTestDetails] = useState(false)
    const [query, setQuery] = useState("");
    const [details, setDetails] = useState(false)
    const [newTests, setNewTests] = useState(false)
    const [buttonName, setButtonName] = useState("Add New Patients");
    const activeUser = useSelector(state => state.activeUser.activeUser)
    const [testPrint, setTestPrint] = useState(false)
    const [apiData, setApiData] = useState()
    const [patientData, setPatientData] = useState()
    const [patientInfo, setPatientInfo] = useState()
    const [del, setDel] = useState(1)
    const [newPatient, setNewPatient] = useState(false)

    const fields = [
      { label: "Enter Name", type: "text", name: "name" },
      { label: "Enter Phone", type: "text", name: "phone" },
      { label: "Enter Age", type: "text", name: "age" },
      { label: "Enter Address", type: "text", name: "district" },
    ];

    const tests = useSelector(state => state.tests.tests)

    useEffect( () => {
      console.log(tests)
    }, [tests])
    

    const addTestHandler = () => {
      setQuery("");
      if (buttonName == "Add New Patients") {
        // setNewCustomers(true);
        // setNewTests(true)
        setNewPatient(true)
        // setButtonName("Go To Tests")
        return;
      } else if (buttonName == "Go To Patients") {
        setTestDetails(false)
        setButtonName("Add New Patients");
      }
    };

    const handler = (data) => { 
      if (data?.length > 0) {
          return data.filter((std) => {
            return (std.name.toLowerCase().includes(query.toLowerCase()) ||
            std.patientId.toString().toLowerCase().includes(query.toLowerCase()) )
          });
    } else {
        return
      }  
    };

    const dispatch = useDispatch()

    dispatch(
      setPatients(
        useFetch("patients", del, "patients")
      )
    );
    // dispatch(
    //   setTests(
    //     useFetch("tests", del, "tests")
    //   )
    // );

    useEffect(() => {

    }, [del])
  

    return (
        <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      {!testPrint && <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
          {" "}
          {!testDetails
            ? "Patients"
            : "Pateints Details"}
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#5130DE",
            color: "white",
            fontWeight: "bold",
            height: "45px",
            fontWeight: "bold"
          }}
          onClick={() => {
            if (activeUser.privillages.includes("Tests"))
              addTestHandler();
            else alert("You have no access!");
          }}
          startIcon={
            testDetails ? (
              <BiArrowBack
                style={{
                  color: "white",
                }}
              />
            ) : (
              <MdAdd
                style={{
                  color: "white",
                }}
              />
            )
          }
        >
          {buttonName}
        </Button>
      </div>}

      {(!testDetails && !testPrint) && <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "20px",
            background: "white",
            width: "95.3%",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "400px",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
        
        </div>}

        {(!testDetails && !testPrint ) && <TestComponanats  
        data = {handler(patients)} divClick = {(data)=> {
          setTestDetails(true)
          setButtonName("Go To Patients")
          setPatientData(data)
        }}
        change = {() => {
          setDel(state => state + 1)
        }}/> }
        {testDetails && <TestDetails data = {patientData} 
        change = {(data) => {
          // if (stuff == "update") setTestDetails(false)
          setDel(state => state + 1)
          setPatientData(data)
        }}/> }

        {newTests && (
       <TestPopUp hideModal = { ()=> {
        setNewTests(false)
        setDel(state => state + 1)
       }}  
       change = {() => {
        setDel(state => state + 1)
      }}
       togglePrint = {(data)=> {
        setTestPrint(true)
        setApiData(data)
       }}
      //  change={changeHandler} 
      //  update = {update}
      //  instance={updatedCustomer}
       />
      )}

{newPatient && (
          <Register
            //   update={update}
            //   instance={updatedCustomer}
            //   reset={resetFomr}
            hideModal={(data) => {
              setNewPatient(false);
              setDel(state => state + 1)
            }}
            fields={fields}
            url="patients"
            name="Patient"
            //   change={() => changeHandler()}
            //   addCus = {(customer) => addCus(customer)}
          />
        )}

      {testPrint && <TestPrint apiData = {apiData} patientInfo = {patientInfo}
      goBack = {() => {
        setTestPrint(false)
      }}/>}
        </div>
    )
}

export default Tests