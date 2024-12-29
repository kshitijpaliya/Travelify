import {
  GetPlaceDetails,
  PHOTO_REF_URL,
} from "@/service-gemini-firebase/PhotosAPI";
import React, { useEffect, useState } from "react";

function PlacesToVisit({ trip }) {
  const [photoURLs, setPhotoURLs] = useState({}); // Object to store photo URLs for each place

  useEffect(() => {
    if (trip) {
      GetPlacePhotos(); // Fetch photos when trip data is available
    }
  }, [trip]);

  const GetPlacePhotos = async () => {
    try {
      const photoData = {};
      for (const item of trip?.tripData?.itinerary || []) {
        for (const place of item.places || []) {
          const data = {
            textQuery: place.place_name,
          };
          const resp = await GetPlaceDetails(data);
          const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
          if (photoRef) {
            const photoURL = PHOTO_REF_URL.replace("{NAME}", photoRef);
            photoData[place.place_name] = photoURL; // Map photo URL to place name
          }
        }
      }
      setPhotoURLs(photoData); // Update state with all photo URLs
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-5 mt-20 text-center text-orange-600">
        Places To Visit 🛩️
      </h2>
      <div className="space-y-8">
        {trip?.tripData?.itinerary.map((item, dayIndex) => (
          <div
            key={dayIndex}
            className=" bg-orange-200 p-5 rounded-lg shadow-md border border-gray-200"
          >
            {/* Day Heading */}
            <h3 className="text-lg font-extrabold text-gray-700 mb-4">
              Day {item?.day} : {item?.day_title} 🌟
            </h3>
            <div className="space-y-6">
              {item.places.map((place, placeIndex) => (
                <div
                  key={placeIndex}
                  className="flex gap-5 p-4 bg-white rounded-md shadow hover:shadow-lg transition-all border border-gray-100"
                >
                  <div>
                    <img
                      src={photoURLs[place.place_name] || "/plane.jpg"} // Access photo URL correctly
                      alt={place.place_name}
                      className="w-72 h-60 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    {/* Place Name */}
                    <h4 className="font-bold text-orange-600 text-lg mb-2">
                      {place.place_name}
                    </h4>
                    {/* Place Details */}
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Description:</span>{" "}
                      {place.place_description}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Ticket Pricing:</span>{" "}
                      {place.ticket_pricing}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Best Time to Visit:</span>{" "}
                      {place.best_time_to_visit}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">Travel Time:</span>{" "}
                      {place.estimated_travel_time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Rating:</span> ⭐{" "}
                      {place.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
