import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

export class AuthController {
  private usersServices: AuthService

  constructor() {
    this.usersServices = new AuthService()
  }

  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const result = await this.usersServices.register(email, password)
      res.json(result)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const result = await this.usersServices.login(email, password)
      res.json(result)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}
