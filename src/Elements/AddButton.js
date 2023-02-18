import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
export default function Add() {
  return (
    <Link to="/AddNew">
      <Button
        style={{
          position: "absolute",
          backgroundColor: "#004683",
          right: "0",
          top: "-50px",
        }}
        variant="contained"
      >
        <AddIcon /> Add New
      </Button>
    </Link>
  );
}
