import React, { createContext, useReducer } from "react";
import axios from "axios";
import { Storage } from "aws-amplify";
import AppReducer from "./AppReducer";

const url =
  "https://pgfdn219ai.execute-api.us-west-2.amazonaws.com/Dev/usedcars";

const config = {
  headers: {
    "x-api-key": process.env.REACT_APP_AWS_API_GATEWAY_KEY,
  },
};

const initialState = {
  cars: [],
  images: [],
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getCars = async () => {
    try {
      const result = await axios.get(url, config);

      dispatch({
        type: "GET_CARS",
        loading: true,
        payload: result.data,
      });
    } catch (e) {
      console.log("error: ", e);
      dispatch({
        type: "DATABASE_ERROR",
        payload: "Error fetching data from backend",
      });
    }
  };

  const getFiles = async () => {
    try {
      let files = await Storage.list("", { level: "public" });

      const s3Data = [];
      for (let i = 0; i < files.results.length; i++) {
        const k = files.results[i];
        const data = k.key.split("/");

        const obj = {};
        if (data.length > 2 && data[2] !== "") {
          const signedUrl = await Storage.get(k.key);
          obj["vin"] = data[0];
          obj["fileType"] = data[1];
          obj["signedUrl"] = signedUrl;
          s3Data.push(obj);
        }
      }
      console.log("s3Data: ", s3Data);
      dispatch({
        type: "GET_FILES",
        loading: true,
        payload: s3Data,
      });
    } catch (e) {
      console.log("error: ", e);
      dispatch({
        type: "STORAGE_ERROR",
        payload: "Error fetching data from S3 Storage",
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cars: state.cars,
        loading: state.loading,
        files: state.files,
        getCars,
        getFiles,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
