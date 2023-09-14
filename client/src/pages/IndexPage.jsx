import axios from "axios";
import React, { useEffect } from "react";
import { useCustomerState } from "../Context";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { state, dispatch } = useCustomerState();
  const { places } = state;
  useEffect(() => {
    axios
      .get("/all-places")
      .then((response) => {
        const { data } = response;
        dispatch({
          type: "ADD_PLACES",
          payload: [...data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoader = () => {
    return (
      <div className="flex justify-center text-blue-400 mt-20">
        <ThreeDots width={60} color="#34abeb" />
      </div>
    );
  };

  return (
    <div className="px-8 py-6">
      {places.length > 0 ? (
        <div className="mt-4 grid  gap-x-8 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => (
            <Link to={`/place/${place._id}`} key={place._id}>
              <div className=" flex bg-gray-400 rounded-2xl">
                {place.photos?.[0] && (
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    alt="Place"
                    className="rounded-2xl object-cover aspect-square"
                  />
                )}
              </div>
              <h2 className="sm:text-md text-lg font-bold mt-2 truncate leading-4">
                {place.title}
              </h2>
              <p className="text-gray-600 font-semibold h-8 text-sm mt-1 leading-4">
                {place.address}
              </p>
              <div className="mt-1 text-lg font-semibold text-gray-700">
                <span className="font-bold text-black">₹{place.price} </span>
                per night
              </div>
            </Link>
          ))}  
        </div>
      ) : (
        getLoader()
      )}
    </div>
  );
};

export default IndexPage;
