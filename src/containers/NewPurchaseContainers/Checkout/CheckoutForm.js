import { Button, Typography } from "@material-ui/core";


const CheckoutForm = () => {

    return (
        <div
        style={{
            width: "98%",
            background: "white",
            boxShadow: "inset 2px 2px 4px 0 rgba(0, 0, 0, 0.2)",
            height: "120px",
            borderRadius: "10px",
            padding: "10px 40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "50px",
          }}>
            <div style = {{display: "flex", gap: "45px"}}>
            <Item/>
            <Item/>
            <Item/>
            </div>
            <Button
          style={{
            width: "200px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#4421DE",
            height: "50px",
            color: "white",
            marginTop: "20px",
          }}
          type="submit"
          variant="contained"
        >
         Complete
        </Button>
        </div>
    )
}

const Item = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // padding: "25px 40px",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Total:
        </Typography>
        <input
          // value={name}
          type="text"
          style={{
            width: "150px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid black",
          }}
          // onChange={(e) => setName(e.target.value)}
        />
      </div>
    );
  };

export default CheckoutForm