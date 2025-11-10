import { prisma } from '../database/prisma'
import { ICreate, IUpdate } from '../interfaces/ContactInterfaces'

export class ContactRepository {
  async findAll() {
    const result = await prisma.contact.findMany({
      include: { emails: true, phones: true, customer: true }
    })

    return result
  }

  async findById(id: string) {
    const result = await prisma.contact.findUnique({
      where: { id },
      include: { emails: true, phones: true, customer: true }
    })

    return result
  }

  async create({ fullName, customerId, emails, phones }: ICreate) {
    const result = await prisma.contact.create({
      data: {
        fullName,
        customerId,
        emails: { create: emails.map((email: string) => ({ email })) },
        phones: { create: phones.map((phone: string) => ({ phone })) }
      },
      include: { emails: true, phones: true }
    })

    return result
  }
  async update({ id, fullName, emails, phones }: IUpdate) {
    await prisma.contact.update({ where: { id }, data: { fullName } })

    if (emails) {
      const existingEmails = await prisma.contactEmail.findMany({
        where: { contactId: id }
      })
      const emailsToDelete = existingEmails.filter(
        (e) => !emails.some((em) => em.id === e.id)
      )
      for (const e of emailsToDelete)
        await prisma.contactEmail.delete({ where: { id: e.id } })

      for (const e of emails) {
        if (e.id) {
          await prisma.contactEmail.update({
            where: { id: e.id },
            data: { email: e.email }
          })
        } else {
          await prisma.contactEmail.create({
            data: { email: e.email, contactId: id }
          })
        }
      }
    }

    if (phones) {
      const existingPhones = await prisma.contactPhone.findMany({
        where: { contactId: id }
      })
      const phonesToDelete = existingPhones.filter(
        (p) => !phones.some((ph) => ph.id === p.id)
      )
      for (const p of phonesToDelete)
        await prisma.contactPhone.delete({ where: { id: p.id } })

      for (const p of phones) {
        if (p.id) {
          await prisma.contactPhone.update({
            where: { id: p.id },
            data: { phone: p.phone }
          })
        } else {
          await prisma.contactPhone.create({
            data: { phone: p.phone, contactId: id }
          })
        }
      }
    }

    return prisma.contact.findUnique({
      where: { id },
      include: { emails: true, phones: true, customer: true }
    })
  }

  async delete(id: string) {
    const result = await prisma.contact.delete({ where: { id } })

    return result
  }
}
