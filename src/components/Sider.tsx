import { FC } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sider: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 判断当前路径是否包含 "reservation"
  const isReservation = location.pathname.includes('reservation')

  return (
    <div className="w-52 bg-gray-100 flex flex-col h-full px-1">
      {/* Logo Section */}
      <div className="p-4 bg-gray-100 text-center font-bold text-xl">LOGO</div>

      {/* Navigation Section */}
      <div className="flex flex-col mt-4">
        <button
          onClick={() => navigate('/')}
          className={`py-3 px-2 text-left border rounded-xl mb-4 ${
            !isReservation ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-200 border-transparent'
          }`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => navigate('/reservation')}
          className={`py-3 px-2 text-left border rounded-xl ${
            isReservation ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-200 border-transparent'
          }`}
        >
          Making a Appointment
        </button>
      </div>
    </div>
  )
}

export default Sider
