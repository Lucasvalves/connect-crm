import { prisma } from '../database/prisma'

export class  AuthRepository {
  async create(email: string, password: string) {
    const result = await prisma.user.create({
      data: {
        email,
        senha: password
      }
    })
    return result
  }

  async findUserByEmail(email: string) {
    const result = await prisma.user.findUnique({ where: { email } })

    return result
  }
}

