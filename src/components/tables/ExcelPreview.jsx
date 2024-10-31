import React from "react";
import { read, utils } from "xlsx";

const ExcelPreview = ({ blob }) => {
  const [sheetData, setSheetData] = React.useState(null);

  React.useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(sheet, { header: 1 });
      setSheetData(json);
    };
    fileReader.readAsArrayBuffer(blob);
  }, [blob]);

  if (!sheetData) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {sheetData[0].map((cellData) => (
            <th key={cellData}>{cellData}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sheetData.slice(1).map((rowData, index) => (
          <tr key={index}>
            {rowData.map((cellData, index) => (
              <td key={index}>{cellData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExcelPreview;
