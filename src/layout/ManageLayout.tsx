import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-14 bg-blue-300 flex items-center justify-center">Calendar Demo</div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="h-14 bg-blue-300 flex items-center justify-center">
        Calendar &copy;2024 - present.
      </div>
    </div>
  )
}

export default ManageLayout
