import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const handleFullName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isOk =
      [name, email, password, verifyPassword].every(Boolean) &&
      password === verifyPassword;
    if (isOk) {
      setCanSubmit(true);
      try {
        await axios.post("/register", {
          name,
          email,
          password,
        });
        alert("Registration successful. Now you can log in");
      } catch (error) {
        alert("Registration failed");
      }
    } else {
      if (password && verifyPassword) {
        setCanSubmit(password === verifyPassword);
      }
    }
  };

  return (
    <div className="min-h-screen py-4 flex flex-col justify-center items-center gap-4 grow">
      <h1 className="text-4xl text-center font-medium mb-4">Register</h1>
      <form className="w-6/12 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="border  border-gray-400 w-3/4 rounded-lg px-2 py-1"
            id="fullName"
            type="text"
            placeholder="full name"
            onChange={handleFullName}
            value={name}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2.5">
          <label className="text-lg" htmlFor="emailId">
            Email Id
          </label>
          <input
            id="emaiId"
            className="border border-gray-400 w-3/4 rounded-lg px-2 py-1 "
            type="email"
            placeholder="email id"
            onChange={handleEmail}
            value={email}
          />
        </div>
        <div className="flex flex-col gap-1 mt-2.5">
          <label className="text-lg" htmlFor="newPassword">
            Password
          </label>
          <input
            id="newPassword"
            className="border border-gray-400 w-3/4 rounded-lg px-2 py-1 "
            type="password"
            placeholder="password"
            onChange={handlePassword}
            value={password}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1 mt-2.5">
          <label className="text-lg" htmlFor="verifyPassword">
            Verify Password
          </label>
          <input
            id="verifyPassword"
            className="border border-gray-400 w-3/4 rounded-lg px-2 py-1 "
            type="password"
            placeholder="re-enter password"
            onChange={handleVerifyPassword}
            value={verifyPassword}
            autoComplete="off"
          />
        </div>
        {!canSubmit && <p className="text-red-500">Password not matched</p>}

        <button
          className="bg-primary text-center mt-4 w-full py-1.5 rounded-full text-white"
          type="submit">
          Create
        </button>
        <div className="flex gap-2 justify-center  mt-3 items-center">
          <p>Already have an account?</p>
          <Link
            className="text-blue-500 no-underline font-semibold"
            to="/login">
            Login!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
