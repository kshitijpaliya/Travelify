import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service-gemini-firebase/FirebaseConfig";
import InfoSection from "../components/InfoSection";
import { toast } from "sonner";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({});
  console.log(tripId);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast.error("No Trip Found!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:56 min-h-screen">
      {/* Information Section  */}
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
    </div>
  );
}

export default ViewTrip;
