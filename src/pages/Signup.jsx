import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const emailInputRef = useRef(null);

  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      username.trim() === "" ||
      age.trim() === "" ||
      gender.trim() === ""
    ) {
      setError("All fields are required");
      emailInputRef.current.focus();
      return;
    }
    try {
      await signUp(email, password, username, profilePicUrl, age, gender);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProfilePicUrlChange = (e) => {
    const url = e.target.value;
    setProfilePicUrl(url);
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full px-4 flex relative items-center justify-center scale-75 sm:scale-100">
          <div className="max-w-[500px] w-full h-fit border border-white/50 p-4 mt-4 mx-auto bg-black/75 rounded-2xl shadow-[0px_0px_20px_20px_rgba(0,0,0,0.1)]">
            <div className="w-full mx-auto">
              <form className="w-full flex flex-col py-4 p-4 gap-8">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                {error && <p className="text-red-500">{error}</p>}
                <input
                  ref={emailInputRef}
                  className=" bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className=" bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none  "
                  type="password"
                  label="Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className=" bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none  "
                  type="text"
                  label="Username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className=" bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none  "
                  type="url"
                  label="Profile Picture URL"
                  placeholder="Profile Picture URL"
                  onChange={handleProfilePicUrlChange}
                />
                <input
                  className=" bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none  "
                  type="number"
                  label="Age"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <div>
                  <label className="text-lg">Gender:</label>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="male" className="ml-2 mr-4">
                      Male
                    </label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="other" className="ml-2 mr-4">
                      Female
                    </label>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="female" className="ml-2">
                      Other
                    </label>
                  </div>
                </div>
                <button
                  className="bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded hover:rounded-full focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Sign Up
                </button>
                <div className="flex justify-between">
                  <p>
                    <input type="checkbox" name="RememberMe" />
                    Remember Me !
                  </p>
                  <p>Need Help?</p>
                </div>
                <div className="flex">
                  <p>
                    <span className="text-gray-500">
                      Already have an Account ?
                    </span>
                    <Link to="/login" className="text-purple-700">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
