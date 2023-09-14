import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const resBooking = response.data.find(({ _id }) => _id === id);
        setBooking(resBooking);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(booking);

  if (!booking) {
    return "";
  }

  return (
    <div className="p-8 lg:px-44">
      <h1 className="text-3xl font-semibold">{booking?.place?.title}</h1>
      <a
        target="_blank"
        href={"http://maps.google.com/?q=" + booking?.place?.address}
        className="flex gap-2 items-center  mt-2 leading-3 underline font-semibold text-gray-600"
        rel="noreferrer">
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {booking?.place?.address}
      </a>
      <div className="bg-gray-200 p-4 my-4 rounded-2xl flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your booking information</h2>
          <p className="font-semibold text-gray-600">dates:</p>
          <BookingDates item={booking} />
        </div>

        <div className="flex flex-col gap-2 pr-4">
          <p className="text-lg font-semibold ">Total Price: </p>
          <div className="flex items-center font-semibold text-xl text-red-500">
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
            <span>{booking?.price}</span>
          </div>
        </div>
      </div>
      <PlaceGallery place={booking?.place} />
    </div>
  );
};

export default BookingPage;
