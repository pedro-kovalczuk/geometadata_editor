import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { MetadataTypeForm } from "../types/appTypes";
import SubsectionComponent from "./SubsectionComponent"; // Subsection component

interface SectionComponentProps {
  section: any;
  metadata: MetadataTypeForm | null;
  setMetadata: (metadata: MetadataTypeForm | null) => void;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  section,
  metadata,
  setMetadata,
}) => {
  // Find fields in the section
  const fieldsInSection = metadata?.metadata_fields.filter((field) =>
    field.iso_xml_path.startsWith(`MD_${section.name}`)
  );

  // Get unique subsections
  const subsections = [
    ...new Set(fieldsInSection?.map((field) => field.subsection)),
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Divider sx={{ borderWidth: 1, borderColor: "green", mb: 2, mt: 8 }} />
      <Typography
        variant="h5"
        sx={{ mb: 4, fontFamily: "Nunito", color: "green", fontWeight: "bold" }}
      >
        {section.name}
      </Typography>

      {subsections.map((subsection) => (
        <SubsectionComponent
          key={subsection}
          subsection={subsection}
          fields={fieldsInSection?.filter(
            (field) => field.subsection === subsection
          )}
          setMetadata={setMetadata}
        />
      ))}
    </Box>
  );
};

export default SectionComponent;
