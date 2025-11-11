import { prisma } from '../database/prisma'
import { ICreate, IUpdate } from '../interfaces/CustomerInterfaces'

export class CustomerRepository {
  async findAll() {
    const result = prisma.customer.findMany({
      include: { emails: true, phones: true, contacts: true }
    })

    return result
  }

  async findById(id: string) {
    const result = await prisma.customer.findUnique({
      where: { id },
      include: { emails: true, phones: true, contacts: true }
    })

    return result
  }

  async create({ fullName, emails, phones }: ICreate) {
    const result = prisma.customer.create({
      data: {
        fullName,
        emails: { create: emails },
        phones: { create: phones }
      },
      include: { emails: true, phones: true, contacts: true }
    })
    return result
  }

  async update({ id, fullName, emails, phones }: IUpdate) {
    await prisma.customer.update({ where: { id }, data: { fullName } })

    if (emails) {
      const existingEmails = await prisma.customerEmail.findMany({
        where: { customerId: id }
      })
      const emailsToDelete = existingEmails.filter(
        (e) => !emails.some((em) => em.id === e.id)
      )
      for (const e of emailsToDelete)
        await prisma.customerEmail.delete({ where: { id: e.id } })

      for (const e of emails) {
        if (e.id) {
          await prisma.customerEmail.update({
            where: { id: e.id },
            data: { email: e.email }
          })
        } else {
          await prisma.customerEmail.create({
            data: { email: e.email, customerId: id }
          })
        }
      }
    }

    if (phones) {
      const existingPhones = await prisma.customerPhone.findMany({
        where: { customerId: id }
      })
      const phonesToDelete = existingPhones.filter(
        (p) => !phones.some((ph) => ph.id === p.id)
      )
      for (const p of phonesToDelete)
        await prisma.customerPhone.delete({ where: { id: p.id } })

      for (const p of phones) {
        if (p.id) {
          await prisma.customerPhone.update({
            where: { id: p.id },
            data: { phone: p.phone }
          })
        } else {
          await prisma.customerPhone.create({
            data: { phone: p.phone, customerId: id }
          })
        }
      }
    }

    return prisma.customer.findUnique({
      where: { id },
      include: { emails: true, phones: true, contacts: true }
    })
  }

  async delete(id: string) {
    const result = await prisma.customer.delete({ where: { id } })

    return result
  }
}
