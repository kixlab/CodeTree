import { Request, Response } from 'express'
import { ErrorResult } from './protocol/Error'

export function Get<Req, Res>(
  handler: (params: Req, send: (status: number, result: Res | ErrorResult) => void) => Promise<void>
) {
  return async (req: Request<Req>, res: Response<Res>) => {
    const reqQuery = req.query as unknown as Req
    await handler(reqQuery, (status, result) => {
      res.status(status).send(result as Res)
    })
  }
}

export function Post<Req, Res>(
  handler: (params: Req, send: (status: number, result: Res | ErrorResult) => void) => Promise<void>
) {
  return async (req: Request, res: Response<Res>) => {
    const reqBody = req.body as Req
    await handler(reqBody, (status, result) => {
      res.status(status).send(result as Res)
    })
  }
}
