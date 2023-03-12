import { Typography } from "@material-ui/core";

const PriceBox = () => {
  return (
    <div
      style={{
        width: "45%",
        height: "240px",
        borderRadius: "10px",
        border: "2px solid #C9C7C7",
        background: "#F6F6F6",
        padding: "25px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

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
        Unit Cost:
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

export default PriceBox;
