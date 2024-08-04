import React from 'react';
import { Box, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { MetadataTypeForm, MetadataField } from '../interfaces/app_interfaces';

interface MetametadataComponentProps {
  metadata: MetadataTypeForm | null;
  setMetadata: (metadata: MetadataTypeForm | null) => void;
}

const MetadataEditor: React.FC<MetametadataComponentProps> = ({ metadata, setMetadata }) => {
  
  const handleFieldChange = (id: number, value: string) => {
    if (metadata) {
      const updatedFields = metadata.metadata_fields.map(field => 
        field.id === id ? { ...field, default_value: value } : field
      );
      setMetadata({ ...metadata, metadata_fields: updatedFields });
    }
  };

  const getDropdownValue = (field: MetadataField): string => {
    const possibleValues = field.possible_values.split(',').map((option: string) => option.trim());
    return possibleValues.includes(field.default_value.trim()) ? field.default_value.trim() : '';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {metadata?.metadata_fields.map((field) => (
          <Grid item xs={12} sm={4} key={field.id}>
            {field.possible_values ? (
              <FormControl
                fullWidth
                variant="outlined"
                disabled={field.is_static}
                sx={{
                  backgroundColor: field.default_value ? 'grey.200' : 'inherit',
                }}
              >
                <InputLabel
                  sx={{
                    fontFamily: 'Nunito',
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  {field.label}
                </InputLabel>
                <Select
                  value={getDropdownValue(field)}
                  onChange={(e) => handleFieldChange(field.id, e.target.value as string)}
                  label={field.label}
                  sx={{
                    fontFamily: 'Nunito',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'grey',
                      },
                      '&:hover fieldset': {
                        borderColor: 'grey',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'green',
                      },
                    },
                  }}
                >
                  {field.possible_values.split(',').map((option: string) => (
                    <MenuItem key={option.trim()} value={option.trim()}>
                      {option.trim()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : field.field_type === 'string' || field.field_type === 'int' || field.field_type === 'float' ? (
              <TextField
                label={field.label}
                variant="outlined"
                fullWidth
                value={field.default_value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                disabled={field.is_static}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Nunito',
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  },
                }}
                sx={{
                  backgroundColor: field.default_value ? 'grey.200' : 'inherit',
                  fontFamily: 'Nunito',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey',
                    },
                    '&:hover fieldset': {
                      borderColor: 'grey',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'green',
                    },
                  },
                }}
              />
            ) : field.field_type === 'date' ? (
              <TextField
                label={field.label}
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontFamily: 'Nunito',
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  },
                }}
                value={field.default_value}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                disabled={field.is_static}
                sx={{
                  fontFamily: 'Nunito',
                  backgroundColor: field.default_value ? 'grey.200' : 'inherit',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey',
                    },
                    '&:hover fieldset': {
                      borderColor: 'grey',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'green',
                    },
                  },
                }}
              />
            ) : (
              <Typography variant="body2" color="error">
                Unsupported field type: {field.field_type}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MetadataEditor;
