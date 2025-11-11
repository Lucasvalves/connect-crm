import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { ContactForm } from '../components/contact-form'
import { ContactService } from '../../../services/ContactService'
import type { IContact } from '../../../interfaces'

const contacService = new ContactService()

const NewContactPage = ()=> {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: IContact) => {
    setIsLoading(true)
    try {
      await contacService.create(data)
      navigate('/contacts')
    } catch (error) {
      console.error('Erro ao criar contato:', error)
      enqueueSnackbar(
        'Erro ao criar contato. Verifique os dados e tente novamente.',
        {
          variant: 'error'
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/contacts')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/contacts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Novo Contato</h1>
          <p className="text-muted-foreground">
            Cadastre um novo contato vinculado a um cliente
          </p>
        </div>
      </div>

      <ContactForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}
export default NewContactPage