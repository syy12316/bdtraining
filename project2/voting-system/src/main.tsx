import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Login from './component/Login/Login.tsx'
import Vote from './component/Vote/Vote.tsx'
import VoteResults from './component/Vote/VoteResults.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/vote',
    element: <Vote />,
  },
  {
    path: '/results',
    element: <VoteResults />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
