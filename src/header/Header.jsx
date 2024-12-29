import React, { Fragment, useEffect, useState } from "react";
import image from "../assets/image.jpeg";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
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
import { FcGoogle } from "react-icons/fc";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(user.picture);
    } else {
      console.log("User is null or not logged in.");
    }
  }, [user]); // Dependency array ensures the effect only runs when 'user' changes.

  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <Fragment>
      <div className="flex w-full justify-between items-center px-5">
        {/* Logo */}
        <img src={image} className="max-w-[15rem]" alt="Logo" />

        {/* Content Container */}
        <div className="flex-grow flex justify-end items-center gap-5">
          {user ? (
            <div className="flex gap-3 items-center">
              <a href="/my-trips">
                <Button
                  variant="secondary"
                  className="bg-gray-300 rounded-full hover:border-gray-200 hover:bg-orange-500 "
                >
                  My Trips
                </Button>
              </a>
              <Popover className="rounded-full">
                <PopoverTrigger className="bg-transparent hover:border-transparent p-0 h-[50px] w-[50px] rounded-full">
                  {user?.picture && (
                    <img
                      src={user.picture}
                      alt="User Avatar"
                      className="h-full w-full rounded-full"
                    />
                  )}
                </PopoverTrigger>
                <PopoverContent className="mx-1">
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDailog(true)}>Sign In</Button>
          )}
        </div>

        {/* Sign In Dialog */}
        <div>
          <Dialog open={openDailog} onOpenChange={setOpenDailog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img className="max-w-68" src={image} />
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
    </Fragment>
  );
}

export default Header;
