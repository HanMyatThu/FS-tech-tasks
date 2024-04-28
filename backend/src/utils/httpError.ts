import { ApiErrorInterface } from "../interfaces";

const HttpError = (res: any, status: number, error: ApiErrorInterface) => {
  return res.status(status).send({
    errors: [
      {
        title: error.title,
        detail: error.detail,
        code: error.code,
      },
    ],
  });
}

export default HttpError