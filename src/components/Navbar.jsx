import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const logOut = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="text-white bg-amber-200">
      <nav className="h-15 p-2 fixed top-0 left-0 right-0 bg-primary w-full">
        <div className="flex h-full items-center px-4 justify-between">
          {/* left */}
          <div className="flex gap-3 items-center">
            <div className="text-xl cursor-pointer">
              <RxHamburgerMenu />
            </div>
            <Link to="/">
              <div className="h-6">
                <img
                  className="w-full h-full object-cover"
                  src="/imgs/youtubeLogo.png"
                  alt="Youtube Logo"
                />
              </div>
            </Link>
          </div>
          {/* middle */}
          <div className="flex items-center p-0 w-1/3 h-[80%]">
            <form
              onSubmit={handleSearch}
              className="flex h-full w-full items-center border-1 rounded-4xl border-[#222222]"
            >
              <div className="lg:h-[4vh] h-9 w-[90%] rounded-tl-4xl rounded-bl-4xl rounded-tr-0 focus-within:outline-1 focus-within:outline-[#2c4e96] ml-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="px-3 focus:outline-none text-gray-400"
                />
              </div>
              <button
                type="submit"
                className="hidden lg:block py-2 px-6 h-full bg-secondary ml-0.5 rounded-tl-0 rounded-bl-0 rounded-tr-4xl rounded-br-4xl cursor-pointer"
              >
                <CiSearch />
              </button>
            </form>
            <button className="hidden lg:flex bg-secondary h-full aspect-square justify-center items-center rounded-full mx-3 cursor-pointer">
              <IoMdMic />
            </button>
          </div>

          {/* right */}
          <div className="flex h-full items-center">
            <button className="hidden bg-secondary h-[86%] aspect-square lg:flex justify-center items-center rounded-full mx-3 cursor-pointer">
              <BsThreeDotsVertical />
            </button>
            {isLoggedIn ? (
              <button
                onClick={logOut}
                className="flex hover:bg-[#222222] h-[86%] items-center border-1 rounded-4xl border-[#555555] px-3 gap-2 cursor-pointer"
              >
                <div>Sign out</div>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex hover:bg-[#222222] h-[86%] items-center border-1 rounded-4xl border-[#555555] px-3 gap-2 cursor-pointer"
              >
                <div>
                  <BsPersonCircle />
                </div>
                <div>Sign in</div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
