# ConnectCRM

A complete customer and contact management system built with Node.js, React, and TypeScript, applying layered architecture and development best practices.
The project aims to demonstrate the ability to implement a full CRUD with authentication, entity associations, and report generation.

## Technologies Used

### Backend

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite (local database)**
- **JWT (authentication)**
- **bcrypt (encryption)**
- **CORS (access control)**

### Frontend

- **React** + **Vite**
- **TypeScript**
- **React Router DOM**
- **TailwindCSS + shadcn/ui**
- **React Hook Form + Zod (validation)**
- **Axios + SWR**
- **jsPDF (PDF reports)**
- **Notistack (notifications)**

## Project Structure

```
connect-crm/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middleware/
│       ├── interfaces/
│       └── server.ts
│
└── frontend/
    └── src/
        ├── api/
        ├── components/
        │   └── ui/
        ├── contexts/
        ├── pages/
        ├── services/
        └── interfaces/
```

## Data Model

The system uses the following main models:

- **User**: System users (authentication)
- **Customer**: Registered customers
- **CustomerEmail**: Customer emails (1:N relationship)
- **CustomerPhone**: Customer phones (1:N relationship)
- **Contact**: Contacts linked to customers
- **ContactEmail**: Contact emails (1:N relationship)
- **ContactPhone**: Contact phones (1:N relationship)

## Prerequisites

- **Node.js version 18+**
- **npm** or **yarn**
- **Git**

## Installation and Setup

### 1. Clone the repository:

```bash
git clone git@github.com:Lucasvalves/connect-crm.git
cd connect-crm
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-jwt-secret-here"
PORT=3333
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

The server will be available at `http://localhost:3333`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create the `.env` file:

```env
VITE_API_URL=http://localhost:3333
```

Run the frontend:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Features

### Authentication

- User registration and login
- JWT token generation and validation
- Protected authenticated routes

### Customers

- Full customer CRUD
- Multiple emails and phones per customer
- Association with contacts

### Contacts

- Full contact CRUD
- Direct link to the associated customer
- Multiple emails and phones per contact

### Reports

- Consolidated listing of customers and their contacts
- PDF report generation

## API Endpoints

### Authentication

```
POST   /auth/register    -> Register new user
POST   /auth/login       -> Log in
```

### Customers

```
GET    /customers        -> List all customers
GET    /customers/:id    -> Get specific customer
POST   /customers        -> Create new customer
PUT    /customers/:id    -> Update customer
DELETE /customers/:id    -> Delete customer
```

### Contacts

```
GET    /contacts         -> List all contacts
GET    /contacts/:id     -> Get specific contact
POST   /contacts         -> Create new contact linked to customer
PUT    /contacts/:id     -> Update contact
DELETE /contacts/:id     -> Delete contact
```

**Note:** Customer and contact routes require JWT authentication in the header: `Authorization: Bearer <token>`

## Architecture

The project follows a layered architecture:

### Backend

- **Controllers**: Receive HTTP requests and delegate to services
- **Services**: Contain business logic
- **Repositories**: Abstract database access
- **Routes**: Define API endpoints
- **Middleware**: Intercept requests (authentication, validation)

### Frontend

- **Pages**: Main application pages
- **Components**: Reusable components
- **Services**: API communication
- **Contexts**: Global state management (Auth)
- **Hooks**: Reusable logic
