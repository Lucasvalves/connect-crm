import { useState } from 'react'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus } from 'lucide-react'
import { ICustomer, ICustomerFormData } from '@/interfaces'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const customerSchema = z.object({
  fullName: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome é muito longo'),
  emails: z
    .array(
      z
        .string()
        .email('E-mail inválido')
        .nonempty('O campo de e-mail não pode estar vazio')
    )
    .min(1, 'Informe pelo menos um e-mail'),
  phones: z
    .array(
      z
        .string()
        .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
        .nonempty('O campo de telefone não pode estar vazio')
    )
    .min(1, 'Informe pelo menos um telefone')
})

interface CustomerFormProps {
  initialData?: ICustomerFormData
  onSubmit: (data: ICustomer) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function CustomerForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading
}: CustomerFormProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '')
  const [emails, setEmails] = useState<string[]>(
    initialData?.emails
      ? initialData.emails.map((e) => (typeof e === 'string' ? e : e.email))
      : ['']
  )
  const [phones, setPhones] = useState<string[]>(
    initialData?.phones
      ? initialData.phones.map((p) => (typeof p === 'string' ? p : p.phone))
      : ['']
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const filteredEmails = emails.filter((email) => email.trim() !== '')
    const filteredPhones = phones.filter((phone) => phone.trim() !== '')

    const validation = customerSchema.safeParse({
      fullName,
      emails: filteredEmails,
      phones: filteredPhones.map((p) => p.replace(/\D/g, '')) 
    })

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    await onSubmit({
      fullName,
      emails: filteredEmails.map((email) => ({ email })),
      phones: filteredPhones.map((phone) => ({ phone }))
    })
  }

  const addEmail = () => setEmails([...emails, ''])
  const removeEmail = (index: number) =>
    setEmails(emails.filter((_, i) => i !== index))
  const updateEmail = (index: number, valor: string) => {
    const newEmails = [...emails]
    newEmails[index] = valor
    setEmails(newEmails)
  }

  const addPhone = () => setPhones([...phones, ''])
  const removePhone = (index: number) =>
    setPhones(phones.filter((_, i) => i !== index))
  const updatePhone = (index: number, valor: string) => {
    const newPhones = [...phones]
    newPhones[index] = valor
    setPhones(newPhones)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData?.id ? 'Editar Cliente' : 'Novo Cliente'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nomeCompleto">Nome Completo *</Label>
            <Input
              id="nomeCompleto"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Digite o nome completo"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>E-mails *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEmail}
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder="email@exemplo.com"
                  type="email"
                />
                {emails.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEmail(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.emails && (
              <p className="text-sm text-red-500">{errors.emails}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Telefones *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPhone}
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {phones.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={phone}
                  onChange={(e) => updatePhone(index, e.target.value)}
                  placeholder="(00) 00000-0000"
                />
                {phones.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePhone(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.phones && (
              <p className="text-sm text-red-500">{errors.phones}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
