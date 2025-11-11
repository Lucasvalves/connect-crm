import { NextFunction, Request, Response } from 'express'
import { ContactService } from '../services/ContactService'

export class ContactController {
  private contactService: ContactService

  constructor() {
    this.contactService = new ContactService()
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { fullName, customerId, emails, phones } = req.body

    try {
      const contact = await this.contactService.createContact({
        fullName,
        customerId,
        emails,
        phones
      })
      res.status(201).json(contact)
    } catch (error) {
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await this.contactService.listContacts()
      res.status(200).json(contacts)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const contact = await this.contactService.getContact(id)
      res.status(200).json(contact)
    } catch (error) {
      next(error) 
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { fullName, customerId, emails, phones } = req.body
    const { id } = req.params

    try {
      const contact = await this.contactService.updateContact({
        id,
        fullName,
        emails,
        phones
      })
      res.status(200).json(contact)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    try {
      const result = await this.contactService.deleteContact(id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
