import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Cell, Legend, Pie, PieChart, Sector } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    payload,
    status,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 40;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {/* {payload.status} */}
        {payload.status}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {status}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function CustomPieChart(props) {
  const COLORS = [
    "rgb(251 192 0)",
    "#00FFFF",
    // "#FF0000",
    "#8884d8",
    "#C1997D",
    "#c9ccc4",
    "#7FFF00",
  ];
  // console.log(data)
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <PieChart width={props.width} height={props.height}>
      <Legend
        content={(content) => {
          return (
            <div className="custom-legend-container">
              {content &&
                content.payload &&
                content.payload.map((lable, index) => (
                  <div
                    className="legend-item"
                    key={index}
                    style={{ color: lable.color }}
                  >
                    {props.actions ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            sx={{
                              color: lable.color,
                              "&.Mui-checked": {
                                color: lable.color,
                              },
                            }}
                            // onChange={checkStatus}
                          />
                        }
                        label={lable.payload.status}
                      />
                    ) : (
                      <div>{lable.payload.status}</div>
                    )}
                  </div>
                ))}
            </div>
          );
        }}
      />
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={props.data}
        cx={280}
        cy={125}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="casesCount"
        onMouseEnter={onPieEnter}
      >
        {props.data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
