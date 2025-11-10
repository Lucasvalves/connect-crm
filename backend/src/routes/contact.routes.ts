import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

export class ContactRoutes {
  private router: Router
  private contactController: ContactController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.contactController = new ContactController()
    this.authMiddleware = new AuthMiddleware()
  }

  getRoutes(): Router {
    this.router.post(
      '/',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.contactController.create.bind(this.contactController)
    )
    this.router.get(
      '/',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.contactController.list.bind(this.contactController)
    )
    this.router.put(
      '/:id',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.contactController.update.bind(this.contactController)
    )
    this.router.delete(
      '/:id',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.contactController.delete.bind(this.contactController)
    )

    return this.router
  }
}
