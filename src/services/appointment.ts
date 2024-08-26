import axios from './ajax.ts'
import { ResDataType } from './ajax.ts'
import { AppointmentInfo } from '@/store/appointmentReducer.ts'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

// 获取患者列表
export async function getAppointmentListService(): Promise<ResDataType> {
  const url = `${BASE_URL}/api/appointments`
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 添加预约
export async function addAppointmentService(data: AppointmentInfo): Promise<ResDataType> {
  const url = `${BASE_URL}/api/appointments`
  const res = (await axios.post(url, data)) as ResDataType
  return res
}

// 删除预约
export async function deleteAppointmentService(id: string): Promise<ResDataType> {
  const url = `${BASE_URL}/api/appointments`
  const res = await axios.delete(url, { data: { id } })
  return res
}
