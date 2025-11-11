import { useState } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, Eye, Mail, Phone } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import { CustomerService } from '@/services/CustomerService'
import { ICustomer } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const customerService = new CustomerService()

const CustomersPage = () => {
  const [customerParaExcluir, setCustomerParaExcluir] =
    useState<ICustomer | null>(null)
  const [excluindo, setExcluindo] = useState(false)

  const {
    data: customers = [],
    error,
    mutate
  } = useSWR<ICustomer[]>('/customers', () => customerService.list())

  const handleExcluir = async () => {
    if (!customerParaExcluir?.id) return

    setExcluindo(true)
    try {
      await customerService.delete(customerParaExcluir.id)
      await mutate()
      setCustomerParaExcluir(null)
      enqueueSnackbar('Cliente excluído com sucesso!', { variant: 'success' })
    } catch (err) {
      console.error('Erro ao excluir cliente:', err)
      enqueueSnackbar('Erro ao excluir cliente. Tente novamente.', {
        variant: 'error'
      })
    } finally {
      setExcluindo(false)
    }
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar clientes.</p>
  }

  if (!customers.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <Link to="/customers/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Nenhum cliente cadastrado ainda.
            </p>
            <Link to="/customers/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Primeiro Cliente
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 mx-53">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Link to="/customers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {customers?.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{customer.fullName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Cadastrado em{' '}
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString('pt-BR')
                      : 'Data não disponível'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/customers/${customer.id}`}>
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/customers/${customer.id}/edit`}>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Excluir"
                    onClick={() => setCustomerParaExcluir(customer)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {customer.emails?.map((emailObj) => (
                    <Badge key={emailObj.id} variant="secondary">
                      {emailObj.email}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {customer.phones?.map((phoneObjt) => (
                    <Badge key={phoneObjt.id} variant="secondary">
                      {phoneObjt.phone}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!customerParaExcluir}
        onOpenChange={() => setCustomerParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o cliente{' '}
              <strong>{customerParaExcluir?.fullName}</strong>? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={excluindo}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleExcluir} disabled={excluindo}>
              {excluindo ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CustomersPage
