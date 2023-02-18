import { RowsContext } from "../App";
import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import { Button, Container, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function AddNew() {
  const obj = useContext(RowsContext);
  const [Success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    Company_name: "",
    Country: "",
  };
  const validationSchema = Yup.object({
    Company_name: Yup.string().required("Please enter Company Name."),
    Country: Yup.object().required("Please select Country."),
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
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
        maxWidth="sm"
        style={{ backgroundColor: "white" }}
      >
        <p style={{ fontWeight: "bold", color: "#1b3e67" }}>
          Create Service Provider
          <CloseIcon
            style={{ float: "right", fontSize: "18px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newObj = {
              Name: values.Company_name,
              Country: values.Country.label,
            };
            obj.b = [newObj, ...obj.b];
            obj.a(obj.b);
            setSuccess(true);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
        >
          {(formik) => (
            <Form>
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
                <SelectCountry formik={formik} />
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
            </Form>
          )}
        </Formik>
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
