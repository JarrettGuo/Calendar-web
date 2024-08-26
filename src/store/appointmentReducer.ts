import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AppointmentInfo = {
  id: string
  title: string
  patientName: string
  start: string
  end: string
  type: string
}

export type AppointmentStateType = {
  appointmentData: AppointmentInfo[]
}

const INIT_STATE: AppointmentStateType = {
  appointmentData: [],
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: INIT_STATE,
  reducers: {
    //后端获取数据，存到redux中
    setAppointment: (state: AppointmentStateType, action: PayloadAction<AppointmentInfo[]>) => {
      state.appointmentData = action.payload
    },

    //添加预约
    addAppointment: (state: AppointmentStateType, action: PayloadAction<AppointmentInfo>) => {
      state.appointmentData.push(action.payload)
    },

    //删除预约
    removeAppointment: (state: AppointmentStateType, action: PayloadAction<string>) => {
      state.appointmentData = state.appointmentData.filter(
        appointment => appointment.id !== action.payload
      )
    },
  },
})

export const { setAppointment, addAppointment, removeAppointment } = appointmentSlice.actions

export default appointmentSlice.reducer
