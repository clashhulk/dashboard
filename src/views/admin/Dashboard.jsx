import './dashboard.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PieChartIcon from '@mui/icons-material/PieChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import AllCasesStatus from './all-cases/AllCasesStatus';
import AreaWiseCases from './area-wise-cases/AreaWiseCases';
import CasesTimeline from './cases-timeline/CasesTimeline';
import Home from './home/Home';
import NewFormat from './manage-mis/NewFormat';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(
    window.screen.availWidth < "730" ? false : true
  );

  const navigate = useNavigate();

  const [openL1, setopenL1] = React.useState(false);
  const [openL2, setopenL2] = React.useState(false);
  return (
    <Box sx={{ display: "-webkit-box" }}>
      <CssBaseline />
      <AppBar className="Mui-Header-Custom" position="fixed" open={open}>
        <Toolbar
          className="header-tab"
          style={{
            margin: open && "10px 24px 0 24px",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon style={{ color: "#000" }} />
          </IconButton>
          <MenuItem
            style={{ color: "rgba(0, 0, 0, 0.54)" }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" style={{ border: "none" }} open={open}>
        <DrawerHeader>
          <div className="topLeft"></div>
        </DrawerHeader>
        <List style={{ marginTop: "1rem" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/dashboard/home" className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="area-wise-cases" className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <TroubleshootIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Case Status"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItemButton
            style={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
            }}
            onClick={() => {
              setopenL1(!openL1);
            }}
            className="left-menue-list-button"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <TroubleshootIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Case Status"}
              sx={{ opacity: open ? 1 : 0 }}
            />
            {open && (openL1 ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openL1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <NavLink to="all-cases" className="nav-links">
                <ListItemButton
                  style={{ paddingLeft: open ? "30px" : "12px" }}
                  className="left-menue-list-button"
                >
                  <PieChartIcon sx={{ fontSize: 25 }} className="icons-l" />
                  <ListItemText
                    primary="All cases"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
              <NavLink to="area-wise-cases" className="nav-links">
                <ListItemButton
                  style={{ paddingLeft: open ? "30px" : "12px" }}
                  className="left-menue-list-button"
                >
                  <StackedBarChartIcon
                    sx={{ fontSize: 25 }}
                    className="icons-l"
                  />
                  <ListItemText
                    primary="Area wise cases"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
              <NavLink to="cases-timeline" className="nav-links">
                <ListItemButton
                  style={{ paddingLeft: open ? "30px" : "12px" }}
                  className="left-menue-list-button"
                >
                  <TimelineIcon sx={{ fontSize: 25 }} className="icons-l" />
                  <ListItemText
                    primary="Cases Timeline"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </NavLink>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List style={{ marginTop: "1rem" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="/dashboard/generate" className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <WysiwygIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Generate SOC"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/all-cases" element={<AllCasesStatus />} />
          <Route path="/area-wise-cases" element={<AreaWiseCases />} />
          <Route path="/cases-timeline" element={<CasesTimeline />} />

          <Route path="/new-mis-format" element={<NewFormat />} />
        </Routes>
      </Box>
    </Box>
  );
}
