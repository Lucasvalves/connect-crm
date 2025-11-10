import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

export class AuthRoutes {
  private router: Router
  private authController: AuthController

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
  }

  getRoutes(): Router {
    this.router.post(
      '/register',
      this.authController.register.bind(this.authController)
    )
    this.router.post(
      '/login',
      this.authController.login.bind(this.authController)
    )
    return this.router
  }
}
