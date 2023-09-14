import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="font-semibold text-2xl mt-2">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  const canSubmit = [
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
  ].every(Boolean);

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      const response = await axios.put("/places", { id, ...placeData });
      if (response.statusText === "OK") {
        navigate("/account/places");
      }
    } else {
      const response = await axios.post("/places", placeData);
      if (response.statusText === "OK") {
        navigate("/account/places");
      }
    }
  }

  return (
    <div className="mt-6 mb-10 px-5">
      <AccountNav />
      <form className="mt-8" onSubmit={savePlace}>
        {preInput("Title", "Title for your place, should be short and catchy")}
        <input
          className="border border-gray-400 rounded-full"
          type="text"
          placeholder="title, for example: My Lovely Apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Address to this place")}
        <input
          className="border border-gray-400 rounded-full"
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-400 mt-2"
        />
        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6 gap-4 mt-4">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "House rules, etc...")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="border border-gray-400 mt-2"
        />
        {preInput(
          "Check in & out times, max guests",
          "add check in & out times remember to have some time window for cleaning between guests"
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="mt-2 -mb-1 text-md font-semibold">Check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="12:00 pm"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-md font-semibold">Check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="01:00 am"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-md font-semibold">Max guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
              placeholder="Max number of guests"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-md font-semibold">
              Price per night
            </h3>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-full ${
            !canSubmit && "opacity-50"
          }`}>
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
