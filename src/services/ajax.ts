import axios from 'axios'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

// 创建一个新的 axios 实例。这个实例在发送HTTP请求时会使用特定的配置。这里的配置是 timeout: 1000 * 10，这意味着每个请求都有一个超时时间限制，如果在10秒（1000毫秒 * 10）内没有收到响应，则请求会自动被中断，并抛出一个超时错误。
const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  timeout: 1000 * 10,
  headers: {},
})

//response 拦截：统一处理 errno和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { status, data, msg } = resData

  if (status !== 200) {
    //错误提示
    if (msg) {
      console.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance

export type ResType = {
  status: number
  data?: ResDataType | ResDataType[]
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
