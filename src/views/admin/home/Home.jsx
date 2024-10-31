import "./home.css";

import React, { useEffect, useState } from "react";

import {
  arbitrationCaseStatus,
  areaWiseCaseStatus,
  caseTimeline,
} from "../../../adapter/adminAnalyticsAdapter";
import CustomizedStackedBarChart from "../../../components/bar-charts/CustomizedStackedBarChart";
import CustomizedLineChart from "../../../components/line-charts/CustomizedLineChart";
import CustomPieChart from "../../../components/pie-charts/CustomPieChart";

export default function Home() {
  const [allCasesStatusData, setAllCasesStatusData] = useState([]);
  const [areaCasesStatusData, setAreaCasesStatusData] = useState([]);
  const [caseTimelineData, setCaseTimelineData] = useState([]);
  useEffect(() => {
    getArbitrationCaseStatus();
    getAreaWiseCaseStatus();
    getCaseTimeline();
  }, []);
  const [filter, setFilter] = React.useState({
    fromDate: "",
    toDate: "",
    batch: [],
    organization: "",
    status: [0, 1, 2, 3, 4, 5],
  });

  const getArbitrationCaseStatus = () => {
    const response = arbitrationCaseStatus({});
    response.then(function (response) {
      if (response.error === false) {
        setAllCasesStatusData(
          response.results.data.map((element) => {
            return {
              status:
                (element.status === 0 && "In Review") ||
                (element.status === 1 && "Accepted") ||
                (element.status === 2 && "Rejected") ||
                (element.status === 3 && "Closed") ||
                (element.status === 4 && "Withdrawn") ||
                (element.status === 5 && "Confirm"),
              casesCount: element.count,
            };
          })
        );
      } else {
        console.warn("failed to fetch api");
      }
    });
  };

  const getAreaWiseCaseStatus = () => {
    const response = areaWiseCaseStatus({});
    response.then((response) => {
      if (response.error === false) {
        let message = response.results.data.map((element, index) => {
          let data = JSON.parse(response.results.data[index].data);
          return {
            pincode:
              (element.pincode === null && "Null") ||
              (element.pincode === "" && "Testing") ||
              (element.pincode === "400004" && "Girgaon") ||
              (element.pincode === "400006" && "Malabar Hill") ||
              (element.pincode === "400010" && "Mazgaon") ||
              (element.pincode === "400023" && "Nehru Nagar") ||
              (element.pincode === "400026" && "Cumballa") ||
              (element.pincode === "421503" && "Badlapur") ||
              (element.pincode === "462011" && "Shiksha Mandal") ||
              (element.pincode === "508278" && "Nidmanoor"),
            ...Object.assign(
              ...data.map(({ status, caseCount }) => {
                return {
                  [(status === "0" && "In Review") ||
                  (status === "1" && "Accepted") ||
                  (status === "2" && "Rejected") ||
                  (status === "3" && "Closed") ||
                  (status === "4" && "Withdrawn") ||
                  (status === "5" && "Confirm")]: caseCount,
                };
              })
            ),
          };
        });
        setAreaCasesStatusData(message);
      } else {
        console.warn("failed to fetch api");
      }
    });
  };

  const getCaseTimeline = () => {
    const response = caseTimeline({});
    response.then((response) => {
      if (response.error === false) {
        setCaseTimelineData(response.results.data);
      } else {
        console.warn("failed to fetch api");
      }
    });
  };
  const handelSetFilter = (updatedFilter) => {
    setFilter(updatedFilter);
  };
  return (
    <div className="navView">
      <div className="dashboard-charts-container">
        <div className="cart-items">
          <div className="">
            <span className="cart-items-title">Status of all cases</span>
            <CustomPieChart
              width={550}
              height={350}
              data={allCasesStatusData}
              actions={false}
            />
          </div>
        </div>
        <div className="cart-items">
          <div className="">
            <span className="cart-items-title">Area-specific case status</span>
            <CustomizedStackedBarChart
              className="cart-items"
              width={500}
              height={350}
              data={areaCasesStatusData}
            />
          </div>
        </div>
        <div className="cart-items">
          <div className="">
            <span className="cart-items-title">Case TimeLine</span>
            <CustomizedLineChart
              className="cart-items"
              width={1100}
              height={500}
              data={caseTimelineData}
              filter={filter}
              setFilter={handelSetFilter}
              actions={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
