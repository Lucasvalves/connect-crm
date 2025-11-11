import { useState } from 'react'

import { enqueueSnackbar } from 'notistack'
import { ICustomer } from '@/interfaces'
import { Link, useNavigate } from 'react-router-dom'
import { CustomerService } from '@/services/CustomerService'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomerForm } from '../components/customer-form'

const customerService = new CustomerService()

export default function NewCustomerPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ICustomer) => {
    setIsLoading(true)
    try {
      await customerService.create(data)
      navigate('/customers')
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      enqueueSnackbar(
        'Erro ao criar cliente. Verifique os dados e tente novamente.',
        {
          variant: 'error'
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/customers')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Novo Cliente</h1>
          <p className="text-muted-foreground">
            Cadastre um novo cliente no sistema
          </p>
        </div>
      </div>

      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
