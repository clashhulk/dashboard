import React from "react";

export default class CustomTooltip extends React.Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          {payload &&
            payload.map((lable, index) => {
              return (
                <p
                  key={index}
                  className="label"
                  style={{ color: "" + lable.color + "" }}
                >{`${lable.dataKey} : ${lable.value} `}</p>
              );
            })}
          <p className="intro">
            {new Date(label).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              // minute: "numeric",
              // second: "numeric",
              // timeZoneName: "short",
            })}
          </p>
        </div>
      );
    }
    return null;
  }
}
