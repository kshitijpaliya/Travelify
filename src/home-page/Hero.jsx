import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="flex flex-col justify-center items-center gap-10 my-20">
        <h1
          className="text-6xl font-extrabold text-center"
          style={{ lineHeight: "5rem" }}
        >
          {" "}
          <span className="text-orange-500">
            Discover Your Next Adventure with AI:
          </span>{" "}
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-xl text-gray-500">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link to="/create-trip">
          <div className="pt-2">
            <Button>Get Started! Its Free</Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
