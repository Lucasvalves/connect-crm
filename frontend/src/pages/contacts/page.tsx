import { useState } from 'react'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { Plus, Pencil, Trash2, Eye, Mail, Phone, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactService } from '@/services/ContactService'
import { enqueueSnackbar } from 'notistack'
import { CustomerService } from '@/services/CustomerService'
import { IContact, ICustomer } from '@/interfaces'

const contacService = new ContactService()
const customerService = new CustomerService()

const ContactsPage = () => {
  const {
    data: contacts,
    error,
    mutate
  } = useSWR<IContact[]>('/contacts', contacService.list)
  const { data: customers } = useSWR<ICustomer[]>(
    '/customers',
    customerService.list
  )
  const [contactToDelete, setContactToDelete] = useState<IContact | null>(null)
  const [deleting, setDeleting] = useState(false)

  const getCustomerName = (customerId: string) => {
    return (
      customers?.find((c) => c.id === customerId)?.fullName ||
      'Cliente não encontrado'
    )
  }

  const handleDelete = async () => {
    if (!contactToDelete?.id) return

    setDeleting(true)
    try {
      await contacService.delete(contactToDelete.id)
      await mutate()
      setContactToDelete(null)
      enqueueSnackbar('Contato excluído com sucesso!', { variant: 'success' })
    } catch (error) {
      console.error('Erro ao excluir contato:', error)
      enqueueSnackbar('Erro ao excluir contato. Tente novamente.', {
        variant: 'error'
      })
    } finally {
      setDeleting(false)
    }
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar contatos.</p>
  }

  if (!contacts) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando contatos...</p>
      </div>
    )
  }

  if (!contacts.length) {
    return (
      <div className="space-y-6 m-auto container px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contatos</h1>
            <p className="text-muted-foreground">
              Gerencie os contatos vinculados aos clientes
            </p>
          </div>
          <Link to="/contacts/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Contato
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Nenhum contato cadastrado ainda.
            </p>
            <Link to="/contacts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Primeiro Contato
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="space-y-6 m-auto container px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contatos</h1>
          <p className="text-muted-foreground">
            Gerencie os contatos vinculados aos clientes
          </p>
        </div>
        <Link to="/contacts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle>{contact.fullName}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Cliente: {getCustomerName(contact.customerId)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/contacts/${contact.id}`}>
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/contacts/${contact.id}/edit`}>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Excluir"
                    onClick={() => setContactToDelete(contact)}
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
                  {contact.emails.map((emailObjt) => (
                    <Badge key={emailObjt.id} variant="secondary">
                      {emailObjt.email}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {contact.phones.map((phoneObjt) => (
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
        open={!!contactToDelete}
        onOpenChange={() => setContactToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o contato{' '}
              <strong>{contactToDelete?.fullName}</strong>? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default ContactsPage
