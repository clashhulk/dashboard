import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";

import { caseTimeline } from "../../../adapter/adminAnalyticsAdapter";
import {
  getBatches,
  getOrganizations,
} from "../../../adapter/adminListingsAdapter";
import CustomizedLineChart from "../../../components/line-charts/CustomizedLineChart";
import StyledMenu from "../../../components/menus/StyledMenu";
import ExpandMore from "../../../components/svg/ExpandMore";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const CasesTimeline = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = React.useState({
    fromDate: "",
    toDate: "",
    batch: [],
    organization: "",
    status: [0, 1, 2, 3, 4, 5],
  });
  const [batches, setBatches] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  // const [arbitrators, setArbitrators] = useState([]);

  useEffect(() => {
    putBatches();
    putOrganizations();
    // putArbitrators();
  }, []);

  useEffect(() => {
    putCaseTimeline(filter);
    console.log(filter);
  }, [filter]);
  function putBatches() {
    const response = getBatches();
    response.then((response) => {
      if (response.error === false) {
        setBatches(response.results.data);
      } else {
        console.warn("failed to fetch api");
      }
    });
  }
  function putOrganizations() {
    const response = getOrganizations();
    response.then((response) => {
      if (response.error === false) {
        setOrganizations(response.results.data);
      } else {
        console.warn("failed to fetch api");
      }
    });
  }
  // function putArbitrators() {
  //   const response = getArbitrators();
  //   response.then((response) => {
  //     if (response.error === false) {
  //       setArbitrators(response.results.data);
  //     } else {
  //       console.warn("failed to fetch api");
  //     }
  //   });
  // }

  function putCaseTimeline(filter) {
    const response = caseTimeline(filter);
    response.then((response) => {
      if (response.error === false) {
        setData(response.results.data);
      } else {
        console.warn("failed to fetch api");
      }
    });
  }
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilter = Boolean(anchorEl);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const columns = [
    {
      name: "created_at",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div>
              {new Date(value).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                // minute: "numeric",
                // second: "numeric",
                // timeZoneName: "short",
              })}
            </div>
          );
        },
      },
    },
    {
      name: "casesCount",
      label: "Cases Count",
    },
  ];
  const handelSetFilter = (updatedFilter) => {
    setFilter(updatedFilter);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    handelSetFilter({
      ...filter,
      batch: typeof value === "string" ? value.split(",") : value,
    });
  };

  const closeMenue = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navView">
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          action={
            <div className="cart-filter-container">
              <div className="filter-inputs">
                <TextField
                  id="datetime-local"
                  label="From Date"
                  type="datetime-local"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filter.fromDate}
                  onChange={(event) => {
                    handelSetFilter({
                      ...filter,
                      fromDate: event.target.value,
                    });
                    // putCaseTimeline([event.target.value, filter.toDate]);
                  }}
                />
              </div>
              <div className="filter-inputs">
                <TextField
                  id="datetime-local"
                  label="To date"
                  type="datetime-local"
                  // defaultValue="2017-05-24T10:30"
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={filter.toDate}
                  onChange={(event) => {
                    handelSetFilter({ ...filter, toDate: event.target.value });
                  }}
                />
              </div>
              <div className="filter-inputs">
                <Button
                  className="filter-dropdown"
                  id="demo-customized-button"
                  // variant="contained"
                  disableElevation
                  sx={{ width: 100 }}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                  }}
                  endIcon={<FilterListIcon />}
                >
                  FILTERS
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={openFilter}
                  onClose={() => {
                    setAnchorEl(null);
                  }}
                >
                  <MenuItem disableRipple>
                    <BatchPredictionIcon fontSize="large" />
                    <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
                      <InputLabel id="case-batch">Case batch</InputLabel>
                      <Select
                        multiple
                        onChange={handleChange}
                        labelId="case-batch"
                        id="case-batch"
                        value={filter.batch}
                        label="Case batch"
                        input={<OutlinedInput label="case-batch" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {batches.map((batch) => (
                          <MenuItem key={batch.id} value={batch.batch_name}>
                            <Checkbox
                              checked={
                                filter.batch.indexOf(batch.batch_name) > -1
                              }
                            />
                            <ListItemText primary={batch.batch_name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem disableRipple>
                    <BusinessIcon />
                    <FormControl
                      sx={{ m: 1, minWidth: 120, width: 250 }}
                      size="small"
                    >
                      <InputLabel id="select-user-organization">
                        Select user organization
                      </InputLabel>
                      <Select
                        labelId="select-user-organization"
                        id="select-user-organization"
                        value={filter.organization}
                        label="Select user organization"
                        onChange={(event) => {
                          handelSetFilter({
                            ...filter,
                            organization: event.target.value,
                          });
                        }}
                      >
                        {organizations.map((organization) => {
                          return (
                            <MenuItem
                              key={organization.id}
                              value={organization.user1}
                            >
                              {organization["user.organization"]}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MenuItem>
                </StyledMenu>
              </div>
            </div>
          }
          title="Time-specific cases"
          subheader="Represented as a Line-chart"
        />
        <CustomizedLineChart
          width={1000}
          height={500}
          data={data}
          filter={filter}
          setFilter={handelSetFilter}
          actions={true}
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Note:</Typography>
            <Typography paragraph>
              This information was updated 5 minutes ago.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>{" "}
      <Card
        sx={{ maxWidth: 500, height: "100%" }}
        className="chart-table-container"
      >
        {false ? (
          <LinearProgress />
        ) : (
          <MUIDataTable
            data={data}
            columns={columns}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              rowsPerPage: 10,
              rowsPerPageOptions: [10, 20, 50],
              jumpToPage: true,
              search: true,
              selectableRows: "none",
              selectableRowsOnClick: false,
            }}
          />
        )}
      </Card>
      <div className="chart-container">{/* <CustomizedLineChart/> */}</div>
    </div>
  );
};

export default CasesTimeline;
