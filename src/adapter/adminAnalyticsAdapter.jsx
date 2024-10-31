import baseUrl from "../variables";

const arbitrationCaseStatus = async (filter) => {
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + "arbitration-case-status",
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const areaWiseCaseStatus = async (filter) => {
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + "area-arbitration-case-status",
      settings
    );
    const datahttp = await fetchResponse.json();

    return datahttp;
  } catch (e) {
    return e;
  }
};

const caseTimeline = async (filter) => {
  const settings = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  };
  try {
    const fetchResponse = await fetch(baseUrl + "cases-timeline", settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
export { arbitrationCaseStatus, areaWiseCaseStatus, caseTimeline };
