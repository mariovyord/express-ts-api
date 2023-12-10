export interface IJsonResponse {
  code: number;
  message: string;
  data: any | null;
}

class JsonResponse {
  code: number;
  message: string;
  data: any | null;

  constructor({ code, message, data }: IJsonResponse) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export default JsonResponse;
