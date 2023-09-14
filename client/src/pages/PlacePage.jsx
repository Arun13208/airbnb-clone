import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  

  useEffect(() => {
    axios
      .get(`/place/${id}`)
      .then((response) => {
        const { data } = response;
        setPlace(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  


  return (
    <div className="p-8 lg:px-44">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a
        target="_blank"
        href={"http://maps.google.com/?q=" + place.address}
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

        {place.address}
      </a>

      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 gap-8  my-2 md:grid-cols-2">
        <div>
          <div className="my-2">
            <h2 className="font-semibold text-2xl mb-1">Description</h2>
            <p className="text-gray-600 font-semibold">{place.description}</p>
          </div>
          <b>Check-in: </b>
          <span className="text-gray-600 font-semibold">{place.checkIn}</span>
          <br />
          <b>Check-out: </b>
          <span className="text-gray-600 font-semibold">{place.checkOut}</span>
          <br />
          <b>Max number of guest: </b>
          <span className="text-gray-600 font-semibold">{place.maxGuests}</span>
        </div>
        <div className="mt-4">
          <BookingWidget place={place} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="mt-2 bg-gray-100 p-4 rounded-lg font-semibold leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
