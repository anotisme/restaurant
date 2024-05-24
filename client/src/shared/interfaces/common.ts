export interface GetAllResponse<T> {
  data: T[];
  message: string;
  statusCode: number;
}
