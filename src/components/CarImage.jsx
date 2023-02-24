import React, { useEffect, useState } from "react";
import { processFiles } from "../utilities/processFiles";

const CarImage = ({ vin, files }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const result = processFiles(vin, files);
      setImages(result.images);
    }
  }, [files]);

  return (
    <>
      <img className="object-cover  h-48 w-96" src={images[0]} alt="car" />
    </>
  );
};

export default CarImage;
