import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const handleClose = () => setNav(!nav);
  return (
    <>
      <nav>
        <div className="w-screen h-20 z-20 bg-[#7734eb] fixed drop-shadow-lg">
          <div className="px-2 flex justify-between items-center w-full h-full text-white">
            <div className="flex justify-between items-center">
              <div>
                <Link to="/">
                  <span className="uppercase font-bold text-2xl">AutoZure</span>
                </Link>
                <div className="text-sm italic">
                  Buying used car has never been this easy
                </div>
              </div>
            </div>

            <ul className="hidden uppercase md:px-20 md:flex">
              <li className="p-4">
                <Link to="/">Home</Link>
              </li>
              <li className="p-4">
                <Link to="/buy">Buy</Link>
              </li>
              <li className="p-4">
                <Link to="/sell">Sell</Link>
              </li>
              <li className="p-4">
                <Link to="/signup">Signup</Link>
              </li>
            </ul>

            <div className="md:hidden mr-4" onClick={handleClick}>
              {!nav ? (
                <RxHamburgerMenu size={30} />
              ) : (
                <AiOutlineClose size={30} />
              )}
            </div>
          </div>

          <ul
            className={
              !nav
                ? "hidden"
                : "absolute bg-[#64748B] w-full px-8 text-white uppercase text-center md:hidden"
            }
          >
            <li className="p-4">
              <Link to="/" onClick={handleClose}>
                Home
              </Link>
            </li>
            <li className="p-4">
              <Link to="/sell" onClick={handleClose}>
                Sell
              </Link>
            </li>
            <li className="p-4">
              <Link to="/signup" onClick={handleClose}>
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
