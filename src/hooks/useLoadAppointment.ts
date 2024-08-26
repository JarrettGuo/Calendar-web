import { useRequest } from 'ahooks'
import { getAppointmentListService } from '@/services/appointment'
import { useDispatch } from 'react-redux'
import { setAppointment } from '@/store/appointmentReducer'
import { useEffect } from 'react'
import { AppointmentInfo } from '@/store/appointmentReducer'

export default function useLoadAppointment() {
  const dispatch = useDispatch()

  const {
    data: appointmentList,
    run: loadAppointmentList,
    loading,
  } = useRequest(
    async () => {
      const appointmentList = await getAppointmentListService()
      return appointmentList
    },
    {
      manual: true,
    }
  )
  useEffect(() => {
    if (!appointmentList) return
    dispatch(setAppointment(appointmentList as AppointmentInfo[]))
  }, [appointmentList, dispatch])

  useEffect(() => {
    loadAppointmentList()
  }, [loadAppointmentList, dispatch])

  return {
    appointmentList,
    loading,
  }
}
