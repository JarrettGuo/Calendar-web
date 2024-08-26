import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layout/MainLayout'
import ManageLayout from '@/layout/ManageLayout'
import Home from '@/pages/Home'
import Reservation from '@/pages/Reservation'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ManageLayout />,
        children: [
          { path: '/', element: <Home /> },
          {
            path: '/reservation',
            element: <Reservation />,
          },
        ],
      },
    ],
  },
])

export default router
