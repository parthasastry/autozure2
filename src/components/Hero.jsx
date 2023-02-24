import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="w-full pt-20 h-screen bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80')] bg-cover bg-center">
        <div className="flex flex-col justify-center align-items md:items-start w-full col-span-1 p-10 text-white">
          <p className="py-2 text-2xl font-mono">
            A platform where one can safely and securely transact, at a minimal
            cost to both individual buyer and seller
          </p>

          <button className="bg-[#7734eb] w-[100px] hover:bg-[#7734ez] text-white font-bold my-2 py-2 px-4 rounded text-center">
            <Link to={`/buy`}>Buy</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
