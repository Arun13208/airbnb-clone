import React, { useEffect } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useCustomerState } from "../Context";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const {
    state: { bookings },
    dispatch,
  } = useCustomerState();

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        dispatch({
          type: "ADD_ALL_BOOKINGS",
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-6 px-8 mb-6 grid gap-4">
        {bookings?.length > 0 &&
          bookings.map((item) => (
            <Link
              to={`/account/bookings/${item._id}`}
              className="bg-gray-200 p-4 rounded-2xl flex gap-4 mb-4 overflow-hidden"
              key={item._id}>
              <div className="flex h-32 w-32 ">
                <img
                  className="object-cover"
                  src={
                    "http://localhost:4000/uploads/" + item?.place?.photos?.[0]
                  }
                  alt="bookings"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-lg font-semibold ">{item.place.title}</h2>
                <BookingDates item={item} />
                <div className="text-[16px] font-semibold text-gray-600 mt-4 flex gap-2 items-center">
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
                      d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                    />
                  </svg>
                  Total Amount:{" "}
                  <div className="flex gap-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
