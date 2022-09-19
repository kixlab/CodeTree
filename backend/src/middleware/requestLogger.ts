import { Request, Response, NextFunction } from 'express'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.info(`${req.method}: ${req.path}`)
  next()
}
