import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 240, mt: 8 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Upload do produto" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Metametadados" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Identificação" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Características técnicas" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText primary="Qualidade" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary="Revisar" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
