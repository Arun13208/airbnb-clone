import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useCustomerState } from "../Context";

const PlacesPage = () => {
  const { state, dispatch } = useCustomerState();
  const { userPlaces } = state;
  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => {
        dispatch({
          type: "ADD_USER_PLACES",
          payload: data,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AccountNav />
      <div className="mt-8 px-6 pb-6">
        <div className="text-center">
          <Link
            className="inline-flex gap-2 items-center px-6 py-2 bg-blue-600 text-white rounded-full "
            to={"/account/places/new"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new Place
          </Link>
        </div>
        <div className="mt-6">
          {userPlaces.length > 0 &&
            userPlaces.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                className="bg-gray-200 p-4 rounded-2xl flex gap-4 mb-4"
                key={place._id}>
                <div className="flex h-32 w-32 bg-gray-300 grow shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt="Home Pictures"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-lg font-semibold">{place.title}</h2>
                  <p className="text-sm mt-2">
                    {place.description.substring(0, 200) + "....read more"}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
