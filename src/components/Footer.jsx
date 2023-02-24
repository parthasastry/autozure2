import React from "react";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <footer className="inset-x-0 bottom-0 text-center p-6 bg-gray-200">
        <div>{year} &copy; Copyright: Vivek Amble & Parthasarathy Sastry</div>
      </footer>
    </>
  );
};

export default Footer;
