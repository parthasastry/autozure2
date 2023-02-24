import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import CarImage from "../components/CarImage";
import { numberFormat } from "../utilities/numberFormat";
// import CarFiles from "./CarFiles";
// import CarFiles2 from "./CarFiles2";

import Spinner from "./Spinner";

const Showroom = () => {
  const { loading, cars, getCars, files, getFiles } = useContext(GlobalContext);

  useEffect(() => {
    getCars();
    getFiles();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="w-full pt-20 min-h-screen">
          {cars.length > 0 ? (
            <div>
              <div className="grid md:grid-cols-3 gap-3 m-2">
                {cars.map((car, index) => (
                  <div key={index}>
                    <div className="px-6 py-4 text-center">
                      <div className="font-bold text-xl mb-2">
                        {car.make} {car.model} {car.year}
                      </div>
                      <p>{numberFormat(car.price)}</p>
                      <p>Zipcode - {car.zipcode}</p>
                      <CarImage vin={car.vin} files={files} />
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded text-center">
                        <Link to={`/${car.vin}`}>Details</Link>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>No data</div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Showroom;
