import { ICreate, IUpdate } from '../interfaces/CustomerInterfaces'
import { CustomerRepository } from '../repositories/CustomerRepository'

export class CustomerService {
  private customerRepository: CustomerRepository

  constructor() {
    this.customerRepository = new CustomerRepository()
  }

  async listCustomers() {
    const result = await this.customerRepository.findAll()

    return result
  }

  async getCustomer(id: string) {
    const result = await this.customerRepository.findById(id)

    if (!result) throw new Error('Customer not found')

    return result
  }

  async createCustomer({ fullName, emails, phones }: ICreate) {
    const result = await this.customerRepository.create({
      fullName,
      emails,
      phones
    })

    return result
  }

  async updateCustomer({ id, fullName, emails, phones }: IUpdate) {
    const existingCustomer = await this.customerRepository.findById(id)
    if (!existingCustomer) throw new Error('Customer not found')

    const result = await this.customerRepository.update({
      id,
      fullName,
      emails,
      phones
    })

    return result
  }

  async deleteCustomer(id: string) {
    const existingCustomer = await this.customerRepository.findById(id)
    if (!existingCustomer) throw new Error('Customer not found')

    const result = await this.customerRepository.delete(id)

    return result
  }
}
