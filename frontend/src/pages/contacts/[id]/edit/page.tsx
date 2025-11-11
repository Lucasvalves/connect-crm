import { useState } from 'react'
import useSWR from 'swr'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui/button'
import { ContactForm } from '../../components/contact-form'
import { IContact } from '@/interfaces'
import { ContactService } from '@/services/ContactService'
import { enqueueSnackbar } from 'notistack'

const conctactService = new ContactService()

const EditContactPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const { data: contact, error } = useSWR<IContact>(`/contacts/${id}`, () =>
    conctactService.get(id as string)
  )

  const handleSubmit = async (data: IContact) => {
    setIsLoading(true)
    try {
      await conctactService.update(id as string, data)
      navigate(`/contacts/${id}`)
    } catch (error) {
      console.error('Erro ao atualizar contato:', error)
      enqueueSnackbar(
        'Erro ao atualizar contato. Verifique os dados e tente novamente.',
        {
          variant: 'error'
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/contacts/${id}`)
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
      <div className="flex items-center gap-4">
        <Link to={`/contacts/${id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar Contato</h1>
          <p className="text-muted-foreground">
            Atualize as informações do contato
          </p>
        </div>
      </div>

      <ContactForm
        initialData={contact}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  )
}

export default EditContactPage
