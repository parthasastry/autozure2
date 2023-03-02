import * as yup from "yup";

const d = new Date();
let year = d.getFullYear();

export const listingSchema = yup.object().shape({
  vin: yup.string().min(17).max(17).required("17 Characters required"),
  make: yup.string().required(),
  model: yup.string().required(),
  year: yup.number().min(1990).max(year).required(),
  price: yup.number().required(),
  zipcode: yup.number().required(),
  images: yup.mixed().required("Image(s) is required"),
  carfax: yup.mixed().required("Carfax report is required"),
  inspection: yup.mixed().required("Inspection report is required"),
});
