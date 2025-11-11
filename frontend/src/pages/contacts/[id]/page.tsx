import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Pencil, Mail, Phone, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '@/services/ContactService'
import { CustomerService } from '@/services/CustomerService'
import { IContact, ICustomer } from '@/interfaces'

const conctactService = new ContactService()
const customerService = new CustomerService()

const ContactDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: contact, error } = useSWR<IContact>(`/contacts/${id}`, () =>
    conctactService.get(id as string)
  )

  const { data: customers = [] } = useSWR<ICustomer[]>('/customers', () =>
    customerService.list()
  )

  const getClienteNome = (customerId: string) => {
    return (
      customers?.find((c) => c.id === customerId)?.fullName || 'Carregando...'
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Erro ao carregar contato.</p>
        <Link to="/contacts">
          <Button className="mt-4">Voltar para Contatos</Button>
        </Link>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando contato...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/contacts">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Detalhes do Contato</h1>
            <p className="text-muted-foreground">
              Informações completas do contato
            </p>
          </div>
        </div>
        <Link to={`/contacts/${id}/edit`}>
          <Button>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{contact.fullName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Cliente Vinculado</span>
            </div>
            <Link to={`/customers/${contact.customerId}`}>
              <Badge
                variant="outline"
                className="text-base cursor-pointer hover:bg-accent"
              >
                {getClienteNome(contact.customerId)}
              </Badge>
            </Link>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>E-mails</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.emails.map((emailObjt) => (
                <Badge
                  key={emailObjt.id}
                  variant="secondary"
                  className="text-sm"
                >
                  {emailObjt.email}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Telefones</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {contact.phones.map((phoneObjt) => (
                <Badge
                  key={phoneObjt.id}
                  variant="secondary"
                  className="text-sm"
                >
                  {phoneObjt.phone}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default ContactDetailPage
