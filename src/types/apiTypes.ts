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

export type { APIResponse, Error, ProductType, UploadResponse };
