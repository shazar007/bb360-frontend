import { useFormik } from "formik";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";
import { Icon } from "@iconify/react";
import { SyncLoader } from "react-spinners";

export default function ItemModel({ close, data, onSave, saveLoading }: any) {
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      itemName: data?.itemName || "",
      tp: data?.tp || "",
      mrp: data?.mrp || "",
      expiryDate: data?.expiryDate || "",
    },

    onSubmit: (values) => {
      console.log("SUBMIT 🔥", values);

      if (onSave) onSave(values);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-xl">
        <div className="flex items-center justify-between px-6 py-3 pb-3 border-b">
          <h2 className="text-xs font-semibold text-heading1">Edit Item</h2>

          <button onClick={close} className="cursor-pointer">
            ✕
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 p-4">
            <CustomInput
              label="Item Name"
              name="itemName"
              value={formik.values.itemName}
              onChange={formik.handleChange}
            />
            <CustomDatePicker
              label="Expiry Date"
              name="expiryDate"
              value={
                formik.values.expiryDate
                  ? formik.values.expiryDate.slice(0, 10)
                  : ""
              }
              onChange={(value: any) =>
                formik.setFieldValue("expiryDate", value)
              }
            />

            <CustomInput
              label="Trade Price"
              name="tp"
              value={formik.values.tp}
              onChange={formik.handleChange}
            />

            <CustomInput
              label="M.R.P"
              name="mrp"
              value={formik.values.mrp}
              onChange={formik.handleChange}
            />
          </div>

          <div className="flex justify-end p-4">
            <button
              type="submit"
              disabled={saveLoading}
              className="h-10 text-sm flex justify-center items-center gap-2 text-white rounded-md cursor-pointer bg-primary w-27.5 disabled:opacity-60"
            >
              {saveLoading ? (
                <SyncLoader color="#fff" size={6} speedMultiplier={0.6} />
              ) : (
                <>
                  <Icon icon="mynaui:save" className="text-xl" />
                  Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
