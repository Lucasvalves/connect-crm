import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { Users, UserPlus, FileText, Home, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { href: '/dashboard', label: 'Início', icon: Home },
  { href: '/customers', label: 'Clientes', icon: Users },
  { href: '/contacts', label: 'Contatos', icon: UserPlus },
  { href: '/report', label: 'Relatório', icon: FileText }
]

export function Navigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/authentication')
  }

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="border-b border-border bg-card mb-10 ">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap items-center justify-between h-auto min-h-16 gap-4 py-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              Client Contact Manager
            </h2>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full shrink-0"
                >
                  <Avatar>
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium truncate max-w-[150px]">
                      {user.email.split('@')[0]}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}
