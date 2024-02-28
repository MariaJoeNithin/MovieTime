import React, { useEffect, useState } from "react";
import { UserAuth } from "../authRelated/Authcontext";
import { db } from "../config/FireBase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Avatar } from "@mui/material";
import { updatePassword } from "firebase/auth";

const EditProfile = ({ onClose }) => {
  const { user, logOut } = UserAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profilePicUrl, setProfilePicUrl] = useState(user?.profilePicUrl || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setUsername(doc.data()?.username);
        setProfilePicUrl(doc.data()?.profilePicUrl);
        setAge(doc.data()?.age);
        setGender(doc.data()?.gender);
      });
      return unsubscribe;
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username || user?.username,
        age: age || user?.age,
        gender: gender || user?.gender,
        profilePicUrl: profilePicUrl || user?.profilePicUrl,
      };

      await updateDoc(doc(db, "users", user?.email), {
        ...userData,
      });
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-black/50 fixed h-full top-0 left-0 w-screen flex justify-center z-[1000] backdrop-blur-lg">
      <div className="bg-black/50 z-[2000] backdrop-blur-3xl p-6 rounded-lg shadow-md border border-white my-2 max-w-2xl mx-auto h-fit mt-36 ">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-4 gap-x-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div className="col flex flex-col items-center justify-center gap-2">
              <Avatar
                alt={user?.email ? user?.email : "guest"}
                // className="h-[200px] w-[200px]"
                sx={{ width: "200px", height: "200px" }}
                src={
                  profilePicUrl
                    ? profilePicUrl
                    : "https://banner2.cleanpng.com/20190730/shy/kisspng-photographic-film-movie-camera-cinema-website-and-mobile-application-development-service-5d3fc924ce3b33.8538265315644613488447.jpg"
                }
              />
              <div>
                <input
                  type="url"
                  placeholder="Profile Picture URL"
                  value={profilePicUrl}
                  onChange={(e) => setProfilePicUrl(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                />
              </div>
            </div>
            <div className="col flex flex-col gap-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                />
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
