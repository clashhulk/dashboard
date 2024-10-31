import "./manage-mis.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-toastify/dist/ReactToastify.css";

import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PreviewIcon from "@mui/icons-material/Preview";
import { Button, Grid, IconButton, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AgGridReact } from "ag-grid-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import { read, utils } from "xlsx";

import {
  getColumnNames,
  getMIS,
} from "../../../adapter/excelOperationsAdapter";

const currentDate = new Date();
const year = currentDate.getFullYear().toString().padStart(4, "0");
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const gridOptions = {
  suppressNoRowsOverlay: true,
  headerHeight: 40,
  suppressScrollOnNewData: true,
  scrollbarWidth: 20,
};
const gridOptions2 = {
  // other grid options...
};
const NewFormat = () => {
  const gridApi = useRef(null);
  const [loading, setLoading] = useState([]);
  const [file1Columns, setFile1Columns] = useState([]);
  const [file2Columns, setFile2Columns] = useState([]);
  const [f1StartRow, setF1StartRow] = useState(null);
  const [f2StartRow, setF2StartRow] = useState(null);
  const [selectedFile1Columns, setSelectedFile1Columns] = useState([]);
  const [selectedFile2Columns, setSelectedFile2Columns] = useState([]);
  const [allColumns, setAllColumns] = useState([]);
  const [f1, setF1] = useState(null);
  const [f2, setF2] = useState(null);
  const [preview, setPreview] = useState([]);
  const [primaryColumns, setPrimaryColumns] = useState({ f1: null, f2: null });
  const [mergeSummary, setMergeSummary] = useState({});
  const onGridReady = (params) => {
    gridApi.current = params.api;
  };
  const [selctedFormat, setSelctedFormat] = useState({ left: "", right: "" });

  const [options, setOptions] = useState([
    { id: 1, value: "YBL Columns to select." },
    { id: 2, value: "BAJAJ NOV select." },
    { id: 3, value: "YES Award sheet." },
  ]);

  const onColumnMoved = (params) => {
    // console.log(allColumns);
    var columnState = params.columnApi.getColumnState();
    setAllColumns(columnState.map((obj) => obj.colId));
  };

  const handleMerge = (action) => {
    const response = getMIS(
      f1,
      f2,
      allColumns,
      primaryColumns,
      f1StartRow,
      f2StartRow
    );

    setLoading({ ...loading, fileMerge: true });
    response.then(async function (result) {
      setLoading({ ...loading, fileMerge: false });
      if (result.status === 200) {
        const data = await result.json();
        setMergeSummary(data.merge_summary);
        const blob = new Blob([new Uint8Array(data.file.data)], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        if (action === "download") {
          a.href = url;
          a.download = data.merge_summary.fileName; // Set the filename of the file
          document.body.appendChild(a);
          a.click();
          a.remove();
          // setMergedFile(URL.createObjectURL(blob));
        } else {
          const fileReader = new FileReader();
          fileReader.onload = function (e) {
            const data = e.target.result;
            const workbook = read(data, { type: "binary" });
            // Assuming there's only one sheet in the workbook
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            // Convert the worksheet to JSON format
            const json = utils.sheet_to_json(worksheet, { header: 1 });
            // Display the JSON data in the console
            setPreview(json);
          };

          // Read the blob as binary data
          fileReader.readAsBinaryString(blob);
        }
      } else {
        toast.error("Cannot merge these files");
      }
    });
  };

  const onF1Drop = useCallback((acceptedFiles, fileRejections) => {
    setF1(acceptedFiles[0]);
    if (acceptedFiles[0]) {
      setLoading({ ...loading, firstFileUpload: true });
      const response = getColumnNames(acceptedFiles[0]);
      response.then(function (result) {
        setLoading({ ...loading, firstFileUpload: false });
        if (result.message === "OK") {
          setFile1Columns(result.results.data);
          setF1StartRow(result.results.startRow);
        } else {
          toast.error(result.message);
        }
      });
    }
    fileRejections.map(({ file, errors }) => {
      return toast.error(
        errors.map((e) => e.message.split(",")[0]) +
          " file " +
          file.path +
          " cannot be uploaded"
      );
    });
  }, []);

  useEffect(() => {
    return setAllColumns([...selectedFile1Columns, ...selectedFile2Columns]);
  }, [selectedFile1Columns, selectedFile2Columns]);

  const onF2Drop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles[0]) {
      setLoading({ ...loading, secondFileUpload: true });
      const response = getColumnNames(acceptedFiles[0]);
      response.then(function (result) {
        setLoading({ ...loading, secondFileUpload: false });
        if (result.message === "OK") {
          setFile2Columns(result.results.data);
          setF2StartRow(result.results.startRow);
        } else {
          toast.error(result.message);
        }
      });
    }
    setF2(acceptedFiles[0]);
    fileRejections.map(({ file, errors }) => {
      return toast.error(
        errors.map((e) => e.message.split(",")[0]) +
          " file " +
          file.path +
          " cannot be uploaded"
      );
    });
  }, []);

  const {
    getRootProps: getRootPropsForRawData,
    getInputProps: getInputPropsForRawData,
  } = useDropzone({
    onDrop: onF1Drop,
    accept: {
      // "application/vnd.ms-excel": [],  // comment this line to accept .xls files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    maxFiles: 1,
  });

  const {
    getRootProps: getRootPropsForAwardSheet,
    getInputProps: getInputPropsForAwardSheet,
  } = useDropzone({
    onDrop: onF2Drop,
    accept: {
      // "application/vnd.ms-excel": [], // comment this line to accept .xls files
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    maxFiles: 1,
  });
  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      // width: "auto",
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: "agTextColumnFilter",
      // enable floating filters by default
      floatingFilter: false,
      // make columns resizable
      resizable: true,
    };
  }, []);

  const clearSelects = (side) => {
    if (side === 0) {
      setF1(null);
      setSelectedFile2Columns([]);
      setSelectedFile1Columns([]);
      setFile1Columns([]);
      setF1StartRow(null);
    } else {
      setF2(null);
      setSelectedFile2Columns([]);
      setSelectedFile2Columns([]);
      setFile2Columns([]);
      setF2StartRow(null);
    }
    setMergeSummary({});
    setAllColumns([]);
    setPrimaryColumns({
      f1: null,
      f2: null,
    });
  };
  const handleDeleteOption = (id) => {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);
  };
  const changeFormat = (e, side) => {
    side === 0
      ? setSelctedFormat({ ...selctedFormat, left: e.target.value })
      : setSelctedFormat({ ...selctedFormat, right: e.target.value });
  };
  useEffect(() => {
    if (selctedFormat.left !== "") {
      setPrimaryColumns({
        ...primaryColumns,
        f1: "agreement number*",
      });
      setSelectedFile1Columns(["Nature of Agreement*", "Loan No."]);
    }
    // if (selctedFormat.right !== "") {
    //   setPrimaryColumns({
    //     ...primaryColumns,
    //     f2: "agreement number*",
    //   });
    //   setSelectedFile2Columns(["Nature of Agreement*", "Loan No."]);
    // }
  }, [selctedFormat]);
  return (
    <div className="navView">
      {/* <ExcelPreview blob={mergedFile} /> */}
      <ToastContainer />
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <div className="file-upload-container">
              <div className="file-options">
                {/* <FormControl sx={{ minWidth: 230 }} size="small">
                  <InputLabel id="demo-select-small">
                    Select a column format
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selctedFormat.left}
                    label="Select a column format"
                    onChange={(e) => {
                      changeFormat(e, 0);
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.value}
                        <IconButton
                          onClick={() => handleDeleteOption(option.id)}
                          size="small"
                          color="error"
                          style={{ marginLeft: "auto" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <IconButton
                  aria-label="delete"
                  disabled={f1 === null}
                  color="primary"
                  size="small"
                  onClick={() => {
                    clearSelects(0);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>

              <section className="container">
                <div {...getRootPropsForRawData({ className: "dropzone" })}>
                  <input {...getInputPropsForRawData()} />

                  {f1 ? <p>{f1.name}</p> : <p>Drag and drop Excel here</p>}
                </div>
              </section>
              {loading.firstFileUpload && (
                <div className="circular-progress-container">
                  <CircularProgress />
                </div>
              )}
              {file1Columns.map((column, index) => (
                <Button
                  key={column}
                  variant={
                    selectedFile1Columns.includes(column)
                      ? "contained"
                      : "outlined"
                  }
                  color={primaryColumns.f1 === column ? "error" : "primary"}
                  size="small"
                  onClick={() => {
                    if (selectedFile1Columns.length === 0) {
                      setPrimaryColumns({ ...primaryColumns, f1: column });
                    }
                    if (selectedFile1Columns.includes(column)) {
                      setSelectedFile1Columns(
                        selectedFile1Columns.filter((col) => col !== column)
                      );
                    } else {
                      setSelectedFile1Columns([
                        ...selectedFile1Columns,
                        column,
                      ]);
                    }
                  }}
                  sx={{ m: 0.6 }}
                >
                  {column}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item sm={6}>
            <div className="file-upload-container">
              {/* <span variant="subtitle2" style={{ textAlign: "center" }}>
                Upload Award Sheet in .Excel
              </span> */}
              <div className="file-options">
                {/* <FormControl sx={{ minWidth: 230 }} size="small">
                  <InputLabel id="demo-select-small">
                    Select a column format
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selctedFormat.right}
                    label="Select a column format"
                    onChange={(e) => {
                      changeFormat(e, 1);
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.value}
                        <IconButton
                          onClick={() => handleDeleteOption(option.id)}
                          size="small"
                          color="error"
                          style={{ marginLeft: "auto" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <IconButton
                  aria-label="delete"
                  disabled={f2 === null}
                  color="primary"
                  size="small"
                  onClick={() => {
                    clearSelects(1);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>

              <section className="container">
                <div {...getRootPropsForAwardSheet({ className: "dropzone" })}>
                  <input {...getInputPropsForAwardSheet()} />
                  {f2 ? <p>{f2.name}</p> : <p>Drag and drop Excel here</p>}
                </div>
              </section>
            </div>
            {loading.secondFileUpload && (
              <div className="circular-progress-container">
                <CircularProgress />
              </div>
            )}
            {file2Columns.map((column) => (
              <Button
                key={column}
                variant={
                  selectedFile2Columns.includes(column)
                    ? "contained"
                    : "outlined"
                }
                color={primaryColumns.f2 === column ? "error" : "primary"}
                size="small"
                onClick={() => {
                  if (selectedFile2Columns.length === 0) {
                    setPrimaryColumns({
                      ...primaryColumns,
                      f2: column,
                    });
                  }
                  if (selectedFile2Columns.includes(column)) {
                    setSelectedFile2Columns(
                      selectedFile2Columns.filter((col) => col !== column)
                    );
                  } else {
                    setSelectedFile2Columns([...selectedFile2Columns, column]);
                  }
                }}
                sx={{ m: 0.8 }}
              >
                {column}
              </Button>
            ))}
          </Grid>
        </Grid>
        <div className="ag-theme-alpine" style={{ height: 60, width: "100%" }}>
          <AgGridReact
            rowData={[]}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            onColumnMoved={onColumnMoved}
            columnDefs={allColumns.map((col, index) => ({
              headerName: col,
              field: col,
            }))}
          ></AgGridReact>
        </div>
        <div className="merge-actions">
          <Button
            variant="contained"
            disabled={
              loading.fileMerge ||
              primaryColumns.f1 === null ||
              primaryColumns.f2 === null ||
              selectedFile1Columns.length === 0 ||
              selectedFile2Columns.length === 0
            }
            onClick={() => handleMerge("download")}
            // loadingPosition="end"
            endIcon={<FileDownloadIcon />}
          >
            {loading.fileMerge && (
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 70,
                  zIndex: 1,
                }}
              />
            )}
            Merge Files
          </Button>
          <Button
            sx={{ ml: 1 }}
            color="secondary"
            disabled={
              loading.fileMerge ||
              primaryColumns.f1 === null ||
              primaryColumns.f2 === null ||
              selectedFile1Columns.length === 0 ||
              selectedFile2Columns.length === 0
            }
            onClick={() => handleMerge("preview")}
            endIcon={<PreviewIcon />}
          >
            Preview
          </Button>
        </div>
        {Object.keys(mergeSummary).length === 5 && (
          <div className="summary-container">
            <div className="summary-row">
              <span className="summary-options">
                <strong>{mergeSummary.file1Rows}</strong> rows in {f1.name}
              </span>
              <span className="summary-options">
                <strong> {mergeSummary.mergedRows}</strong> merged rows
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-options">
                <strong>{mergeSummary.file2Rows}</strong> rows in {f2.name}
              </span>
              <span className="summary-options">
                <strong>{mergeSummary.unmatchedRows}</strong> unmatched rows
              </span>
            </div>
          </div>
        )}
      </Paper>
      {preview[0] && (
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={preview.map((row) =>
              Object.fromEntries(
                preview[0]
                  .map((col, index) => col)
                  .map((key, i) => [key, row[i]])
              )
            )}
            columnDefs={preview[0].map((col, index) => ({
              headerName: col,
              field: col,
            }))}
            gridOptions={gridOptions2}
          />
        </div>
      )}
    </div>
  );
};

export default NewFormat;
