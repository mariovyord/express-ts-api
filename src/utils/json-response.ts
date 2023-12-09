interface IJsonResponse {
  code: number;
  message: string;
  data: any | null;
  errors: string[] | null;
}

class JsonResponse {
  code: number;
  message: string;
  data: any | null;
  errors: string[] | string | null;

  constructor({ code, message, data, errors }: IJsonResponse) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}

export default JsonResponse;
