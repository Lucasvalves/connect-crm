import { useState } from 'react'
import useSWR from 'swr'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CustomerService } from '@/services/CustomerService'
import { ICustomer } from '@/interfaces'
import { Button } from '@/components/ui/button'
import { CustomerForm } from '../../components/customer-form'
import { enqueueSnackbar } from 'notistack'

const customerService = new CustomerService()

const EditarCustomerPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { data: customer, error } = useSWR<ICustomer>(
    id ? `/customers/${id}` : null,
    () => customerService.get(id as string)
  )
  const handleSubmit = async (data: ICustomer) => {
    setIsLoading(true)
    try {
      await customerService.update(id as string, data)
      navigate(`/customers/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      enqueueSnackbar(
        'Erro ao atualizar cliente. Verifique os dados e tente novamente..',
        {
          variant: 'error'
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/customers/${id}`)
  }

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
      <div className="flex items-center gap-4">
        <Link to={`/customers/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar Cliente</h1>
          <p className="text-muted-foreground">
            Atualize as informações do cliente
          </p>
        </div>
      </div>

      <CustomerForm
        initialData={customer}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
export default EditarCustomerPage
