import { ICreate, IUpdate } from '../interfaces/ContactInterfaces'
import { ContactRepository } from '../repositories/ContactRepository'

export class ContactService {
  private contactRepository: ContactRepository

  constructor() {
    this.contactRepository = new ContactRepository()
  }
  async listContacts() {
    const result = this.contactRepository.findAll()

    return result
  }

  async createContact({ fullName, customerId, emails, phones }: ICreate) {
    const result = this.contactRepository.create({
      fullName,
      customerId,
      emails,
      phones
    })

    return result
  }

  async updateContact({ id, fullName, emails, phones }: IUpdate) {
    const existingContact = await this.contactRepository.findById(id)
    if (!existingContact) throw new Error('Contact not found')

    const result = this.contactRepository.update({
      id,
      fullName,
      emails,
      phones
    })

    return result
  }

  async deleteContact(id: string) {
    const existingContact = await this.contactRepository.findById(id)
    if (!existingContact) throw new Error('Contact not found')

    const result = await this.contactRepository.delete(id)

    return result
  }
}
