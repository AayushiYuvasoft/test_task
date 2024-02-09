import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik/dist";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { editCustomer, getByIdCustomer } from "../redux/Slice/customerSlice";

const CustomerForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();
const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Phone is required"),
      email: Yup.string().required("Address1 is required"),
      password: Yup.string().required("Address2 is required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),

    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = dispatch(editCustomer(values ,id))
        navigate("/customerlist");
      } catch (error) {
        console.error("Login failed:", error);
        setStatus("An error occurred while logging in");
      } finally {
        setSubmitting(false);
      }
    },
  });

  
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response =dispatch(getByIdCustomer(id))
        const customer = response.data;
        formik.setValues({
          name: customer.name || "",
  
        });
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    if (id) {
      fetchContactDetails();
    }
  }, [id, formik]);


  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Customer</strong>
          </Typography>
          <Typography variant="body2">Add some contacts</Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button
            variant="contained"
            guttrBottom
            onClick={() => navigate("/contact/form")}
          >
            customer
          </Button>
        </Grid>
      </Grid>

      <Paper className="form-card-ui">
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <TextField
                fullWidth
                type="text"
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* <Grid item xs={4} md={4}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid> */}

            {/* <Grid item xs={4} md={4}>
              <TextField
                fullWidth
                type="password"
                label="passoword"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid> */}
            {/* <Grid item xs={4} md={4}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
            </Grid> */}
            <Grid
              item
              xs={12}
              md={12}
              textAlign="right"
              sx={{ marginBottom: 1 }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerForm;
