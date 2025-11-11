import useSWR from 'swr'
import { ArrowLeft, Pencil, Mail, Phone, Calendar } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CustomerService } from '@/services/CustomerService'
import { ICustomer } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const customerService = new CustomerService()

const CustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: customer, error } = useSWR<ICustomer>(
    id ? `/customers/${id}` : null,
    () => customerService.get(id as string)
  )

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Erro ao carregar cliente.</p>
        <Link to="/customers">
          <Button className="mt-4">Voltar para Clientes</Button>
        </Link>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando cliente...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>
            <p className="text-muted-foreground">
              Informações completas do cliente
            </p>
          </div>
        </div>
        <Link to={`/customers/${id}/edit`}>
          <Button>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{customer.fullName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Data de Registro</span>
            </div>
            <p className="text-lg">
              {customer.createdAt
                ? new Date(customer.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })
                : 'Data não disponível'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>E-mails</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {customer.emails.map((emailObjt) => (
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
              {customer.phones.map((phoneObjt) => (
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
export default CustomerDetailPage
