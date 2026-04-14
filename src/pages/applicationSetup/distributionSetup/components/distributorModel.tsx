import { useFormik } from "formik";
import CustomInput from "../../../../components/customInput";
import { DistributorValidationSchema } from "../../../../utils/validations";
import CustomDatePicker from "../../../../components/datePicker";
import { Icon } from "@iconify/react";

type Props = {
  close: () => void;
  data?: any;
  loading?: any;
  onSave?: (values: any) => void;
  tableData?: any[];
  setTableData?: (val: any[]) => void;
  selectedIndex?: number | null;
};

export default function DistributorModel({
  close,
  data,
  onSave,
  tableData = [],
  setTableData,
  selectedIndex,
}: Props) {
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      distributorCode: data?.distributorCode || "",
      distributorName: data?.distributorName || "",
      contactNumber: data?.contactNumber || "",
      address: data?.address || "",
      city: data?.city || "",
      licenceNumber: data?.licenceNumber || "",
      licenceExpiryDate: data?.licenceExpiryDate || "",
      licenceStatus: data?.licenceStatus || "",
    },

    validationSchema: DistributorValidationSchema,

    onSubmit: (values) => {
      if (onSave) {
        onSave(values);
      } else if (setTableData) {
        if (typeof selectedIndex === "number") {
          const updated = [...tableData];
          updated[selectedIndex] = values;
          setTableData(updated);
        } else {
          setTableData([...tableData, values]);
        }
      }

      close();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-250 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xs font-semibold text-heading1">
            {selectedIndex !== null ? "Edit Distributor" : "Add Distributor"}
          </h2>

          <button onClick={close} className="text-xl cursor-pointer">
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 p-6">
            <CustomInput
              label="Distributor Code"
              name="distributorCode"
              value={formik.values.distributorCode}
              onChange={formik.handleChange}
            />
            {formik.touched.distributorCode &&
              typeof formik.errors.distributorCode === "string" && (
                <p className="text-xs text-red-500">
                  {formik.errors.distributorCode}
                </p>
              )}

            <CustomInput
              label="City"
              value={formik.values.city}
              onChange={(val) => formik.setFieldValue("city", val)}
            />
            {formik.touched.city && typeof formik.errors.city === "string" && (
              <p className="text-xs text-red-500">{formik.errors.city}</p>
            )}

            <CustomInput
              label="Distributor Name"
              name="distributorName"
              value={formik.values.distributorName}
              onChange={formik.handleChange}
            />

            <CustomInput
              label="Licence Number"
              name="licenceNumber"
              value={formik.values.licenceNumber}
              onChange={formik.handleChange}
            />

            <CustomInput
              label="Contact Number"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
            />

            <CustomDatePicker
              label="Licence Expiry Date"
              name="licenceExpiryDate"
              value={formik.values.licenceExpiryDate}
              onChange={(val: any) =>
                formik.setFieldValue("licenceExpiryDate", val)
              }
            />

            <CustomInput
              label="Address"
              value={formik.values.address}
              onChange={(val) => formik.setFieldValue("address", val)}
            />

            <CustomInput
              label="Licence Status"
              name="licenceStatus"
              value={formik.values.licenceStatus}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex justify-end p-4">
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 text-white rounded-md bg-primary"
            >
              <Icon icon="mynaui:save" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
