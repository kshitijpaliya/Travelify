import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center px-4 md:px-10 ">
      <div className="flex flex-col justify-center items-center gap-10 md:gap-10 my-10 md:my-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center sm:leading-15 md:leading-15 lg:leading-snug bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Discover Your Next Adventure with AI:{" "}
          <span className="text-black">
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>
        <p className="text-sm font-bold md:text-lg lg:text-xl text-gray-500 text-center">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link to="/create-trip">
          <div className="pt-2">
            <button className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
              Get Started! It's Free
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;

// return (
//   <div className="h-screen flex flex-col justify-center items-center px-4 md:px-10 bg-black">
//     <div className="flex flex-col justify-center items-center bg-yellow-300 gap-10 md:gap-10 py-10 px-4 md:py-14 md:px-8 rounded-lg shadow-lg">
//       <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center sm:leading-15 md:leading-15 lg:leading-20 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
//         <span>Discover Your Next Adventure with AI:</span> Personalized
//         Itineraries at Your Fingertips
//       </h1>
//       <p className="text-sm md:text-lg lg:text-xl text-gray-500 text-center">
//         Your personal trip planner and travel curator, creating custom
//         itineraries tailored to your interests and budget.
//       </p>
//       <Link to="/create-trip">
//         <div className="pt-2">
//           <button className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
//             Get Started! It's Free
//           </button>
//         </div>
//       </Link>
//     </div>
//   </div>
// );
