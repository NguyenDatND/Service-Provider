import SelectCountry, { countries } from "./SelectCountry";
import { rowsContext } from "../App";
import { React, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  TextField,
  Snackbar,
  Typography,
  Alert,
  Divider,
  Dialog,
  Box,
} from "@mui/material";

export default function ServiceProviderEdit() {
  const func = useContext(rowsContext);
  const anchorOrigin = {
    vertical: "bottom",
    horizontal: "center",
  };
  const { index } = useParams();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    company_name: `${func.dataRows[index].name}`,
    country_name: countries.find(
      (item) => item.code == func.dataRows[index].code
    ),
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
          Edit Service Provider
          <CloseIcon
            sx={{
              float: "right",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
        </Typography>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const copyArray = [...func.dataRows];
            copyArray[index] = {
              id: Number(index),
              name: values.company_name,
              country: values.country_name.label,
              code: values.country_name.code,
            };
            func.funcHandleRows(copyArray);
            setSuccess(true);
            setTimeout(() => {
              navigate("/");
            }, 2000);
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
                  sx={{
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
      {success && (
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
