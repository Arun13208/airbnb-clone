import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useCustomerState } from "../Context";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {
    state: { user },
  } = useCustomerState();

  useEffect(() => {
    setName(user.name);
  }, [user]);

  let numOfDays = 0;
  if (checkIn && checkOut) {
    numOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function selectedPlace() {
    const data = {
      place: place._id,
      price: numOfDays * place.price,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
    };
    try {
      const response = await axios.post("/bookings", data);
      if (response.data === "ok") {
        setRedirect(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl font-semibold text-center">
        Price per night: ₹{place.price}
      </div>
      <div className="border shadow-md rounded-2xl mt-4">
        <div className="flex">
          <div className="text-sm font-semibold  px-4 py-3">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent cursor-pointer border-none outline-none"
            />
          </div>
          <div className="text-sm font-semibold  px-4 py-3 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent cursor-pointer border-none outline-none"
            />
          </div>
        </div>
        <div className="border-t px-4 py-3">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numOfDays > 0 && (
          <div className="border-t px-4 py-3">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      <button
        onClick={selectedPlace}
        className="w-full primary px-4 py-1 rounded-full mt-3 text-white">
        Book this place
        {numOfDays > 0 && <span> ₹{numOfDays * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
