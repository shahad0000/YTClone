import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const getRes = await axios.get(
        "https://683c2ef028a0b0f2fdc66973.mockapi.io/users"
      );
      const userExist = getRes.data.find(
        (user) => user.username === creds.username && user.password === creds.password
      );
      if (userExist) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", creds.username);
        navigate("/");
      } else {
        Swal.fire({
            title: "Username or password is incorrect"
        })
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <section className="flex flex-col items-center pt-6">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={creds.username}
                  onChange={handleChange}
                  id="username"
                  className=" border sm:text-sm rounded-lg bg-[#4d4d4d]  block w-full p-2.5 border-[#3f3f3f] placeholder-[#bbb8b8] text-white"
                  placeholder="Enter a username"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={creds.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-[#4d4d4d] border-[#3f3f3f] placeholder-[#bbb8b8] text-white"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="w-full focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-white hover:bg-gray-200 cursor-pointer"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-400">
                Don't have an account?
                <Link
                  to="/signUp"
                  className="font-medium hover:underline text-blue-500"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
