import "./all-cases-status.css";

import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  CardActions,
  Checkbox,
  LinearProgress,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";

import { arbitrationCaseStatus } from "../../../adapter/adminAnalyticsAdapter";
import {
  getArbitrators,
  getBatches,
  getOrganizations,
} from "../../../adapter/adminListingsAdapter";
import StyledMenu from "../../../components/menus/StyledMenu";
import CustomPieChart from "../../../components/pie-charts/CustomPieChart";
import ExpandMore from "../../../components/svg/ExpandMore";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const AllCasesStatus = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = React.useState({
    fromDate: "",
    toDate: "",
    batch: [],
    organization: "",
  });
  const [batches, setBatches] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [arbitrators, setArbitrators] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilter = Boolean(anchorEl);

  useEffect(() => {
    putBatches();
    putOrganizations();
    putArbitrators();
  }, []);

  useEffect(() => {
    putCaseStatus(filter);
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
  function putArbitrators() {
    const response = getArbitrators();
    response.then((response) => {
      if (response.error === false) {
        setArbitrators(response.results.data);
      } else {
        console.warn("failed to fetch api");
      }
    });
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const [loading, setLoading] = useState(false);
  function putCaseStatus(filter) {
    const response = arbitrationCaseStatus(filter);
    response.then(function (response) {
      if (response.error === false) {
        setData(
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
  }

  const closeMenue = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter({
      ...filter,
      batch: typeof value === "string" ? value.split(",") : value,
    });
  };
  const columns = [
    {
      name: "status",
      label: "Case Status",
      width: 250,
    },
    {
      name: "casesCount",
      label: "Count",
    },
  ];

  return (
    <div className="navView">
      <Card sx={{ maxWidth: "100%" }}>
        <CardHeader
          action={
            <>
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
                      setFilter({ ...filter, fromDate: event.target.value });
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
                      setFilter({ ...filter, toDate: event.target.value });
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
                            setFilter({
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
                    {/* <MenuItem disableRipple>
                      <GavelIcon />
                      <FormControl
                        sx={{ m: 1, minWidth: 120, width: 250 }}
                        size="small"
                      >
                        <InputLabel id="select-arbitrator">
                          Select arbitrator
                        </InputLabel>
                        <Select
                          labelId="select-arbitrator"
                          id="select-arbitrator"
                          value={filter.arbitrator}
                          label="Select arbitrator"
                          onChange={(event) => {
                            setFilter({
                              ...filter,
                              arbitrator: event.target.value,
                            });
                          }}
                        >
                          {arbitrators.map((arbitrator) => {
                            return (
                              <MenuItem
                                key={arbitrator.id}
                                value={arbitrator.id}
                              >
                                {arbitrator.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </MenuItem> */}
                  </StyledMenu>
                </div>
              </div>
            </>
          }
          title="Status of all cases"
          subheader="Represented as a pi chart, in percentages"
        />
        <CustomPieChart width={600} height={350} data={data} actions={false} />
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
      </Card>
      <Card sx={{ maxWidth: 600 }} className="chart-table-container">
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

export default AllCasesStatus;
