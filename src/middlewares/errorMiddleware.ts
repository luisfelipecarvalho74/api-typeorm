import { NextFunction, Request, Response } from "express"
import { ApiError } from "../helpers/apiError"

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.message ?? "Erro interno do servidor"
  const errors = error.errors ? error.errors : undefined

  return res.status(statusCode).json({ message, errors })
}