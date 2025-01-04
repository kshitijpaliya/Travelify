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
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl my-5 mt-20 text-center text-orange-600">
        Places To Visit 🛩️
      </h2>
      <div className="space-y-8">
        {trip?.tripData?.itinerary.map((item, dayIndex) => (
          <div
            key={dayIndex}
            className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-lg shadow-lg border border-gray-200"
          >
            {/* Day Heading */}
            <h3 className="text-lg font-bold text-white mb-4">
              Day {item?.day} : {item?.day_title} 🌟
            </h3>
            <div className="space-y-6">
              {item.places.map((place, placeIndex) => (
                <div
                  key={placeIndex}
                  className="flex flex-col sm:flex-row gap-5 p-4 bg-white rounded-lg shadow hover:shadow-xl transition-all border border-gray-200"
                >
                  <div>
                    <img
                      src={photoURLs[place.place_name] || "/plane.jpg"} // Fallback image if photo URL is not available
                      alt={place.place_name}
                      className="w-72 h-60 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    {/* Place Name */}
                    <h4 className="font-bold text-orange-600 text-lg mb-2">
                      {place.place_name}
                    </h4>
                    {/* Place Details */}
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-gray-700">
                        Description:
                      </span>{" "}
                      {place.place_description}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-gray-700">
                        Ticket Pricing:
                      </span>{" "}
                      {place.ticket_pricing}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-gray-700">
                        Best Time to Visit:
                      </span>{" "}
                      {place.best_time_to_visit}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold text-gray-700">
                        Travel Time:
                      </span>{" "}
                      {place.estimated_travel_time}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-700">
                        Rating:
                      </span>{" "}
                      ⭐ {place.rating}
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
