import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../authRelated/Authcontext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailInputRef = useRef(null);

  const { logIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required");
      emailInputRef.current.focus();
      return;
    }
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        {/* <img
      className="hidden sm:block w-full h-full absolute object-cover blur-sm"
      src="https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?cs=srgb&dl=pexels-el%C4%ABna-ar%C4%81ja-3377405.jpg&fm=jpg"
      alt=""
    /> */}
        <div className="w-full h-full px-4 flex relative items-center justify-center scale-75 sm:scale-100">
          <div className="max-w-[500px] w-full h-fit border border-white/50 p-4 mt-4 mx-auto bg-black/75 rounded-2xl shadow-[0px_0px_20px_20px_rgba(0,0,0,0.1)]">
            <div className="w-full mx-auto">
              <form className="w-full flex flex-col py-4 p-4 gap-8">
                <h1 className="text-3xl font-bold">Log In</h1>
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
                <button
                  className="bg-red-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded hover:rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Log In
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
                    <span className="text-gray-500">New Here ?</span>
                    <Link to="/signup" className="text-purple-700">
                      SignUp
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

export default Login;
