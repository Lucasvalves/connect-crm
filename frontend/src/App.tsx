import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticationPage from './pages/authentication/page'
import DashboardPage from './pages/dashboard/page'
import { ProtectedRoute } from './components/protected-route'
import CustomersPage from './pages/customers/page'
import NewCustomerPage from './pages/customers/new/page'

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
      </Routes>
    </>
  )
}

export default App
