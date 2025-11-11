import { api } from '@/api/api'
import { type ICustomer } from '@/interfaces'

export class CustomerService {
  async list(): Promise<ICustomer[]> {
    const response = await api.get('/customers')
    return response.data
  }

  async create(data: ICustomer): Promise<ICustomer> {
    const response = await api.post('/customers', data)
    return response.data
  }
  async get(id: string): Promise<ICustomer> {
    const response = await api.get(`/customers/${id}`)

    return response.data
  }

  async update(id: string, data: ICustomer): Promise<ICustomer> {
    const response = await api.put(`/customers/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/customers/${id}`)
  }
}