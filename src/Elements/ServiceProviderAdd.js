import { rowsContext } from "../App";
import SelectCountry from "./SelectCountry";
import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  TextField,
  Snackbar,
  Typography,
  Divider,
  Alert,
  Dialog,
  Box,
} from "@mui/material";

export default function ServiceProviderAdd() {
  const func = useContext(rowsContext);
  const anchorOrigin = {
    vertical: "bottom",
    horizontal: "center",
  };
  const [Success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    company_name: "",
    country_name: "",
  };
  const validationSchema = Yup.object({
    company_name: Yup.string().required("Please enter Company Name."),
    country_name: Yup.object()
      .typeError("Please select Country.")
      .required("Please select Country."),
  });

  return (
    <Dialog open={true} fullWidth={true}>
      <Container maxWidth="sm" sx={{ backgroundColor: "white" }}>
        <Typography
          variant="h6"
          sx={{ padding: "10px 0px ", fontWeight: "bold", color: "#1b3e67" }}
        >
          Create Service Provider
          <CloseIcon
            sx={{ float: "right", fontSize: "18px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Typography>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newData = {
              id: 0,
              name: values.company_name,
              country: values.country_name.label,
              code: values.country_name.code,
            };

            const newArray = func.dataRows.map((row, index) => {
              return {
                ...row,
                id: index + 1,
              };
            });
            func.dataRows = [newData, ...newArray];
            func.funcHandleRows(func.dataRows);
            setSuccess(true);
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }}
        >
          {(formik) => (
            <Form>
              <Box>
                <TextField
                  sx={{ width: 350 }}
                  error={
                    formik.touched.company_name &&
                    Boolean(formik.errors.company_name)
                  }
                  name="company_name"
                  label="Company Name *"
                  helperText={
                    formik.touched.company_name && formik.errors.company_name
                  }
                  margin="normal"
                  size="small"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                />
                <SelectCountry formik={formik} />
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
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
      {Success && (
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={true}
          key={anchorOrigin.vertical + anchorOrigin.horizontal}
        >
          <Alert sx={{ width: "100%", background: "#0ba312" }}>
            The service provider has been successfully updated!
          </Alert>
        </Snackbar>
      )}
    </Dialog>
  );
}
