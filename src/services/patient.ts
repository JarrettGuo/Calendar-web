import axios from './ajax.ts'
import { ResDataType } from './ajax.ts'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

// 获取患者列表
export async function getPatientsListService(): Promise<ResDataType> {
  const url = `${BASE_URL}/api/patients`
  const data = (await axios.get(url)) as ResDataType
  return data
}
