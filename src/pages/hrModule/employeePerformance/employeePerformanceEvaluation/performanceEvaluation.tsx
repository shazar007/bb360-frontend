import { useLocation } from "react-router-dom";
import CustomTable from "../../../../components/customTable";
import CustomInput from "../../../../components/customInput";
import CustomDatePicker from "../../../../components/datePicker";

export default function PerformanceEvaluation() {
  const { state } = useLocation();

  const data = state?.item;

  console.log("Received:", data);

  if (!data) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="p-5 mt-2 ">
      <h2 className="text-lg font-bold mb-4">Performance Evaluation Detail</h2>

      <div className="mt-3 bg-bgprimary rounded-2xl">
        <div className="mt-2 bg-white rounded-2xl">
          <div className="bg-[#ECF0F4] rounded-t-2xl p-4">
            <p className="text-xs font-semibold text-heading1">
              Employee Infromation
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-y-2 xl:gap-x-20 gap-y-2">
            <CustomInput
              label="Employee"
              value={data?.employee?.name}
              disabled
            />
            <CustomInput
              label="Supervisor"
              value={data?.supervisor?.name}
              disabled
            />
            <CustomInput
              label="Transaction No"
              value={data?.transactionNo}
              disabled
            />
            <CustomDatePicker
              label="Date"
              disabled
              value={new Date(data?.transactionDate).toDateString()}
            />
            <CustomInput
              label="Total Score"
              value={data?.totalScore}
              disabled
            />
            <CustomInput
              label="Obtained Score"
              value={data?.obtainedTotal}
              disabled
            />
            <CustomInput
              label="Percentage"
              value={`${data?.percentage}%`}
              disabled
            />
          </div>
        </div>
      </div>

      <h5 className="font-semibold my-2">Evaluation Lines</h5>

      <div>
        <CustomTable
          height="auto"
          norounded
          headers={["Criteria", "Parent", "Total", "Obtained", "Comment"]}
          data={
            data?.lines?.map((line: any) => [
              line?.criteria?.name || line?.criteria?._id || "-",

              line?.criteriaParent?.name || line?.criteriaParent || "-",

              line?.totalScore ?? 0,

              line?.obtainScore ?? 0,

              line?.comments || "-",
            ]) || []
          }
        />
      </div>
    </div>
  );
}
