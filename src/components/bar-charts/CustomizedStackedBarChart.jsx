import React, { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
          style={{ fontSize: "10px" }}
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class CustomizedStackedBarChart extends PureComponent {
  render() {
    return (
      <BarChart
        width={this.props.width}
        height={this.props.height}
        data={this.props.data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pincode" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip actions={this.props.actions} />
        <Legend />
        <Bar
          dataKey="In Review"
          stackId="In Review"
          // stackId="a"
          fill="rgb(251 192 0)"
          background={{ fill: "#ebebeb94" }}
        />
        <Bar
          dataKey="Accepted"
          stackId="Accepted"
          // stackId="a"
          fill="#00FFFF"
          background={{ fill: "#ebebeb94" }}
        />
        <Bar
          dataKey="Rejected"
          stackId="Rejected"
          // stackId="a"
          fill="#8884d8"
          background={{ fill: "#ebebeb94" }}
        />
        <Bar
          dataKey="Closed"
          stackId="Closed"
          // stackId="a"
          fill="#C1997D"
          background={{ fill: "#ebebeb94" }}
        />
        <Bar
          dataKey="Withdrawn"
          stackId="Withdrawn"
          // stackId="a"
          fill="#c9ccc4"
          background={{ fill: "#ebebeb94" }}
        />
        <Bar
          dataKey="Confirm"
          stackId="Confirm"
          // stackId="a"
          fill="#7FFF00"
          background={{ fill: "#ebebeb94" }}
        />
      </BarChart>
    );
  }
}
