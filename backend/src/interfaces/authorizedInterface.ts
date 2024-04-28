import { Request } from "express";


export interface AuthorizedInterface extends Request {
  userId?: string,
  params: any,
  query: any
}