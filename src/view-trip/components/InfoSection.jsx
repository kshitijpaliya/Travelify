import { GetPlaceDetails } from "@/service-gemini-firebase/PhotosAPI";
import React, { useEffect, useState } from "react";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=800&maxWidthPx=800&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoURL, setphotoURL] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const resp = await GetPlaceDetails(data);
      console.log("Received response:", resp.data);
      console.log("Received:", resp.data.places[0].photos[1].name);

      const PhotoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      console.log(PhotoURL);
      setphotoURL(PhotoURL);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="mt-5">
      {/* Container for the image */}
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] overflow-hidden rounded-2xl shadow-lg">
        <img
          src={photoURL}
          alt="Trip location"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
        {/* Overlay for subtle gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-2xl"></div>
      </div>

      {/* Trip details */}
      <div className="my-8 flex flex-wrap justify-between items-center gap-5">
        {/* Location Name */}
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-orange-600">
          {trip?.userSelection?.location?.label || "Beautiful Destination"}
        </h2>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Number of Days */}
          <div className="flex items-center gap-2 p-2 px-4 bg-orange-100 rounded-full shadow hover:shadow-md transition-all text-sm lg:text-md">
            <span className="text-orange-500">📅</span>
            <span>{trip?.userSelection?.noOfDays || "N/A"} Days</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 p-2 px-4 bg-orange-100 rounded-full shadow hover:shadow-md transition-all text-sm lg:text-md">
            <span className="text-orange-500">💰</span>
            <span>{trip?.userSelection?.budget || "N/A"} Budget</span>
          </div>

          {/* Number of Travellers */}
          <div className="flex items-center gap-2 p-2 px-4 bg-orange-100 rounded-full shadow hover:shadow-md transition-all text-sm lg:text-md">
            <span className="text-orange-500">🥂</span>
            <span>Travellers: {trip?.userSelection?.traveller || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
