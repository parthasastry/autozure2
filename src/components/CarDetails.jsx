import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import Report from "./Report";

import { numberFormat } from "../utilities/numberFormat";

const CarDetails = () => {
  let { vin } = useParams();
  const { cars, files } = useContext(GlobalContext);

  const carData = cars.filter((c) => {
    if (c.vin === vin) {
      return c;
    }
  });

  const images = files.filter((img) => {
    if (img.vin === vin && img.fileType === "images") {
      return img;
    }
  });

  const carfax = files.filter((cf) => {
    if (cf.vin === vin && cf.fileType === "carfax") {
      return cf;
    }
  });

  const inspection = files.filter((cf) => {
    if (cf.vin === vin && cf.fileType === "inspection") {
      return cf;
    }
  });

  return (
    <>
      <div className="w-full pt-20 min-h-screen">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-2 py-2 px-4 rounded text-center">
          <Link to="/buy">Go Back</Link>
        </button>
        {carData && carData.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-3 p-4">
            <div>
              <span className="font-bold">Car VIN: </span>
              {carData[0].vin}
            </div>
            <div>
              <span className="font-bold">Make: </span>
              {carData[0].make}
            </div>
            <div>
              <span className="font-bold">Model: </span>
              {carData[0].model}
            </div>
            <div>
              <span className="font-bold">Year: </span>
              {carData[0].year}
            </div>
            <div>
              <span className="font-bold">Price: </span>
              {numberFormat(carData[0].price)}
            </div>
            <div>
              <span className="font-bold">Zipcode: </span>
              {carData[0].zipcode}
            </div>
            <div>
              <Report type="Carfax" reports={carfax} />
            </div>
            <div>
              <Report type="Inspection" reports={inspection} />
            </div>
          </div>
        ) : null}

        {images && images.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-3 p-5">
            {images.map((i, index) => {
              return (
                <div key={index}>
                  <img
                    className="object-cover  h-48 w-96"
                    src={i.signedUrl}
                    alt="car"
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CarDetails;
