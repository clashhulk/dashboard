import baseUrl from "../variables";

const getBatches = async (filter) => {
  const settings = {
    method: "GET",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(baseUrl + "get-batches", settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const getOrganizations = async (filter) => {
  const settings = {
    method: "GET",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + "get-users-organizations",
      settings
    );
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
const getArbitrators = async (filter) => {
  const settings = {
    method: "GET",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(baseUrl + "get-arbitrators", settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

export { getArbitrators, getBatches, getOrganizations };
