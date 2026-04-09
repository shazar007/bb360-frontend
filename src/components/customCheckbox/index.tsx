import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Icon } from "@iconify/react";

export default function CustomCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          icon={
            <div
              style={{
                width: 16,
                height: 16,
                border: "1px solid #14CCC3",
                borderRadius: 4,
              }}
            />
          }
          checkedIcon={
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#14CCC3",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Icon icon="fe:check" className="text-white" />
            </div>
          }
        />
      }
      label=""
    />
  );
}
