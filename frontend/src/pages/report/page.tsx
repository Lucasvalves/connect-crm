import useSWR from 'swr'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ICustomer } from '@/interfaces'
import { CustomerService } from '@/services/CustomerService'
import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { enqueueSnackbar } from 'notistack'

const customerService = new CustomerService()

const ReportsPage = () => {
  const { data: customers = [], error } = useSWR<ICustomer[]>(
    '/customers',
    () => customerService.list()
  )

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Relatório de Clientes e Contatos', 14, 20)

    let currentY = 30

    customers?.forEach((customer: ICustomer, index: number) => {
      doc.setFontSize(12)
      doc.text(`${index + 1}. ${customer.fullName}`, 14, currentY)
      currentY += 5

      autoTable(doc, {
        startY: currentY,
        head: [['E-mails', 'Telefones', 'Contatos']],
        body: [
          [
            customer.emails?.map((e) => e.email).join(', ') || '-',
            customer.phones?.map((p) => p.phone).join(', ') || '-',
            customer.contacts?.map((c) => c.fullName).join(', ') || '-'
          ]
        ],
        styles: { fontSize: 10 },
        theme: 'striped',
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          if (data.cursor && data.cursor.y) {
            currentY = data.cursor.y + 10
          }
        }
      })
    })

    doc.save('relatorio-clientes.pdf')
    enqueueSnackbar('PDF gerado com sucesso!', { variant: 'success' })
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar clientes.</p>
  }

  return (
    <div className="space-y-6 mx-53">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold">
            Relatório de Clientes e Contatos
          </h1>
          <p className="text-muted-foreground">
            Visualização completa de todos os clientes e seus contatos
            vinculados
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF}>
            <FileDown className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[80vh] rounded-md border p-4">
        <div className="space-y-4">
          {customers?.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nenhum cliente encontrado.
            </p>
          )}

          {customers?.map((customer) => (
            <Card key={customer.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {customer.fullName}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm">E-mails</p>
                  <ul className="list-disc ml-5 text-sm text-muted-foreground">
                    {customer.emails?.map((e) => (
                      <li key={e.id}>{e.email}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <p className="font-medium text-sm">Telefones</p>
                  <ul className="list-disc ml-5 text-sm text-muted-foreground">
                    {customer.phones?.map((p) => (
                      <li key={p.id}>{p.phone}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <p className="font-medium text-sm">Contatos vinculados</p>
                  <ul className="list-disc ml-5 text-sm text-muted-foreground">
                    {customer.contacts ? (
                      customer.contacts.map((c) => (
                        <li key={c.id}>{c.fullName}</li>
                      ))
                    ) : (
                      <li className="italic">Nenhum contato</li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
export default ReportsPage
