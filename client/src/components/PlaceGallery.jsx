import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen ">
        <div className="px-8 py-10 grid gap-6 bg-black text-white">
          <div className="">
            <button
              type="button"
              className="fixed top-3 left-3 flex items-center font-semibold text-lg  gap-1 py-1 px-3 rounded-full  hover:bg-gray-500 hover:text-white"
              onClick={() => setShowAllPhotos(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 font-bold">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              close
            </button>
            <h2 className="mt-6 mb-2 font-semibold text-2xl">
              Property Overview
            </h2>
          </div>
          <div className="flex flex-col gap-8 items-center">
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <div key={photo}>
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    src={"http://localhost:4000/uploads/" + photo}
                    alt="Show all"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  const len = place.photos?.length !== undefined && place.photos?.length;

  return (
    <>
      <div className="relative hidden sm:block">
        <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] mt-4 ">
          <div className="">
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt="Main"
                  className="cursor-pointer  aspect-square object-cover rounded-tl-3xl rounded-bl-3xl"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt="Main"
                className="cursor-pointer aspect-square object-cover"
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt="Main"
                  className="cursor-pointer aspect-square object-cover relative top-2"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[3] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos[3]}
                alt="Main"
                className="cursor-pointer aspect-square object-cover rounded-tr-3xl"
              />
            )}
            {place.photos?.[4] && (
              <div className="overflow-hidden">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[4]}
                  alt="Main"
                  className="cursor-pointer aspect-square object-cover relative top-2 rounded-br-[2rem]"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAllPhotos(true)}
          className="flex bg-white absolute bottom-6 right-6 px-3 py-1 border-[2px] border-black  rounded-xl font-semibold gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show all photos
        </button>
      </div>

      <div className="relative block sm:hidden">
        <div className="mt-4 ">
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt="Main"
                className="cursor-pointer aspect-square object-cover rounded-2xl"
              />
            </div>
          )}
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-6 right-6 bg-black text-white px-4 py-1 font-semibold text-lg bg-opacity-40 rounded-full">
          1/{len}
        </button>
      </div>
    </>
  );
};

export default PlaceGallery;
