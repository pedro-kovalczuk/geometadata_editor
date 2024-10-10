import axios, { AxiosResponse } from "axios";
import {
  APIResponse,
  SubmissionMetadataField,
  UploadResponse,
} from "../types/apiTypes"; // Import the UploadResponse type
import { MetadataTypeForm } from "../types/appTypes";

export const postGeoproduct = async (
  file: File | null
): Promise<UploadResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append("geodata_file", file); // Append the file object
  }

  try {
    const response: AxiosResponse<UploadResponse> = await axios.post(
      "http://localhost:8000/geoproduct/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Axios sets this automatically, but you can specify it as well
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Throw the error to be caught in the calling function
  }
};

export const postXMLData = async (
  xmlFile: File | null,
  geoproductID: number | null,
  formTypeID: number | ""
): Promise<APIResponse> => {
  if (!xmlFile) {
    throw new Error("No file provided for upload.");
  }
  if (!geoproductID) {
    throw new Error("No geoproduct ID provided.");
  }

  const formData = new FormData();
  formData.append("metadata_file", xmlFile);

  // Convert formTypeID to a string to avoid any type issues
  formData.append("product_type", formTypeID.toString());

  try {
    const response: AxiosResponse<APIResponse> = await axios.post(
      `http://localhost:8000/geoproduct/${geoproductID}/send_xml_metadata/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("File uploaded successfully:", response.data);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const postFormData = async (
  geoproductID: number | null,
  metadataForSubmission: SubmissionMetadataField[],
  formTypeID: number | ""
): Promise<APIResponse> => {
  if (!geoproductID) {
    throw new Error("Invalid geoproduct ID");
  }

  const payload = {
    metadata_fields: metadataForSubmission,
    product_type: formTypeID,
  };

  try {
    const response: AxiosResponse<APIResponse> = await axios.post(
      `http://localhost:8000/geoproduct/${geoproductID}/build_metadata/`,
      payload, // Sending the payload directly as a JSON object
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );

    console.log("Form submission success:", response.data);
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error("Error submitting the form", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export const getFormType = async (
  id: number | ""
): Promise<MetadataTypeForm | null> => {
  if (!id) {
    return null; // Handle case where id is empty
  }

  try {
    const response: AxiosResponse<MetadataTypeForm> = await axios.get(
      `http://localhost:8000/product_types/${id}/`
    );
    return response.data; // Return the form data
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null; // Return null in case of error
  }
};

export const getFromCadastroGeral = async (): Promise<APIResponse[]> => {
  const urls: string[] = [
    "http://localhost:8000/cadastro_geral/MD_DataIdentification-extent-verticalExtent-verticalDatum",
    "http://localhost:8000/cadastro_geral/MD_Identification-citation-collectiveTitle",
    "http://localhost:8000/cadastro_geral/MD_Metadata-contact-individualName",
    "http://localhost:8000/cadastro_geral/MD_Metadata-contact-organisationName",
  ];

  try {
    // Making parallel GET requests, using the generic APIResponse with type T for axios response
    const requests: Promise<AxiosResponse<APIResponse>>[] = urls.map((url) =>
      axios.get<APIResponse>(url)
    );

    // Wait for all the requests to resolve
    const responses = await Promise.all(requests);

    // Return only the data from the responses
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
