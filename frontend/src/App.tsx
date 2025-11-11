import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticationPage from './pages/authentication/page'
import DashboardPage from './pages/dashboard/page'
import { ProtectedRoute } from './components/protected-route'
import CustomersPage from './pages/customers/page'
import NewCustomerPage from './pages/customers/new/page'
import CustomerDetailPage from './pages/customers/[id]/page'
import EditCustomerPage from './pages/customers/[id]/edit/page'
import ContactsPage from './pages/contacts/page'
import NewContactPage from './pages/contacts/new/page'
import EditContactPage from './pages/contacts/[id]/edit/page'
import ContactDetailPage from './pages/contacts/[id]/page'

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
              <CustomerDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:id/edit"
          element={
            <ProtectedRoute>
              <EditCustomerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/new"
          element={
            <ProtectedRoute>
              <NewContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/:id"
          element={
            <ProtectedRoute>
              <ContactDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/:id/edit"
          element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
