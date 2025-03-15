interface ErrorResponse {
  data: {
    entityType: string;
    errorMessage: string;
    request: string;
  };
}

export type { ErrorResponse };
