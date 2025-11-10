import { Router } from 'express'
import { CustomerController } from '../controllers/CustomerController'
import { AuthMiddleware } from '../middleware/AuthMiddleware'

class CustomerRoutes {
  private router: Router
  private customerController: CustomerController
  private authMiddleware: AuthMiddleware

  constructor() {
    this.router = Router()
    this.customerController = new CustomerController()
    this.authMiddleware = new AuthMiddleware()
  }

  getRoutes(): Router {
    this.router.post(
      '/',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.customerController.create.bind(this.customerController)
    )
    this.router.get(
      '/',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.customerController.list.bind(this.customerController)
    )
    this.router.get(
      '/:id',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.customerController.get.bind(this.customerController)
    )
    this.router.put(
      '/:id',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.customerController.update.bind(this.customerController)
    )
    this.router.delete(
      '/:id',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.customerController.delete.bind(this.customerController)
    )

    return this.router
  }
}
export { CustomerRoutes }
