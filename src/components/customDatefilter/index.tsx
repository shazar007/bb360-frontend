import { Icon } from "@iconify/react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CustomDate from "../../components/datePicker";

interface Props {
  onClose: () => void;
}

export default function Filter({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-150 overflow-hidden bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-400">
          <h2 className="text-sm font-semibold text-heading1">Filters</h2>
          <button
            onClick={onClose}
            className="text-2xl cursor-pointer text-[#302250]"
          >
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="p-6">
          <div>
            <p className="mb-1 text-sm font-semibold text-heading1 -mt-2 ml-0">
              Date Filter
            </p>

            <RadioGroup
              row
              defaultValue="today"
              className="flex flex-wrap gap-6 -mt-2.5 -ml-3"
            >
              <FormControlLabel
                value="today"
                label="Today"
                className="m-0!"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#A0A7B4",
                      "&.Mui-checked": { color: "#A0A7B4" },
                    }}
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 400,
                  },
                }}
              />

              <FormControlLabel
                value="week"
                label="This Week"
                className="m-0!"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#A0A7B4",
                      "&.Mui-checked": { color: "#A0A7B4" },
                    }}
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 400,
                  },
                }}
              />

              <FormControlLabel
                value="month"
                label="This Month"
                className="m-0!"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#A0A7B4",
                      "&.Mui-checked": { color: "#A0A7B4" },
                    }}
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 400,
                  },
                }}
              />

              <FormControlLabel
                value="year"
                label="This Year"
                className="m-0!"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#A0A7B4",
                      "&.Mui-checked": { color: "#A0A7B4" },
                    }}
                  />
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    color: "#374151",
                    fontWeight: 400,
                  },
                }}
              />
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-1 md:grid-cols-2">
            <CustomDate label="From Date" placeholder="01-Mar-2026" />

            <CustomDate label="To Date" placeholder="01-Mar-2026" />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={onClose}
              className="flex items-center justify-center h-10 px-8 text-sm bg-white rounded-md shadow-[0_1px_12px_#0000001F] text-heading1 cursor-pointer"
            >
              Cancel
            </button>

            <button className="flex items-center justify-center h-10 px-10 text-sm text-white rounded-md cursor-pointer bg-primary shadow-[0_1px_12px_#0000001F]">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
