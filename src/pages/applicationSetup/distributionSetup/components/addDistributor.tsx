import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import { DistributorValidationSchema } from "../../../../utils/validations";

type Props = {
  close: () => void;
};

export default function AddIDistributor({ close }: Props) {
  const formik = useFormik({
    initialValues: {
      distributorCode: "",
      distributorName: "",
      contactNumber: "",
      address: "",
      city: "",
      licenceNumber: "",
      licenceExpiryDate: "",
      licenceStatus: "",
    },
    validationSchema: DistributorValidationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Close modal or reset form
      close();
    },
  });

  const addressOptions = [
    { label: "Street 1", value: "street1" },
    { label: "Street 2", value: "street2" },
  ];

  const cityOptions = [
    { label: "Karachi", value: "karachi" },
    { label: "Lahore", value: "lahore" },
    { label: "Islamabad", value: "islamabad" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xs font-semibold text-heading1">Add Item</h2>
          <button
            onClick={close}
            className="text-xl cursor-pointer text-heading1"
          >
            ✕
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 p-6">
            <div>
              <CustomInput
                label="Distributor Code"
                placeholder="Enter Code"
                value={formik.values.distributorCode}
                onChange={formik.handleChange}
                name="distributorCode"
              />
              {formik.touched.distributorCode &&
                formik.errors.distributorCode && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.distributorCode}
                  </p>
                )}
            </div>
            <div>
              <CustomInput
                label="Distributor Name"
                placeholder="Enter Distributor Name"
                value={formik.values.distributorName}
                onChange={formik.handleChange}
                name="distributorName"
              />
              {formik.touched.distributorName &&
                formik.errors.distributorName && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.distributorName}
                  </p>
                )}
            </div>
            <div>
              <CustomInput
                label="Contact Number"
                placeholder="Enter Contact Number"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                name="contactNumber"
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.contactNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <CustomSelect
                label="Address"
                placeholder="Enter Address"
                options={addressOptions}
                value={formik.values.address}
                onChange={(val) => formik.setFieldValue("address", val)}
                onBlur={() => formik.setFieldTouched("address", true)}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.address}
                </p>
              )}
            </div>
            <div>
              <CustomSelect
                label="City"
                placeholder="Enter City"
                options={cityOptions}
                value={formik.values.city}
                onChange={(val) => formik.setFieldValue("city", val)}
                onBlur={() => formik.setFieldTouched("city", true)}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.city}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                label="Licence Number"
                placeholder="Enter Licence Number"
                value={formik.values.licenceNumber}
                onChange={formik.handleChange}
                name="licenceNumber"
              />
              {formik.touched.licenceNumber && formik.errors.licenceNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.licenceNumber}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                label="Licence Expiry Date"
                placeholder="Enter Licence Expiry Date"
                value={formik.values.licenceExpiryDate}
                onChange={formik.handleChange}
                name="licenceExpiryDate"
              />
              {formik.touched.licenceExpiryDate &&
                formik.errors.licenceExpiryDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.licenceExpiryDate}
                  </p>
                )}
            </div>
            <div>
              <CustomInput
                label="Licence Status"
                placeholder="Enter Licence Status"
                value={formik.values.licenceStatus}
                onChange={formik.handleChange}
                name="licenceStatus"
              />
              {formik.touched.licenceStatus && formik.errors.licenceStatus && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.licenceStatus}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end p-4">
            <button
              type="submit"
              className="bg-primary text-xs text-white cursor-pointer w-15 rounded-md h-8.5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
