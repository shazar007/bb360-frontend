import * as Yup from "yup";
export const LoginvalidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const ItemValidationSchema = Yup.object({
  productCode: Yup.string().required("Product Code is required"),
  productName: Yup.string().required("Product Name is required"),
  itemCategory: Yup.string().required("Item Category is required"),
  uom: Yup.string().required("Unit of Measure is required"),
  tradePrice: Yup.number()
    .typeError("Trade Price must be a number")
    .required("Trade Price is required"),
  mrp: Yup.number()
    .typeError("MRP must be a number")
    .required("MRP is required"),
  batchNumber: Yup.string().when("Edit", {
    is: (val: boolean) => val === true, // Type-safe check
    then: (schema) => schema.required("Batch Number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  expiryDate: Yup.date().when("Edit", {
    is: (val: boolean) => val === true,
    then: (schema) => schema.required("Expiry Date is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const DistributorValidationSchema = Yup.object({
  distributorCode: Yup.string().required("Distributor Code is required"),
  distributorName: Yup.string().required("Distributor Name is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  licenceNumber: Yup.string().required("Licence Number is required"),
  licenceExpiryDate: Yup.string().required("Licence Expiry Date is required"),
  licenceStatus: Yup.string().required("Licence Status is required"),
});
