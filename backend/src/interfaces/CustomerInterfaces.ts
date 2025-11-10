export interface ICreate {
  fullName: string
  emails: string[]
  phones: string[]
}

export interface IUpdate{
  id: string
  fullName?: string
  emails?: { id?: string; email: string }[]
  phones?: { id?: string; phone: string }[]
}

