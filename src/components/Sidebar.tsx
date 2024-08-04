import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
    { text: "Editar Metadados", icon: <EditIcon /> },
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
              <ListItemText primary={item.text} sx={{fontFamily: 'Nunito'}}/>
            </ListItem>
            {index < menuItems.length - 1 && <Divider />} {/* Add Divider between items except after the last one */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
