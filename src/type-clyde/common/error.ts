export interface ErrorResponse {
  data: {
    entityType: string;
    errorMessage: string;
    request: string;
  };
}
