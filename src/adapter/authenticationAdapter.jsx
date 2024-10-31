const checkToken = async (filter) => {
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + suser.token + "",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(baseUrl + "check-token", settings);
    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};
