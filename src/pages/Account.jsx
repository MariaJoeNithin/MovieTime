import React, { useEffect, useState } from "react";
import Savedshows from "../Components/Savedshows";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";
import { db } from "../config/FireBase";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import EditProfile from "./Editprofile";

const Account = () => {
  const { user, logOut } = UserAuth();

  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle EditProfile component

  useEffect(() => {
    if (user && user.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setUserName(doc.data()?.username);
        setProfilePic(doc.data()?.profilePicUrl);
        setAge(doc.data()?.age);
        setGender(doc.data()?.gender);
      });
      return unsubscribe;
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className={`p-2 relative ${isEditing ? " overflow-hidden" : ""} `}>
        {isEditing && (
          <EditProfile user={user} onClose={handleCloseEditProfile} />
        )}
        <h1 className="text-xl md:flex hidden">
          Welcome , {user?.email ? userName : "Guest"}
        </h1>
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        )}
        <p>Email: {user?.email}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>

        <Savedshows />
      </div>
    </>
  );
};

export default Account;
