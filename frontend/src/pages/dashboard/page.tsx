import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Users, UserPlus, FileText } from 'lucide-react'

const DashboardPage = () => {
  const cards = [
    {
      title: 'Clientes',
      description:
        'Cadastre e gerencie seus clientes com informações completas',
      icon: <Users className="h-6 w-6 text-primary" />,
      to: '/customers',
      button: 'Gerenciar Clientes'
    },
    {
      title: 'Contatos',
      description: 'Adicione contatos vinculados aos seus clientes',
      icon: <UserPlus className="h-6 w-6 text-primary" />,
      to: '/contacts',
      button: 'Gerenciar Contatos'
    },
    {
      title: 'Relatório',
      description: 'Visualize clientes e seus contatos vinculados',
      icon: <FileText className="h-6 w-6 text-primary" />,
      to: '/report',
      button: 'Ver Relatório'
    }
  ]

  return (
    <>
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Client Contact Manager</h1>
          <p className="text-lg text-muted-foreground">
            Gerencie seus clientes e contatos de forma simples e eficiente
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          {cards.map(({ title, description, icon, to, button }) => (
            <Card
              key={title}
              className="hover:shadow-lg transition-shadow border border-border"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
                  <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={to}>
                  <Button className="w-full">{button}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </>
  )
}
export default DashboardPage
