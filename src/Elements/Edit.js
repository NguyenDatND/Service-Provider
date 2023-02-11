import SelectCountry from "./SelectCountry";
import { useParams } from "react-router-dom";
import { Button, Container, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import React, { useState } from "react";

export default function Edit() {
  const { index } = useParams();
  const [Success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const formik = useFormik({
    initialValues: {
      Company_name: "",
      country: "",
    },
    validationSchema: Yup.object({
      Company_name: Yup.string().required("Please enter Company Name."),
      Country: Yup.string().required("Please select Country."),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
      {" "}
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
        maxWidth="sm"
        style={{ backgroundColor: "white" }}
      >
        <p style={{ fontWeight: "bold", color: "#1b3e67" }}>
          Edit Service Provider
          <CloseIcon
            style={{ float: "right", fontSize: "18px" }}
            onClick={() => navigate("/")}
          />
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              padding: "0px 24px",
              margin: "0 -24px",
              borderTop: "1px solid #3333",
              borderBottom: "1px solid #3333",
            }}
          >
            <TextField
              sx={{ width: 350 }}
              error={
                formik.touched.Company_name &&
                Boolean(formik.errors.Company_name)
              }
              name="Company_name"
              label="Company Name *"
              helperText={
                formik.touched.Company_name && formik.errors.Company_name
              }
              margin="normal"
              size="small"
              value={formik.values.Company_name}
              onChange={formik.handleChange}
            />
            <SelectCountry />
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
              onClick={handleSave}
              variant="contained"
              type="submit"
              style={{
                color: "#fff",
                fontWeight: "750",
                backgroundColor: "#1dc485",
                textTransform: "capitalize ",
                float: "right",
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Container>
      {Success && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            backgroundColor: "#11c441",
            paddingLeft: "50px",
            paddingRight: "15px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <p>
            {" "}
            <TaskAltIcon style={{ position: "absolute", left: "17px" }} />
            {`The service provider has been successfully updated`}.
          </p>
        </div>
      )}
    </div>
  );
}
