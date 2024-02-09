import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactListing from "./contacts/ContactListing";
import ContactForm from "./contacts/ContactForm";
import CustomerForm from "./customer/CustomerForm";
import Signup from "./auth/Signup";
import Layout from "./components/Layout";
import ProtectedRoutes from "./PrivateRoutes";
import Homes from "./components/Home/Home";
import Signing from "./auth/Signin";
import CustomerListing from "./customer/CustomerListing";

const Routing = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Signing />} />

          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<ProtectedRoutes Components={Homes} />}
          />
          <Route path="/contact/form" element={<ContactForm />} />
          <Route
            path="/contact/form"
            element={<ProtectedRoutes Components={ContactForm} />}
          />

          <Route
            path="/customer/form/:id"
            element={<ProtectedRoutes Components={CustomerForm} />}
          />
          <Route
            path="/contact/form/:id"
            element={<ProtectedRoutes Components={ContactForm} />}
          />

          <Route
            path="/customerlist"
            element={<ProtectedRoutes Components={<CustomerListing />} />}
          />
          <Route
            path="/contactlist"
            element={<ProtectedRoutes Components={ContactListing} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routing;
