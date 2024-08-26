import { FC } from 'react'
import CustomCalendar from '../components/Calendar/CustomCalendar'
import useLoadAppointment from '@/hooks/useLoadAppointment'

const Home: FC = () => {
  useLoadAppointment()
  return (
    <div className="max-w-screen-2xl mx-auto">
      <CustomCalendar />
    </div>
  )
}

export default Home
