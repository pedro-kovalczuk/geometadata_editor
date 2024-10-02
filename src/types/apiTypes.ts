interface Response<T = any> {
  success: boolean;
  message: string;
  data?: T;
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
  file_id: number;
  product_types: ProductType[];
}

export type { Error, ProductType, Response, UploadResponse };
