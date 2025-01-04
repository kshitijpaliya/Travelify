import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GetPlaceDetails,
  PHOTO_REF_URL,
} from "@/service-gemini-firebase/PhotosAPI";

// function Hotels({ trip }) {
//   const [photoURL, setphotoURL] = useState();
//   useEffect(() => {
//     trip && GetPlacePhoto();
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     const data = {
//       textQuery: trip?.tripData?.hotel_options?.hotel_name,
//     };
//     try {
//       const resp = await GetPlaceDetails(data);
//       console.log("Received response:", resp.data);
//       console.log("Received:", resp.data.places[0].photos[0].name);

//       const PhotoURL = PHOTO_REF_URL.replace(
//         "{NAME}",
//         resp.data.places[0].photos[0].name
//       );
//       console.log(PhotoURL);
//       setphotoURL(PhotoURL);
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="font-bold text-xl my-5 mt-10">Hotel Recommendations 🏨</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
//         {trip?.tripData?.hotel_options?.map((item, index) => (
//           <Link
//             to={
//               "https://www.google.com/maps/search/?api=1&query=" +
//               item.hotel_name +
//               " " +
//               item.hotel_address
//             }
//             target="_blank"
//             className="text-black hover:text-black"
//           >
//             <div className="bg-neutral-200 p-5 rounded-xl shadow-md h-[500px] hover:scale-95 hover:bg-blue-200 transition-all cursor-pointer">
//               <img src={photoURL} className="rounded-xl" />
//               <div className="my-2 flex flex-col gap-1">
//                 <h2 className="font-bold">{item.hotel_name}</h2>
//                 <div className="h-20 py-2 flex">
//                   <div>📌</div>
//                   <h2 className="text-md">{item.hotel_address}</h2>
//                 </div>
//                 <h2 className="text-md">💰{item.price_per_night} Rs</h2>
//                 <h2 className="text-md">⭐{item.rating} Star</h2>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hotels;

function Hotels({ trip }) {
  const [photoURLs, setPhotoURLs] = useState({}); // Object to store photo URLs for each hotel

  useEffect(() => {
    if (trip) {
      GetPlacePhotos(); // Fetch photos when trip data is available
    }
  }, [trip]);

  const GetPlacePhotos = async () => {
    try {
      const photoData = {};
      for (const hotel of trip?.tripData?.hotel_options || []) {
        const data = {
          textQuery: hotel.hotel_name,
        };
        const resp = await GetPlaceDetails(data);
        const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
        if (photoRef) {
          const photoURL = PHOTO_REF_URL.replace("{NAME}", photoRef);
          photoData[hotel.hotel_name] = photoURL; // Map photo URL to hotel name
        }
      }
      setPhotoURLs(photoData); // Update state with all photo URLs
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl my-5 mt-10 text-center text-orange-600">
        Hotel Recommendations 🏨
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {trip?.tripData?.hotel_options?.map((item, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              item.hotel_name +
              " " +
              item.hotel_address
            }
            target="_blank"
            className="text-black hover:text-black"
          >
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-5 rounded-lg shadow-lg h-[500px] hover:scale-105 hover:shadow-xl transition-all cursor-pointer">
              <div className="bg-white rounded-lg h-[450px] p-3">
                <div className="pb-2">
                  <img
                    src={photoURLs[item.hotel_name] || "/placeholder.jpg"}
                    className="rounded-xl w-full h-64 object-cover"
                    alt={item.hotel_name}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-lg text-orange-700">
                    {item.hotel_name}
                  </h2>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-sm text-gray-700">
                      📌{item.hotel_address}
                    </h2>
                    <h2 className="text-sm text-green-500">
                      💰{item.price_per_night} Rs
                    </h2>
                    <h2 className="text-sm text-yellow-500">
                      ⭐{item.rating} Star
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
