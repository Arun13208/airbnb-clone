import { FaRegPaperPlane } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerState } from "../Context";
import axios from "axios";
import { useState } from "react";

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useCustomerState();

  const handleLogout = async () => {
    await axios.post("/logout");
    navigate("/login");
    dispatch({
      type: "REMOVE_USER",
    });
  };

  const getUserName = () => {
    if (user) {
      const { name } = user;
      const newname = name === undefined ? "" : name;
      const firstName = String(newname).split(" ")[0];
      return firstName;
    }
  };

  return (
    <header className="py-3 px-4  border-b border-gray-300">
      <div className="hidden md:block">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1.5">
            <FaRegPaperPlane className="font-semibold text-xl text-red-500" />
            <span className="text-xl font-semibold text-red-500">airbnc</span>
          </Link>
          <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-grey-300">
            <div className="pr-2 border-r border-gray-400">Anywhere</div>
            <div className="pr-2 border-r border-gray-400">Any Week</div>
            <div>Add guests</div>
            <button className="bg-primary text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <div className="flex gap-3">
            <Link
              to={user ? "/account" : "/login"}
              className="flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 hover:shadow-lg hover:shadow-grey-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <div className="bg-gray-500 cursor-pointer text-white rounded-full border border-gray-500 overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 relative top-1">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!!user && <div>{getUserName()}</div>}
            </Link>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-full"
              onClick={handleLogout}
              type="button">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:hidden relative xs:flex-col xs:justify-center xs:gap-2">
        <div
          className="cursor-pointer hover:text-red-400 xs:hidden"
          onClick={() => setDropdown(!dropdown)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="hidden xs:flex xs:order-2">
          <Link
            to={"/"}
            className="px-4 py-2 flex gap-1 items-center text-black hover:text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span className="font-semibold text-lg">Home</span>
          </Link>
          <Link
            to={"/account"}
            className="px-4 py-2 flex gap-1 items-center text-black hover:text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-semibold text-lg">Account</span>
          </Link>
          <div className="my-2 text-center px-3">
            <button
              className="bg-blue-600 w-full text-white px-3 py-1 rounded-full hover:text-red-400"
              onClick={handleLogout}
              type="button">
              Logout
            </button>
          </div>
        </div>
        <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-grey-300 xs:order-1">
          <div className="pr-2 border-r border-gray-400">Anywhere</div>
          <div className="pr-2 border-r border-gray-400">Any Week</div>
          <div>Add guests</div>
          <button className="bg-primary text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {dropdown && (
          <div className="absolute top-10 bg-gray-400  flex flex-col rounded-md px-2 text-center z-50">
            <h2 className="px-2 mt-3 font-semibold text-lg">
              Hi {!!user && <span>{getUserName()}</span>}
            </h2>
            <Link
              to={"/"}
              className="px-4 py-2 flex gap-2 items-center text-white hover:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <span className="font-semibold text-lg">Home</span>
            </Link>
            <Link
              to={"/account"}
              className="px-4 py-2 flex gap-2 items-center text-white hover:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-semibold text-lg">Account</span>
            </Link>
            <div className="my-2 text-center px-3">
              <button
                className="bg-blue-600 w-full text-white px-3 py-1 rounded-full hover:text-red-400"
                onClick={handleLogout}
                type="button">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
