import { Button, ButtonGroup } from "@mui/material";
import React, { PureComponent } from "react";
import {
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

/**
A customized line chart component using the Recharts library.
It supports showing data for a specific range of months.
@module CustomizedLineChart
@param {Object} props - Component props
@param {Array<Object>} props.data - Array of objects containing data for the chart
@param {number} props.width - Width of the chart in pixels
@param {number} props.height - Height of the chart in pixels
*/
const now = Date.now(); // get the current timestamp in milliseconds

/**

Formats a timestamp to display the month and year.
@param {number} tick - Timestamp in milliseconds
@returns {string} - Formatted string
*/
const monthTickFormatter = (tick) => {
  const date = new Date(tick);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
};

export default class CustomizedLineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [props.data], // chart data here
      activeButton: 0,
    };
  }

  /**

Updates the component's state when the props change.
@param {Object} prevProps - The previous props object
*/
  componentDidUpdate(prevProps) {
    // Check if the props have been updated
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data });
    }
  }
  /**

A custom brush component for the ComposedChart.
@param {Object} param - Object containing brush properties
@returns {ReactElement} - Custom brush component
*/
  CustomBrush = ({ startIndex, endIndex, ...restProps }) => (
    <rect
      x={startIndex}
      y={0}
      width={endIndex - startIndex}
      height={30}
      {...restProps}
    />
  );
  /**

Updates the chart data state based on the selected range.
@param {number} months - Number of months to show in the chart
*/
  handleRangeChange = (months) => {
    this.setState({ data: this.props.data.slice(-months) });
    this.setState({ activeButton: months });
  };
  render() {
    return (
      <div>
        <ButtonGroup
          variant="contained"
          aria-label="text button group"
          className="timeline-button-group"
        >
          <Button
            onClick={() => this.handleRangeChange(3)}
            variant="text"
            className={this.state.activeButton === 3 ? "active-button" : ""}
          >
            3 Months
          </Button>
          <Button
            onClick={() => this.handleRangeChange(6)}
            variant="text"
            className={this.state.activeButton === 6 ? "active-button" : ""}
          >
            6 Months
          </Button>
          <Button
            onClick={() => this.handleRangeChange(12)}
            variant="text"
            className={this.state.activeButton === 12 ? "active-button" : ""}
          >
            1 year
          </Button>{" "}
          <Button
            onClick={() => this.handleRangeChange(0)}
            variant="text"
            className={this.state.activeButton === 0 ? "active-button" : ""}
          >
            All
          </Button>
        </ButtonGroup>

        <ComposedChart
          width={this.props.width}
          height={this.props.height}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="created_at" height={60} tickGap={20} /> */}
          <XAxis
            dataKey="created_at"
            interval={3}
            tickFormatter={monthTickFormatter}
          />
          <YAxis />
          <Tooltip
            dataKey="created_at"
            content={<CustomTooltip />}
            tooltipStyle={{ border: "none" }}
          />
          <Legend
            content={
              <CustomLegend
                filter={this.props.filter}
                setFilter={this.props.setFilter}
                actions={this.props.actions}
              />
            }
          />
          <Brush
            dataKey="created_at"
            height={25}
            stroke="#8884d8"
            strokeWidth={10} // increase the brush stroke width
            travellerWidth={11} // increase the traveller width
            customBrush={this.CustomBrush}
            onChange={(e) => {
              this.setState({ activeRange: e.endIndex });
            }}
          />
          <Line
            type="monotone"
            dataKey="casesCount"
            fill="#8884d8"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="review"
            stroke="rgb(251 192 0)"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="accepted"
            stroke="#00FFFF"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="rejected"
            stroke="#FF0000"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="closed"
            stroke="#C1997D"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="withdrawn"
            stroke="#c9ccc4"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="confirm"
            stroke="#7FFF00"
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </div>
    );
  }
}
