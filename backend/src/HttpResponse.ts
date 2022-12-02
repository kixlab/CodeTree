import { Request, Response } from 'express'

export function Get<Req, Res>(
  handler: (params: Req) => Promise<Res>
) {
  return async (req: Request<Req>, res: Response) => {
    try {
      const reqQuery = req.query as unknown as Req
      const result = await handler(reqQuery)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ message: (error as any).toString(), error })
    }
  }
}

export function Post<Req, Res>(
  handler: (params: Req) => Promise<Res>
) {
  return async (req: Request, res: Response) => {
    try {
      const reqBody = req.body as Req
      const result = await handler(reqBody)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ message: (error as any).toString(), error })
    }
  }
}
