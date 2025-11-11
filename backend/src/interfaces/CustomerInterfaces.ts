export interface ICreate {
  fullName: string
  emails: { email: string }[]
  phones: { phone: string }[]
}

export interface IUpdate {
  id: string
  fullName?: string
  emails?: { id?: string; email: string }[]
  phones?: { id?: string; phone: string }[]
}
