import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BadgeIcon from "@mui/icons-material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styles from "../styles/Sidebar.module.css";

interface SidebarProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  disabledItems: boolean[];
  setDisabledItems: (items: boolean[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, setSelectedItem, disabledItems, setDisabledItems }) => {
  const handleItemClick = (item: string, index: number) => {
    if (!disabledItems[index]) {
      setSelectedItem(item);
      // Example logic to enable the next item after selecting the current one
      if (index < disabledItems.length - 1) {
        const newDisabledState = [...disabledItems];
        setDisabledItems(newDisabledState);
      }
    }
  };

  const menuItems = [
    { text: "Upload do produto", icon: <UploadFileIcon /> },
    { text: "Metametadados", icon: <InfoIcon /> },
    { text: "Identificação", icon: <BadgeIcon /> },
    { text: "Características técnicas", icon: <SettingsIcon /> },
    { text: "Qualidade", icon: <RateReviewIcon /> },
    { text: "Revisar", icon: <CheckIcon /> },
  ];

  return (
    <Box className={styles.sidebar}>
      <List component="nav" aria-label="main mailbox folders">
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              className={`${styles.listItem} ${selectedItem === item.text ? styles.selected : ""}`}
              onClick={() => handleItemClick(item.text, index)}
              disabled={disabledItems[index]}
            >
              <ListItemIcon className={styles.icon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            {index < menuItems.length - 1 && <Divider />} {/* Add Divider between items except after the last one */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
