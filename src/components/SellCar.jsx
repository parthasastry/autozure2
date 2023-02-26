import React, { useState } from "react";
import axios from "axios";
import { Storage } from "aws-amplify";

const SellCar = () => {
  const [vin, setVin] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(0);
  const [zipcode, setZipcode] = useState(0);
  const [images, setImages] = useState([]);
  const [carfax, setCarfax] = useState("");
  const [inspection, setInspection] = useState("");

  const errorHandling = () => {
    if (!vin) {
    }
  };
  const onImageChange = async (images) => {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const filePath = `${vin}/images/${file.name}`;
      try {
        const result = await Storage.put(filePath, file);
      } catch (e) {
        console.log("error uploading file: ", file.name, " error: ", e);
      }
    }
  };

  const onCarfaxChange = async (carfax) => {
    const filePath = `${vin}/carfax/${carfax.name}`;
    try {
      const result = await Storage.put(filePath, carfax);
      console.log("Carfax Success: ", result);
    } catch (e) {
      console.log(
        "error uploading Carfax report: ",
        carfax.name,
        " error: ",
        e
      );
    }
  };

  const onInspectionChange = async (inspection) => {
    const filePath = `${vin}/inspection/${inspection.name}`;
    try {
      const result = await Storage.put(filePath, inspection);
      console.log("Carfax Success: ", result);
    } catch (e) {
      console.log(
        "error uploading Inspection report: ",
        inspection.name,
        " error: ",
        e
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let listing = {
      vin,
      status: "Available",
      make,
      model,
      year,
      price,
      zipcode,
    };

    createListing(listing);
    onImageChange(images);
    onCarfaxChange(carfax);
    onInspectionChange(inspection);

    setVin("");
    setMake("");
    setModel("");
    setYear(0);
    setPrice(0);
    setZipcode(0);
    setImages([]);
  };

  const reset = (e) => {
    e.preventDefault();
    setVin("");
    setMake("");
    setModel("");
    setYear(0);
    setPrice(0);
    setZipcode(0);
    setImages([]);
  };

  const createListing = async (listing) => {
    const url =
      "https://pgfdn219ai.execute-api.us-west-2.amazonaws.com/Dev/car";
    try {
      await axios.post(url, listing);
    } catch (e) {
      console.log("Error inserting data: ", e);
    }
  };

  return (
    <>
      <div className="w-full pt-20 min-h-screen text-center">
        <div className="font-bold text-2xl">Enter Car details</div>
        <div>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div className="grid md:grid-cols-3 gap-3 p-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="vin"
                >
                  Car VIN
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="vin"
                  type="text"
                  placeholder="VIN"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="make"
                >
                  Make
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="make"
                  type="text"
                  placeholder="Make"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="model"
                >
                  Model
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="model"
                  type="text"
                  placeholder="Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="year"
                >
                  Year
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="year"
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Listing price ($)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="Listing Price ($)"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="zipcode"
                >
                  US Zipcode
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zipcode"
                  type="number"
                  placeholder="Zipcode"
                  onChange={(e) => setZipcode(e.target.value)}
                  value={zipcode}
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="images"
                >
                  Upload Car Images
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="images"
                  type="file"
                  placeholder="Upload car images"
                  onChange={(e) => setImages(e.target.files)}
                  multiple
                  accept="image/png, image/jpg, image/jpeg"
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="carfax"
                >
                  Upload Carfax report
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="carfax"
                  type="file"
                  placeholder="Upload carfax report"
                  onChange={(e) => setCarfax(e.target.files[0])}
                  accept="application/pdf"
                ></input>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="inspection"
                >
                  Upload Car Inspection Report
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="inspection"
                  type="file"
                  placeholder="Upload inspection report"
                  onChange={(e) => setInspection(e.target.files[0])}
                  accept="application/pdf"
                ></input>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onSubmit}
              >
                Submit
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellCar;
