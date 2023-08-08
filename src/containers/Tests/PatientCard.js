import { Typography } from "@mui/material"

const PatientCard = (props) => {

    return (
        <div style = {{
            width: "31.5%",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            background: "White",
            borderBottom: "6px solid #4421DE",
            cursor: "pointer"
        }}
        onClick = {()=> props.divClick(props.data)}>
            <Typography style = {{
                fontWeight: "700",
                fontSize: "20px",
                color: "#4421DE"
            }}> 00{props.data?.patientId}</Typography>
            <Typography style = {{
                fontWeight: "600",
                fontSize: "18px",
            }}> {props.data.name}</Typography>
            <Typography style = {{
                fontSize: "18px",
                color: "#696767"
            }}> {props.data?.phone} - {props.data.age} Jir</Typography>

        </div>

    )
}

export default PatientCard