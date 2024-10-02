interface MetadataField {
  id: number;
  label: string;
  iso_xml_path: string;
  field_type: string;
  is_static: boolean;
  possible_values: string;
  default_value: string;
  comments: string;
  old_path: string;
}

interface MetadataTypeForm {
  id: number;
  name: string;
  xml_template: any;
  metadata_fields: MetadataField[];
}

interface SerializerData {
  metadata_id: string;
  metadata_file: string | null;
  geodata_file: string;
  pdf_file: string | null;
}

interface UploadJSON {
  serializer_data: SerializerData;
  metadata: Record<string, any>;
}

export type { MetadataField, MetadataTypeForm, UploadJSON };
