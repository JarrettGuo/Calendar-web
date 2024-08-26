import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Sider from '@/components/Sider'

const MainLayout: FC = () => {
  return (
    <div className="flex flex-row ">
      <div className="w-52 bg-gray-100">
        <Sider />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
