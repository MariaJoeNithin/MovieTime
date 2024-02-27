import React, { useEffect, useState } from "react";
import Savedshows from "../Components/Savedshows";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";
import { db } from "../config/FireBase";
import { doc, onSnapshot } from "firebase/firestore";
import EditProfile from "./Editprofile";

const Account = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();
  console.log(user && user);
  const [userName, setUserName] = useState("");
  const [proPic, setPropic] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user && user.email) {
  //     const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
  //       setUserName(doc.data()?.username);
  //       setProfilePic(doc.data()?.profilePicUrl);
  //       setAge(doc.data()?.age);
  //       setGender(doc.data()?.gender);
  //     });
  //     return unsubscribe;
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          setIsLoading(true);
          const docRef = doc(db, "users", user.email);
          const unsubscribe = onSnapshot(docRef, (doc) => {
            const userData = doc.data(); // Store doc.data() in a variable for easier access

            // Set profile data
            setProfileData(userData);

            // Set username based on profileData or user.displayName
            setUserName(userData?.username || user.displayName);

            // Set profile picture based on profileData or user.photoURL
            setPropic(userData?.profilePicUrl || user.photoURL);

            setIsLoading(false);
          });
          return unsubscribe;
        } catch (error) {
          setIsLoading(false);
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [user, setProfileData, setUserName, setPropic, setIsLoading]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className={`p-2 relative ${isEditing ? " overflow-hidden" : ""} `}>
        {isLoading && <p>Loading...</p>}
        {isEditing && <EditProfile onClose={handleCloseEditProfile} />}
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700 flex flex-col md:flex-row  justify-center items-center p-2 mx-auto gap-5 md:min-w-[550px] md:min-h-[350px]">
          <div className="profilepic flex flex-col gap-2">
            <h1 className="text-xl flex">
              Welcome , {user?.email ? userName : "Guest"}
            </h1>
            {proPic && (
              <img
                src={proPic}
                alt="Profile"
                className=" h-40 w-40 rounded-full object-cover object-center"
              />
            )}
          </div>

          <div className="profiledetails flex flex-col justify-center items-center gap-2">
            <p>Email: {user?.email}</p>
            <p>Age: {profileData?.age}</p>
            <p>Gender: {profileData?.gender}</p>
            <div className="flex flex-row gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-700 px-5 py-2 text-white font-bold rounded flex justify-center items-center"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <Savedshows />
      </div>
    </>
  );
};

export default Account;
