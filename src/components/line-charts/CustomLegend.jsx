import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomLegend = ({ payload, filter, setFilter, actions }) => {
  const handleValueChange = (value) => (event) => {
    const index = filter.status.indexOf(value);
    if (index !== -1) {
      // Value is present in the array, remove it
      setFilter({
        ...filter,
        status: [...filter.status.filter((item) => item !== value)],
      });
    } else {
      // Value is not present in the array, add it
      setFilter({
        ...filter,
        status: [...filter.status, value],
      });
    }
  };
  return (
    <div className="custom-legend-container">
      {payload &&
        payload.map((lable, index) => (
          <div
            className="legend-item"
            key={index}
            style={{ color: lable.color }}
          >
            {actions ? (
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={index === 0}
                    checked={filter.status.includes(index - 1)}
                    sx={{
                      color: lable.color,
                      "&.Mui-checked": {
                        color: lable.color,
                      },
                    }}
                    onClick={handleValueChange(index - 1)}
                  />
                }
                label={lable.dataKey}
              />
            ) : (
              <div>{lable.dataKey}</div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CustomLegend;
