import { useParams } from "react-router-dom";
import { Button, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Del({ prop }) {
  const { index } = useParams();
  console.log(index);
  const handleDel = () => {
    // console.log("xin chao");
  };
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      style={{
        backgroundColor: "rgba(0,0,0,.3)",
        position: "fixed",
        top: "0",
        right: "0",
        left: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
        maxWidth="sm"
        style={{ backgroundColor: "white" }}
      >
        <h3 style={{ fontWeight: "bold", color: "#1b3e67" }}>
          Delete Service Provider
          <CloseIcon
            style={{ float: "right", fontSize: "18px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </h3>
        <div
          style={{
            padding: "0px 24px",
            margin: "0 -24px",
            borderTop: "1px solid #3333",
            borderBottom: "1px solid #3333",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#333" }}>
            Are you sure you want to delete this Service Provider?
          </p>
        </div>

        <div style={{ padding: "15px 0" }}>
          <Button
            variant="contained"
            onClick={(e) => navigate("/")}
            style={{
              color: "#1b3e67",
              fontWeight: "750",
              backgroundImage: "linear-gradient(0, #ded9d9, #fff)",
              textTransform: "capitalize ",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDel}
            style={{
              color: "#fff",
              fontWeight: "750",
              backgroundColor: "red",
              textTransform: "capitalize ",
              float: "right",
              paddingLeft: "34px",
            }}
          >
            <DeleteOutlineIcon
              fontSize="small"
              style={{
                position: "absolute",
                left: "12px",
                top: "7px",
              }}
            />
            Delete
          </Button>
        </div>
      </Container>
    </div>
  );
}
