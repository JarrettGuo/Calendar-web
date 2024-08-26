import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { getPatientsListService } from '@/services/patient'
import { setPatient } from '@/store/patinetReducer'
import { useDispatch } from 'react-redux'
import { PatientInfo } from '@/store/patinetReducer'

export default function useLoadPatientInfo() {
  const dispatch = useDispatch()

  const {
    data: patientList,
    run: loadPatientList,
    loading,
  } = useRequest(
    async () => {
      const patientList = await getPatientsListService() // 直接返回患者列表
      return patientList
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!patientList) return
    dispatch(setPatient(patientList as PatientInfo[]))
  }, [patientList])

  useEffect(() => {
    loadPatientList()
  }, [loadPatientList])

  return {
    loading,
  }
}
