import { Button, TextField, TextareaAutosize, Typography } from "@material-ui/core"

const VisitDetail = (props) => {
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
          type="submit"
          variant="contained"
        >
         Request Test
        </Button>
        </div>



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
            }}> {props.data.name}</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> {props.data?.phone} - {props.data.age} Jir</Typography>
            <Typography style = {{
                fontSize: "20px",
                color: "#696767"
            }}> {props.data?.date}</Typography>
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
                  defaultValue="Last time, you were not good"
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
                  defaultValue="Last time, you were not good"
                placeholder="Empty"
            />
            </div>
        </div>


    <Typography style = {{
                fontWeight: "600",
                fontSize: "26px",
                marginTop: "20px"
    }}> Requested Tests</Typography>  


    </div>
}

export default VisitDetail