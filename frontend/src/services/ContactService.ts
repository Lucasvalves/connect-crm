import { api } from '@/api/api'
import { type IContact } from '@/interfaces'

export class ContactService {
  async list(): Promise<IContact[]> {
    const response = await api.get('/contacts')
    return response.data
  }

  async create(data: IContact): Promise<IContact> {
    const response = await api.post('/contacts', data)
    return response.data
  }

  async update(id: string, data: IContact): Promise<IContact> {
    const response = await api.put(`/contacts/${id}`, data)
    return response.data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`)
  }
}
