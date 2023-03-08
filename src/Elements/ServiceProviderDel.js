import { rowsContext } from "../App";
import { React, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function serviceProviderDel() {
  const func = useContext(rowsContext);
  const { index } = useParams();

  const handleDel = () => {
    const copyArray = [...func.dataRows];
    copyArray.splice(index, 1);
    const newArray = copyArray.map((row, Index) => {
      if (Index >= index) {
        return {
          ...row,
          id: row.id - 1,
        };
      }
      return row;
    });
    func.funcHandleRows(newArray);
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <Dialog open={true} fullWidth={true}>
      <Container maxWidth="sm" sx={{ backgroundColor: "white" }}>
        <Typography
          variant="h6"
          sx={{ padding: "10px 0px ", fontWeight: "bold", color: "#1b3e67" }}
        >
          Delete Service Provider
          <CloseIcon
            sx={{ float: "right", fontSize: "18px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Typography>
        <Divider />
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ padding: "10px 0px ", fontWeight: "bold", color: "#333" }}
          >
            Are you sure you want to delete this Service Provider?
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "15px 0" }}>
          <Button
            variant="contained"
            onClick={(e) => navigate("/")}
            sx={{
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
              sx={{
                position: "absolute",
                left: "12px",
                top: "7px",
              }}
            />
            Delete
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
}
