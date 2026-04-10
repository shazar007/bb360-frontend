import { useFormik } from "formik";
import CustomInput from "../../../../components/customInput";
import CustomSelect from "../../../../components/customSelect";
import { ItemValidationSchema } from "../../../../utils/validations";

export default function AddItem({ close, Edit }: any) {
  const formik = useFormik({
    initialValues: {
      productCode: "",
      productName: "",
      itemCategory: "",
      uom: "",
      tradePrice: "",
      mrp: "",
      batchNumber: "",
      expiryDate: "",
    },
    validationSchema: ItemValidationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });
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
                label="Product Code"
                name="productCode"
                placeholder="Enter Code"
                value={formik.values.productCode}
                onChange={formik.handleChange}
              />
              {formik.touched.productCode && formik.errors.productCode && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.productCode}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                label="Product Name"
                name="productName"
                placeholder="Enter Product Name"
                value={formik.values.productName}
                onChange={formik.handleChange}
              />
              {formik.touched.productName && formik.errors.productName && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.productName}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                label="Item Category"
                name="itemCategory"
                placeholder="Enter Item Category"
                value={formik.values.itemCategory}
                onChange={formik.handleChange}
              />
              {formik.touched.itemCategory && formik.errors.itemCategory && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.itemCategory}
                </p>
              )}
            </div>

            <div>
              <CustomSelect
                label="Units Of Measure"
                options={[
                  { value: "kg", label: "Kilogram" },
                  { value: "ltr", label: "Liter" },
                  { value: "pcs", label: "Pieces" },
                ]}
                value={formik.values.uom}
                onChange={(value) => formik.setFieldValue("uom", value)}
              />
              {formik.touched.uom && formik.errors.uom && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.uom}</p>
              )}
            </div>

            <div>
              <CustomSelect
                label="T.P"
                options={[
                  { value: 100, label: "100" },
                  { value: 200, label: "200" },
                  { value: 300, label: "300" },
                ]}
                value={formik.values.tradePrice}
                onChange={(value) => formik.setFieldValue("tradePrice", value)}
              />
              {formik.touched.tradePrice && formik.errors.tradePrice && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.tradePrice}
                </p>
              )}
            </div>
            <div>
              <CustomInput
                label="M.R.P"
                name="mrp"
                placeholder="Enter Market Retail Price"
                value={formik.values.mrp}
                onChange={formik.handleChange}
              />
              {formik.touched.mrp && formik.errors.mrp && (
                <p className="mt-1 text-xs text-red-500">{formik.errors.mrp}</p>
              )}
            </div>
          </div>

          {Edit && (
            <div className="grid grid-cols-2 gap-4 px-6">
              <CustomSelect
                label="Batch Number"
                options={[
                  { value: "B1", label: "B1" },
                  { value: "B2", label: "B2" },
                ]}
                value={formik.values.batchNumber}
                onChange={(value) => formik.setFieldValue("batchNumber", value)}
              />
              <CustomInput
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
              />
            </div>
          )}
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
