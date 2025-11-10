import { NextFunction, Request, Response } from 'express'
import { CustomerService } from '../services/CustomerService'

export class CustomerController {
  private customerService: CustomerService

  constructor() {
    this.customerService = new CustomerService()
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { fullName, emails, phones } = req.body

    try {
      const customer = await this.customerService.createCustomer({
        fullName,
        emails,
        phones
      })
      res.status(201).json(customer)
    } catch (error) {
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const customer = await this.customerService.listCustomers()
      res.status(200).json(customer)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const customer = await this.customerService.getCustomer(id)
      res.status(200).json(customer)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const { fullName, emails, phones } = req.body

    try {
      const customer = await this.customerService.updateCustomer({
        id,
        fullName,
        emails,
        phones
      })

      res.status(200).json(customer)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const result = await this.customerService.deleteCustomer(id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
