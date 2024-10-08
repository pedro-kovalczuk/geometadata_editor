interface APIResponse<T = any> {
  data?: T;
  status: number;
  statusText: string;
}

interface Error {
  message: string;
  code?: string;
}

interface ProductType {
  id: number;
  name: string;
}

interface UploadResponse {
  file_fields: Record<string, any>; // Use Record to define dynamic object structure
  file_id: number | null | undefined;
  product_types: ProductType[];
}

interface CadastroGeralDatum {
  [key: string]: {
    "MD_DataIdentification-extent-verticalExtent-verticalDatum": string;
  };
}

interface CadastroGeralProjects {
  [key: string]: {
    "MD_Identification-citation-collectiveTitle": string;
  };
}

interface IndividualContactInfo {
  "MD_Metadata-contact-individualName": string;
  "MD_Metadata-contact-positionName": string;
  "MD_Metadata-contact-organisationName": string;
  "MD_Metadata-contact-contactInfo-onlineResource-linkage": string;
  "MD_Metadata-contact-role": string;
}

type CadastroGeralIndividual = IndividualContactInfo[];

interface OrganisationContactInfo {
  "MD_Metadata-contact-organisationName": string;
  "MD_Metadata-contact-contactInfo-onlineResource-linkage": string;
  "MD_Metadata-contact-role": string;
}

interface CadastroGeralOrganisation {
  [key: string]: OrganisationContactInfo;
}

export type {
  APIResponse,
  CadastroGeralDatum,
  CadastroGeralIndividual,
  CadastroGeralOrganisation,
  CadastroGeralProjects,
  Error,
  ProductType,
  UploadResponse,
};
