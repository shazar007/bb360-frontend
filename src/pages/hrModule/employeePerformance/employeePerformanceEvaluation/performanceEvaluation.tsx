import { useLocation } from "react-router-dom";
import CustomTable from "../../../../components/customTable";

export default function PerformanceEvaluation() {
  const { state } = useLocation();

  const data = state?.item; // 👈 your full API object

  console.log("Received:", data);

  if (!data) {
    return <div>No Data Found</div>;
  }

  return (
    <div className="p-5 mt-2 ">
      <h2 className="text-lg font-bold mb-4">Performance Evaluation Detail</h2>

      {/* Employee Info */}
      <div className="mb-3 bg-white rounded-lg p-4">
        <p>
          <b>Employee:</b> {data?.employee?.name} ({data?.employee?.employeeId})
        </p>
        <p>
          <b>Supervisor:</b> {data?.supervisor?.name}
        </p>
        <p>
          <b>Transaction No:</b> {data?.transactionNo}
        </p>
        <p>
          <b>Date:</b> {new Date(data?.transactionDate).toDateString()}
        </p>
        <p>
          <b>Status:</b> {data?.status}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-5 bg-white rounded-lg p-4">
        <p>
          <b>Total Score:</b> {data?.totalScore}
        </p>
        <p>
          <b>Obtained Score:</b> {data?.obtainedTotal}
        </p>
        <p>
          <b>Percentage:</b> {data?.percentage}%
        </p>
      </div>

      <h5 className="font-semibold mb-2">Evaluation Lines</h5>

      <div>
        <CustomTable
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
