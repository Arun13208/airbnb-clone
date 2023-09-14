import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCustomerState } from "../Context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [userPassword, setUSerPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {
    state: { user },
    dispatch,
  } = useCustomerState();

  console.log(user);

  const loginBtn = [email, userPassword].every(Boolean);
  console.log(loginBtn);

  const token = Cookies.get("token");
  if (token) {
    return <Navigate to={"/"} />;
  }

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUSerPassword(e.target.value);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        userPassword,
      });
      console.log(data);
      if (data.status) {
        dispatch({ type: "ADD_USER", payload: data.userData });
        setRedirect(true);
        alert("Login successful");
      } else {
        throw new Error();
      }
    } catch (e) {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const disableClass = !loginBtn ? "opacity-50" : "";

  return (
    <div className="min-h-screen pt-3 flex flex-col justify-center items-center gap-4 grow">
      <h1 className="text-4xl text-center font-medium mb-4">Login</h1>
      <form className="w-6/12 max-w-md mx-auto" onSubmit={handleUserLogin}>
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="userEmail">
            Email Id
          </label>
          <input
            className="border  border-gray-400 w-3/4 rounded-2xl px-2 py-1"
            id="userEmail"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleUserEmail}
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label className="text-lg" htmlFor="userPassword">
            Password
          </label>
          <input
            id="userPassword"
            className="border border-gray-400 w-3/4 rounded-lg px-2 py-1 "
            type="password"
            placeholder="password"
            autoComplete="off"
            onChange={handleUserPassword}
            value={userPassword}
          />
        </div>

        <button
          className={`bg-primary text-center mt-4 w-full py-1.5 rounded-full text-white ${disableClass}`}
          type="submit"
          disabled={!loginBtn}>
          Login
        </button>
        <div className="flex gap-2  mt-3 items-center">
          <p>Don't have an account yet?</p>
          <Link
            className="text-blue-500 no-underline font-semibold"
            to="/register">
            Create One!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
