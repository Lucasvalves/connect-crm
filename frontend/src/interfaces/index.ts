export interface IUser {
  id?: string
  name?: string
  email: string
  password?: string
}
export interface ICustomer {
  id?: string
  fullName: string
  emails: { id?: string; email: string }[]
  phones: { id?: string; phone: string }[]
  createdAt?: string
}
export interface ICustomerFormData {
  id?: string
  fullName: string
  emails: { id?: string; email: string }[]
  phones: { id?: string; phone: string }[]
}
export interface IContact {
  id: string
  fullName?: string
  emails: { id?: string; email: string }[]
  phones: { id?: string; phone: string }[]
  customerId: string
}