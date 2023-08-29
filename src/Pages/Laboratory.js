import { Button, Typography } from "@material-ui/core";

const Laboratory = () => {
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
          cursor: "pointer",
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
        <div style = {{height: "100px", background: "blue", width: "90px",
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
          24
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
          cursor: "pointer",
          background: "white",
          padding: "20px",
          width: "50%",
          borderRadius: "10px",
        }}
      >
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "26px",
          }}
        >
          {" "}
          24
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

      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <Sections />
        <Sections />
        <Sections />
      </div>
    </div>
  );
};

const Sections = () => {
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
          {" "}
          Mohamed Osman
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          96163783883 - 34 Jir
        </Typography>
        <Typography
          style={{
            fontSize: "20px",
            color: "#696767",
          }}
        >
          {" "}
          2022/8/30
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
            3
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
        <TestStatus />
        <TestStatus />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              padding: "8px 15px",
              background: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          >
            {" "}
            Print
          </div>
          <div
            style={{
              padding: "8px 15px",
              background: "white",
              border: "1px solid lightgray",
              borderRadius: "10px",
            }}
          >
            {" "}
            View All
          </div>
        </div>
        <Button
          style={{
            width: "180px",
            fontSize: "16px",
            fontWeight: "bold",
            height: "50px",
            backgroundColor: "#5130DE",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Add Result
        </Button>
      </div>
    </div>
  );
};

const TestStatus = () => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Typography
        style={{
          color: "grey",
          fontSize: "20px",
        }}
      >
        {" "}
        MALARIA -
      </Typography>
      <Typography
        style={{
          color: "green",
          fontSize: "20px",
        }}
      >
        ready
      </Typography>
    </div>
  );
};

export default Laboratory;
