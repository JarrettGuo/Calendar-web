import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // 默认使用 localStorage
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import patientReducer, { PatientStateType } from './patinetReducer'
import appointmentReducer, { AppointmentStateType } from './appointmentReducer'

// 定义 redux store 的类型
export type StateType = {
  patient: PatientStateType
  appointment: AppointmentStateType
}

// 配置 persist
const persistConfig = {
  key: 'root',
  storage,
}

// 组合 reducer
const rootReducer = combineReducers({
  patient: patientReducer,
  appointment: appointmentReducer,
})

// 创建持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 创建 store
const store = configureStore({
  reducer: persistedReducer,
})

// 创建 persistor
export const persistor = persistStore(store)

export default store
