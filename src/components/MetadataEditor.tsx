import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import metadataGroups from "../assets/metadata_section_divider.json";
import { MetadataField, MetadataTypeForm } from "../types/appTypes";

interface MetametadataComponentProps {
  metadata: MetadataTypeForm | null;
  setMetadata: (metadata: MetadataTypeForm | null) => void;
}

const MetadataEditor: React.FC<MetametadataComponentProps> = ({
  metadata,
  setMetadata,
}) => {
  const handleFieldChange = (id: number, value: string) => {
    if (metadata) {
      const updatedFields = metadata.metadata_fields.map((field) =>
        field.id === id ? { ...field, default_value: value } : field
      );
      setMetadata({ ...metadata, metadata_fields: updatedFields });
    }
  };

  const getDropdownValue = (field: MetadataField): string => {
    const possibleValues = field.possible_values
      .split(",")
      .map((option: string) => option.trim());
    return possibleValues.includes(field.default_value.trim())
      ? field.default_value.trim()
      : "";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {metadataGroups.map((group) => (
        <Box key={group.id} sx={{ mb: 4 }}>
          <Divider
            sx={{
              borderWidth: 1,
              borderColor: "green",
              mb: 2,
              mt: group.name === "Metametadados" ? 2 : 8,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontFamily: "Nunito",
              color: "green",
              fontWeight: "bold",
            }}
          >
            {group.name}
          </Typography>
          <Grid container spacing={2}>
            {metadata?.metadata_fields
              .filter(
                (field, index) =>
                  group.values.includes(field.iso_xml_path) && index === 0
              ) // Render only the first field
              .map((field) => (
                <Grid item xs={12} sm={4} key={field.id}>
                  {field.possible_values ? (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      disabled={field.is_static}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                      }}
                    >
                      <InputLabel
                        sx={{
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        }}
                      >
                        {field.label}
                      </InputLabel>
                      <Select
                        value={getDropdownValue(field)}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value as string)
                        }
                        label={field.label}
                        sx={{
                          fontFamily: "Nunito",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "grey",
                            },
                            "&:hover fieldset": {
                              borderColor: "grey",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green",
                            },
                          },
                        }}
                      >
                        {field.possible_values
                          .split(",")
                          .map((option: string) => (
                            <MenuItem key={option.trim()} value={option.trim()}>
                              {option.trim()}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  ) : field.field_type === "string" ||
                    field.field_type === "int" ||
                    field.field_type === "float" ? (
                    <TextField
                      label={field.label}
                      variant="outlined"
                      fullWidth
                      value={field.default_value}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value)
                      }
                      disabled={field.is_static}
                      InputLabelProps={{
                        sx: {
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                        fontFamily: "Nunito",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "grey",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                        },
                      }}
                    />
                  ) : field.field_type === "date" ? (
                    <TextField
                      label={field.label}
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                      value={field.default_value}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value)
                      }
                      disabled={field.is_static}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                        fontFamily: "Nunito",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "grey",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
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

            {/* Insert Paper box with Contato after first field */}
            {group.name === "Metametadados" && (
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "#c8edc5",
                    padding: 2,
                    mt: 2,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Nunito",
                      color: "green",
                      mb: 2,
                    }}
                  >
                    Contato
                  </Typography>
                  <Grid container spacing={2}>
                    {metadata?.metadata_fields
                      .slice(1, 6) // Render fields 2 to 6 (index 1 to 5)
                      .map((field) => (
                        <Grid item xs={12} sm={4} key={field.id}>
                          {field.possible_values ? (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              disabled={field.is_static}
                              sx={{
                                backgroundColor: field.default_value
                                  ? "#e5e5e5"
                                  : "white", // Apply light grey background if value is not null
                              }}
                            >
                              <InputLabel
                                sx={{
                                  fontFamily: "Nunito",
                                  "&.Mui-focused": {
                                    color: "green",
                                  },
                                }}
                              >
                                {field.label}
                              </InputLabel>
                              <Select
                                value={getDropdownValue(field)}
                                onChange={(e) =>
                                  handleFieldChange(
                                    field.id,
                                    e.target.value as string
                                  )
                                }
                                label={field.label}
                                sx={{
                                  fontFamily: "Nunito",
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "grey",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "grey",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "green",
                                    },
                                  },
                                }}
                              >
                                {field.possible_values
                                  .split(",")
                                  .map((option: string) => (
                                    <MenuItem
                                      key={option.trim()}
                                      value={option.trim()}
                                    >
                                      {option.trim()}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          ) : (
                            <TextField
                              label={field.label}
                              variant="outlined"
                              fullWidth
                              value={field.default_value}
                              onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                              }
                              disabled={field.is_static}
                              InputLabelProps={{
                                sx: {
                                  fontFamily: "Nunito",
                                  "&.Mui-focused": {
                                    color: "green",
                                  },
                                },
                              }}
                              sx={{
                                backgroundColor: field.default_value
                                  ? "#e5e5e5"
                                  : "white", // Apply light grey background if value is not null
                                fontFamily: "Nunito",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "grey",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "grey",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "green",
                                  },
                                },
                              }}
                            />
                          )}
                        </Grid>
                      ))}
                  </Grid>
                </Paper>
              </Grid>
            )}

            {/* Render remaining fields after the Paper */}
            {metadata?.metadata_fields
              .filter(
                (field, index) =>
                  group.values.includes(field.iso_xml_path) && index > 5
              ) // Render remaining fields after index 5
              .map((field) => (
                <Grid item xs={12} sm={4} key={field.id}>
                  {field.possible_values ? (
                    <FormControl
                      fullWidth
                      variant="outlined"
                      disabled={field.is_static}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                      }}
                    >
                      <InputLabel
                        sx={{
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        }}
                      >
                        {field.label}
                      </InputLabel>
                      <Select
                        value={getDropdownValue(field)}
                        onChange={(e) =>
                          handleFieldChange(field.id, e.target.value as string)
                        }
                        label={field.label}
                        sx={{
                          fontFamily: "Nunito",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "grey",
                            },
                            "&:hover fieldset": {
                              borderColor: "grey",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green",
                            },
                          },
                        }}
                      >
                        {field.possible_values
                          .split(",")
                          .map((option: string) => (
                            <MenuItem key={option.trim()} value={option.trim()}>
                              {option.trim()}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  ) : field.field_type === "string" ||
                    field.field_type === "int" ||
                    field.field_type === "float" ? (
                    <TextField
                      label={field.label}
                      variant="outlined"
                      fullWidth
                      value={field.default_value}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value)
                      }
                      disabled={field.is_static}
                      InputLabelProps={{
                        sx: {
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                        fontFamily: "Nunito",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "grey",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
                          },
                        },
                      }}
                    />
                  ) : field.field_type === "date" ? (
                    <TextField
                      label={field.label}
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontFamily: "Nunito",
                          "&.Mui-focused": {
                            color: "green",
                          },
                        },
                      }}
                      value={field.default_value}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.value)
                      }
                      disabled={field.is_static}
                      sx={{
                        backgroundColor: field.default_value
                          ? "#e5e5e5"
                          : "white", // Apply light grey background if value is not null
                        fontFamily: "Nunito",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "grey",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "green",
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
      ))}
    </Box>
  );
};

export default MetadataEditor;
