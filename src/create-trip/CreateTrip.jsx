import React, { useEffect } from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectTravelsList } from "./Options";
import { SelectBudgetList } from "./Options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import image from "../assets/image.jpeg";
import { chatSession } from "@/service-gemini-firebase/GeminiAI";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/Dialog.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service-gemini-firebase/FirebaseConfig";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
function CreateTrip() {
  const [place, setPlace] = useState("");

  const [formData, serFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    serFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => console.log(error),
  });

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    const tripDataObject =
      typeof TripData === "string" ? JSON.parse(TripData) : TripData;

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: tripDataObject,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/` + docId);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }
    console.log("Generating Trip");

    if (
      (formData?.noOfDays > 9 && !formData?.location) ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast.error("Please fill all the fields");
      console.log("You can't plan a trip for more than 9 days");
      return;
    }

    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget);

    console.log(FINAL_PROMPT);

    const loadingToastId = toast.loading("Generating Trip...");

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveAITrip(result?.response?.text());
      // Update the toast to show success once the trip generation is complete
      toast.dismiss(loadingToastId);

      // Show success toast
      toast.success("Trip Generated Successfully!");
    } catch (error) {
      console.error("Error Generating Trip:", error);

      // Show an error toast in case of failure
      toast.update(loadingToastId, {
        render: "Error generating trip. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000, // Optional: Auto close after 5 seconds
      });
    }
  };

  const GetUserProfile = (tokenInfo) => {
    console.log("Token Info:", tokenInfo);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDailog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 ">
      <div className="flex flex-col justify-center items-start sm:px-5 md:px-10 lg:px-32 xl:px-56 mt-10 gap-10">
        {/* Header Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pb-3">
            Tell Us Your Travel Preferences 🏕️🌴
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>
        </div>

        {/* Travel Destination */}
        <div className="w-full">
          <h2 className="text-base sm:text-xl md:text-xl font-bold pb-3">
            Where are you planning to travel?🌍
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              styles: {
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
                control: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
                menuList: (provided) => ({
                  ...provided,
                  width: "100%",
                  overflowY: "hidden",
                }),
              },
            }}
          />
        </div>

        {/* Number of Days */}
        <div className="w-full">
          <h2 className="text-base sm:text-xl md:text-xl font-bold pb-3">
            For how many days are you planning your trip?✈️
          </h2>
          <Input
            placeholder="Eg: 3 Days"
            type="number"
            min="0"
            max="20"
            className="no-spinner w-full"
            onChange={(e) => {
              handleInputChange("noOfDays", e.target.value);
            }}
          />
        </div>

        {/* Budget */}
        <div className="w-full">
          <h2 className="text-base sm:text-xl md:text-xl font-bold pb-3">
            What is your budget for the trip?💰
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {SelectBudgetList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title &&
                  `shadow-lg border-black border-2`
                }`}
              >
                <h2 className="text-2xl md:text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-base md:text-lg">{item.title}</h2>
                <h2 className="text-sm md:text-base text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div className="w-full">
          <h2 className="text-lg sm:text-xl md:text-xl font-medium pb-3">
            Who do you plan on traveling with on your next adventure?👨‍👩‍👧‍👦
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveller == item.people &&
                  `shadow-lg border-black border-2`
                }`}
              >
                <h2 className="text-2xl md:text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-base md:text-lg">{item.title}</h2>
                <h2 className="text-sm md:text-base text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-center w-full pb-10">
          <Button onClick={OnGenerateTrip} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        {/* Dialog */}
        <div>
          <Dialog open={openDailog} onOpenChange={setOpenDailog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img
                    className="max-w-full mx-auto"
                    src={image}
                    alt="Google Sign-In"
                  />
                  <h2 className="font-bold text-lg mt-7 text-center">
                    Sign In With Google
                  </h2>
                  <p className="text-center">
                    Sign In To The App With Google Authentication Securely
                  </p>
                  <Button
                    onClick={login}
                    className="w-full mt-5 flex items-center gap-4"
                  >
                    <FcGoogle />
                    Sign In With Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-center">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
