import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import divider from "../assets/section_divider.json"; // Importing the divider
import { MetadataField, MetadataTypeForm } from "../types/appTypes";

interface MetametadataComponentProps {
  metadata: MetadataTypeForm | null;
  setMetadata: (metadata: MetadataTypeForm | null) => void;
}

const MetadataEditor: React.FC<MetametadataComponentProps> = ({
  metadata,
  setMetadata,
}) => {
  const generateTituloValue = () => {
    const alternateTitle1 =
      metadata?.metadata_fields.find(
        (field) =>
          field.iso_xml_path === "MD_Identification-citation-alternateTitle1"
      )?.default_value || "";

    const alternateTitle2 =
      metadata?.metadata_fields.find(
        (field) =>
          field.iso_xml_path === "MD_Identification-citation-alternateTitle2"
      )?.default_value || "";

    const scaleDenominator =
      metadata?.metadata_fields.find(
        (field) =>
          field.iso_xml_path ===
          "MD_DataIdentification-spatialResolution-equivalentScale-denominator1"
      )?.default_value || "";

    return `${alternateTitle1} - ${alternateTitle2} - ${scaleDenominator}`.trim();
  };

  // Update the Título field when the relevant fields change
  const currentTituloField = metadata?.metadata_fields.find(
    (field) => field.iso_xml_path === "MD_Identification-citation-title"
  );

  const sectionTitles: { [key: number]: string } = {
    1: "Metametadados",
    2: "Identificação do Produto",
    3: "Características técnicas",
    4: "Qualidade",
  };

  useEffect(() => {
    if (metadata && currentTituloField) {
      const newTituloValue = generateTituloValue();
      // Only update if the new value is different from the current value
      if (newTituloValue !== currentTituloField.default_value) {
        const updatedFields = metadata.metadata_fields.map((field) =>
          field.iso_xml_path === "MD_Identification-citation-title"
            ? { ...field, default_value: newTituloValue }
            : field
        );
        setMetadata({ ...metadata, metadata_fields: updatedFields });
      }
    }
  }, [
    metadata?.metadata_fields.find(
      (field) =>
        field.iso_xml_path === "MD_Identification-citation-alternateTitle1"
    )?.default_value,
    metadata?.metadata_fields.find(
      (field) =>
        field.iso_xml_path === "MD_Identification-citation-alternateTitle2"
    )?.default_value,
    metadata?.metadata_fields.find(
      (field) =>
        field.iso_xml_path ===
        "MD_DataIdentification-spatialResolution-equivalentScale-denominator1"
    )?.default_value,
  ]);

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
      ?.split(",")
      .map((option: string) => option.trim());
    return possibleValues?.includes(field.default_value.trim())
      ? field.default_value.trim()
      : "";
  };

  // Group fields by section and subsection, following the order from the divider
  const groupedSections: {
    [sectionId: string]: { [subsection: string]: MetadataField[] };
  } = metadata
    ? divider.reduce((acc: any, dividerItem) => {
        const section = dividerItem.section;
        const subsection = dividerItem.subsection || "noSubsection";

        if (!acc[section]) acc[section] = {};
        if (!acc[section][subsection]) {
          acc[section][subsection] = [];
        }

        // Find the matching field in metadata
        const field = metadata.metadata_fields.find(
          (metadataField) => metadataField.iso_xml_path === dividerItem.name
        );

        // If a matching field is found, add it in the correct order
        if (field) {
          acc[section][subsection].push(field);
        }

        return acc;
      }, {})
    : {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      {Object.keys(groupedSections)
        .filter((sectionId) =>
          // Check if the section has any non-empty subsections
          Object.values(groupedSections[sectionId]).some(
            (fields: MetadataField[]) => fields.length > 0
          )
        )
        .map((sectionId) => (
          <Box key={sectionId} sx={{ mb: 4, mt: 6 }}>
            <Divider
              sx={{
                backgroundColor: "rgb(47, 125, 49)", // Adjust this to the desired shade of green
                height: "2px", // Increases the thickness
                mb: 2,
                mt: 4,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "rgb(47, 125, 49)",
                fontWeight: "bold",
                fontFamily: "Nunito",
              }}
            >
              {sectionTitles[Number(sectionId)]} {/* Section Title */}
            </Typography>

            {Object.keys(groupedSections[sectionId]).map((subsection) =>
              subsection !== "noSubsection" ? (
                <Box
                  key={subsection}
                  sx={{
                    mb: 3,
                    mt: 3,
                    p: 2,
                    backgroundColor: "#daf2d8",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "rgb(47, 125, 49)" }}
                  >
                    {subsection}
                  </Typography>
                  <Grid container spacing={2}>
                    {groupedSections[sectionId][subsection].map(
                      (field: MetadataField) => (
                        <Grid item xs={12} sm={4} key={field.id}>
                          {field.field_type === "date" ? (
                            <TextField
                              label={field.label}
                              variant="outlined"
                              fullWidth
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={
                                field.default_value !== ""
                                  ? field.default_value
                                  : new Date().toISOString().split("T")[0] // Set default to today's date
                              }
                              onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                              }
                              disabled={field.is_static}
                              InputProps={{
                                style: {
                                  backgroundColor:
                                    field.default_value !== ""
                                      ? "#f1f1f1"
                                      : "white", // Set to white background initially, #f1f1f1 when non-empty
                                },
                              }}
                            />
                          ) : field.possible_values ? (
                            <FormControl
                              fullWidth
                              variant="outlined"
                              disabled={field.is_static}
                              sx={{
                                backgroundColor:
                                  field.default_value !== ""
                                    ? "#f1f1f1"
                                    : "white",
                              }}
                            >
                              <InputLabel>{field.label}</InputLabel>
                              <Select
                                value={getDropdownValue(field)}
                                onChange={(e) =>
                                  handleFieldChange(field.id, e.target.value)
                                }
                                label={field.label}
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
                              sx={{
                                backgroundColor:
                                  field.default_value !== ""
                                    ? "#f1f1f1"
                                    : "white",
                              }}
                            />
                          )}
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              ) : (
                <Grid container spacing={2} key="noSubsection">
                  {groupedSections[sectionId].noSubsection.map(
                    (field: MetadataField) => (
                      <Grid item xs={12} sm={4} key={field.id}>
                        {field.field_type === "date" ? (
                          <TextField
                            label={field.label}
                            variant="outlined"
                            fullWidth
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={
                              field.default_value !== ""
                                ? field.default_value
                                : new Date().toISOString().split("T")[0] // Set default to today's date
                            }
                            onChange={(e) =>
                              handleFieldChange(field.id, e.target.value)
                            }
                            disabled={field.is_static}
                            InputProps={{
                              style: {
                                backgroundColor:
                                  field.default_value !== ""
                                    ? "#f1f1f1"
                                    : "white", // Set to white background initially, #f1f1f1 when non-empty
                              },
                            }}
                          />
                        ) : field.possible_values ? (
                          <FormControl
                            fullWidth
                            variant="outlined"
                            disabled={field.is_static}
                            sx={{
                              backgroundColor:
                                field.default_value !== ""
                                  ? "#f1f1f1"
                                  : "white",
                            }}
                          >
                            <InputLabel>{field.label}</InputLabel>
                            <Select
                              value={getDropdownValue(field)}
                              onChange={(e) =>
                                handleFieldChange(field.id, e.target.value)
                              }
                              label={field.label}
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
                            sx={{
                              backgroundColor:
                                field.default_value !== ""
                                  ? "#f1f1f1"
                                  : "white",
                            }}
                          />
                        )}
                      </Grid>
                    )
                  )}
                </Grid>
              )
            )}
          </Box>
        ))}
    </Box>
  );
};

export default MetadataEditor;
