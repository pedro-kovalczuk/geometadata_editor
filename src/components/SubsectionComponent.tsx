import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MetadataField, MetadataTypeForm } from "../types/appTypes";

interface SubsectionComponentProps {
  subsection: string | null;
  fields: MetadataField[] | undefined;
  setMetadata: (metadata: MetadataTypeForm | null) => void;
}

const SubsectionComponent: React.FC<SubsectionComponentProps> = ({
  subsection,
  fields,
  setMetadata,
}) => {
  const handleFieldChange = (id: number, value: string) => {
    // Logic to handle metadata change
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontFamily: "Nunito", color: "green", fontWeight: "bold" }}
      >
        {subsection || "No Subsection"}
      </Typography>
      <Grid container spacing={2}>
        {fields?.map((field) => (
          <Grid item xs={12} sm={6} key={field.id}>
            {field.field_type === "string" ? (
              <TextField
                fullWidth
                label={field.label}
                value={field.default_value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
              />
            ) : field.field_type === "date" ? (
              <TextField
                fullWidth
                label={field.label}
                type="date"
                value={field.default_value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
              />
            ) : field.field_type === "dropdown" ? (
              <FormControl fullWidth>
                <Select
                  value={field.default_value}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value as string)
                  }
                >
                  {field.possible_values.split(",").map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography>
                Unsupported field type: {field.field_type}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubsectionComponent;
