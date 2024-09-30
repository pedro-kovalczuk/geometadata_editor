interface Response {
  success: boolean;
  message: string;
  data?: any; // Replace with actual type if known
}

interface Error {
  message: string;
  code?: string;
}

export type { Error, Response };
