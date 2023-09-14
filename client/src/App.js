import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./ProtectedRoute";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import BookingsPage from "./pages/BookingsPage";
import PlacePage from "./pages/PlacePage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute component={IndexPage} />} />
        <Route
          path="account/"
          element={<ProtectedRoute component={AccountPage} />}
        />
        <Route
          path="account/places"
          element={<ProtectedRoute component={PlacesPage} />}
        />
        <Route
          path="account/bookings"
          element={<ProtectedRoute component={BookingsPage} />}
        />
        <Route
          path="account/bookings/:id"
          element={<ProtectedRoute component={BookingPage} />}
        />
        <Route
          path="account/places/new"
          element={<ProtectedRoute component={PlacesFormPage} />}
        />
        <Route
          path="account/places/:id"
          element={<ProtectedRoute component={PlacesFormPage} />}
        />
        <Route
          path="place/:id"
          element={<ProtectedRoute component={PlacePage} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
