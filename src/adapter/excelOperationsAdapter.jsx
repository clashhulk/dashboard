import baseUrl from "../variables";

const getColumnNames = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const settings = {
    method: "POST",
    headers: {
      //   Authorization: "Bearer " + Suser.token + "",
      // Accept: "application/json",
      // "Content-Type": "application/json",
    },
    body: formData,
  };
  try {
    const fetchResponse = await fetch(
      baseUrl + `get-excelfile-column-names`,
      settings
    );

    const datahttp = await fetchResponse.json();
    return datahttp;
  } catch (e) {
    return e;
  }
};

const getMIS = async (
  file1,
  file2,
  columnsToMerge,
  primaryColumns,
  f1StartRow,
  f2StartRow
) => {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  formData.append("columnsToMerge", JSON.stringify(columnsToMerge));
  formData.append("primaryColumns", JSON.stringify(primaryColumns));
  formData.append("f1StartRow", JSON.stringify(f1StartRow));
  formData.append("f2StartRow", JSON.stringify(f2StartRow));
  const settings = {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
    },
    body: formData,
  };
  try {
    const fetchResponse = await fetch(baseUrl + `merge-files`, settings);
    return fetchResponse;
  } catch (e) {
    return e;
  }
};
export { getColumnNames, getMIS };
