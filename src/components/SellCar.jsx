import React, { useState } from "react";
import axios from "axios";
import { Storage } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { listingSchema } from "../utilities/FormValidations";

const SellCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(listingSchema),
  });

  const onImageChange = async (vin, images) => {
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

  const onCarfaxChange = async (vin, carfax) => {
    for (let i = 0; i < carfax.length; i++) {
      const file = carfax[i];
      const filePath = `${vin}/carfax/${file.name}`;
      try {
        const result = await Storage.put(filePath, file);
      } catch (e) {
        console.log("error uploading file: ", file.name, " error: ", e);
      }
    }
  };

  const onInspectionChange = async (vin, inspection) => {
    for (let i = 0; i < inspection.length; i++) {
      const file = inspection[i];
      const filePath = `${vin}/inspection/${file.name}`;
      try {
        const result = await Storage.put(filePath, file);
      } catch (e) {
        console.log("error uploading file: ", file.name, " error: ", e);
      }
    }
  };

  const onSubmit = (data, e) => {
    console.log(data);

    let listing = {
      vin: data.vin,
      status: "Available",
      make: data.make,
      model: data.model,
      year: data.year,
      price: data.price,
      zipcode: data.zipcode,
    };

    createListing(listing);
    onImageChange(data.vin, data.images);
    onCarfaxChange(data.vin, data.carfax);
    onInspectionChange(data.vin, data.inspection);

    e.target.reset();
  };

  const reset = (e) => {
    e.preventDefault();
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
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  {...register("vin", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.vin?.message}
                </p>
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
                  {...register("make", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.make?.message}
                </p>
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
                  {...register("model", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.model?.message}
                </p>
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
                  {...register("year", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.year?.message}
                </p>
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
                  {...register("price", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.price?.message}
                </p>
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
                  {...register("zipcode", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.zipcode?.message}
                </p>
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
                  name="images"
                  type="file"
                  placeholder="Upload car images"
                  multiple
                  accept="image/png, image/jpg, image/jpeg"
                  {...register("images", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.images?.message}
                </p>
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
                  name="carfax"
                  type="file"
                  placeholder="Upload carfax report"
                  accept="application/pdf"
                  {...register("carfax", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.carfax?.message}
                </p>
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
                  name="inspection"
                  type="file"
                  placeholder="Upload inspection report"
                  accept="application/pdf"
                  {...register("inspection", { required: true })}
                ></input>
                <p className="text-sm italic text-red-900">
                  {errors.inspection?.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                id="submit"
              />

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
