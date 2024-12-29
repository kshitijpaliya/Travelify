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
    <div className="-mt-3">
      {/* Container for the image */}
      <div className="relative w-full h-64 md:h-80 lg:h-[400px] overflow-hidden rounded-xl">
        <img
          src={photoURL}
          alt="Trip location"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Trip details */}
      <div className="my-5 flex justify-between gap-3">
        {/* Location Name */}
        <h2 className="font-bold text-2xl text-orange-600">
          {trip?.userSelection?.location?.label}
        </h2>

        {/* Details */}
        <div className="flex flex-wrap gap-3">
          {/* Number of Days */}
          <h2 className="p-2 px-4 bg-orange-200 rounded-3xl text-sm lg:text-md">
            📅 {trip?.userSelection?.noOfDays} Days
          </h2>

          {/* Budget */}
          <h2 className="p-2 px-4 bg-orange-200 rounded-3xl text-sm lg:text-md">
            💰 {trip?.userSelection?.budget} Budget
          </h2>

          {/* Number of Travellers */}
          <h2 className="p-2 px-4 bg-orange-200 rounded-3xl text-sm lg:text-md">
            🥂 Travellers: {trip?.userSelection?.traveller}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
