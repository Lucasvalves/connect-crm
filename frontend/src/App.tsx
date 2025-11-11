import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticationPage from './pages/authentication/page'
import DashboardPage from './pages/dashboard/page'
import { ProtectedRoute } from './components/protected-route'
import CustomersPage from './pages/customers/page'
import NewCustomerPage from './pages/customers/new/page'
import CustomerDetalhePage from './pages/customers/[id]/page'
import EditarCustomerPage from './pages/customers/[id]/edit/page'

function App() {
  return (
    <>
      <SnackbarProvider />
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/new"
          element={
            <ProtectedRoute>
              <NewCustomerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerDetalhePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <EditarCustomerPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
