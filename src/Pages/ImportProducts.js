import axios from "axios"
import { constants } from "../Helpers/constantsFile"
import { useState } from "react"


const ImportProducts = () => {

  const [customers, setCustomers] = useState([])
  const [vendors, setVendors] = useState([])
  const [transactions, setTransactions] = useState([])
  
  const getCustomers = async () => {

    // Notification.requestPermission().then(result => {
    //   new Notification("This is the main event", {
    //     body: "It is tiimeee! for you to shut the hell up!",
    //     tag: "HI"
    //   })
    // })

    const response = await axios
    .get(`http://sharp-hamilton.45-90-223-247.plesk.page/api/v1/users/migrate/63eca34269b83dac25e53732`, {
      headers: {
        'authorization': constants.token
       },
    }).then(res => {
      alert("Success")
      // setCustomers(res.data?.data?.customers)
      // setVendors(res.data?.data?.vendors)
      // setTransactions(res.data?.data?.transactions)
    }).catch(err => {
      alert(err.response?.data?.message)
    })
  }

  
  const storeCustomers = () => {
    axios.post(`${constants.baseUrl}/customers`, customers,{
      headers: {
        "authorization": constants.token
      }
    }).then(res => {
      alert("Successfully stored customers")
    }).catch(err => {
      alert(err.response?.data?.message)
    })
    axios.post(`${constants.baseUrl}/vendors`, vendors,{
      headers: {
        "authorization": constants.token
      }
    }).then(res => {
      alert("Successfully stored vendors")
    }).catch(err => {
      alert(err.response?.data?.message)
    })
    axios.post(`${constants.baseUrl}/transactions/create-multiple-transactions`, transactions,{
      headers: {
        "authorization": constants.token
      }
    }).then(res => {
      alert("Successfully stored customers")
    }).catch(err => {
      alert(err.response?.data?.message)
    })
  }


  return (
    <div>
      this is the main event
      <button onClick={()=> getCustomers()}>
        Get customers
      </button>

      <button onClick={()=> storeCustomers()}>
        store them
      </button>
      </div>
  )
}

export default ImportProducts









// import { Button } from "@material-ui/core";
// import axios from "axios";
// import React, {useState} from "react";
// import * as XLSX from 'xlsx'
// import { constants } from "../Helpers/constantsFile";

// const parentDivStyle = { display: "flex", alignItems: "center",
// justifyContent: "space-between",  gap: "0px", padding: "20px",
// background: "white", width: "95%", margin: "auto",
// marginTop: "20px", borderRadius: "8px 8px 0px 0px",
// flexDirection: "column"
// }

// const ImportProducts = () => {
//     const [excelFile, setExcelFile]=useState(null);
//     const [excelFileError, setExcelFileError]=useState(null);  
//     const [excelData, setExcelData]=useState(null);
//     const fileType=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];


//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         console.log("It is called")
//         if(excelFile!==null){
//           const workbook = XLSX.read(excelFile,{type:'buffer'});
//           const worksheetName = workbook.SheetNames[0];
//           const worksheet=workbook.Sheets[worksheetName];
//           const data = XLSX.utils.sheet_to_json(worksheet);
//           setExcelData(data);
//         }
//         else{
//           setExcelData(null);
//         }
//       }

     

//     const handleFile = (e)=>{
//         let selectedFile = e.target.files[0];
//         console.log(selectedFile)
//         if(selectedFile){
//           // console.log(selectedFile.type);
//           if(selectedFile&&fileType.includes(selectedFile.type)){
//             let reader = new FileReader();
//             reader.readAsArrayBuffer(selectedFile);
//             reader.onload=(e)=>{
//               setExcelFileError(null);
//               setExcelFile(e.target.result);
//             } 
            
//         }
//         else{
//             setExcelFileError('Please select only excel file types');
//             setExcelFile(null);
//         }
//     }
//     else{
//         console.log('plz select your file');
//     }
   
//       }

//       const uploadHandler = () => {
//         axios.post(`${constants.baseUrl}/products`, excelData,
//       {
//         headers: {
//           "authorization": constants.token
//         }
//       }).then(()=> {
//             alert("Successfully imported")
//         }).catch((err)=> {
//             alert(err.response?.data?.message)
//         })
//       }

     

//     return (

//         <div style={parentDivStyle}>

//       <form autoComplete="off"
//         onSubmit={handleSubmit}>
//           <label><h5>Upload Excel file</h5></label>
//           <br></br>
//           <input type='file' className='form-control'
//           onChange={handleFile} required></input>                  
//           {excelFileError&&<div className='text-danger'
//           style={{marginTop:5+'px'}}>{excelFileError}</div>}
//           <button type='submit' className='btn btn-success'
//           style={{marginTop:5+'px'}}>Submit</button>
//         </form>

//         {excelData?.map(data => (
//             <div style={{display: "flex", gap: "20px",
//             width: "40%", justifyContent: "space-between"}}>
//                 <p> {data.name}</p>
//                 <p> {data.quantity}</p>
//                 <p> {data.unitPrice}</p>
//                 <p> {data.salePrice}</p>
//                 <p> {data.category}</p>
//                 <p> {data.packSize}</p>
//                 <p> {data.unitMeasurment}</p>
//             </div>
//         ))}

//         <Button onClick = {uploadHandler}
//         variant = "contained" style = {{background: "blue"}}>
//             Upload
//         </Button>

//         </div>
//     )
// }

// export default ImportProducts