import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PatientInfo = {
  nrm: string
  name: string
  DOB: string
  phone: string
  insurance: InsurenceType
  photo: string
}

export type InsurenceType = {
  name: string
  id: string
  group: string
}

export type PatientStateType = {
  patientData: PatientInfo[]
}

const INIT_STATE: PatientStateType = {
  patientData: [],
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState: INIT_STATE,
  reducers: {
    //从后端获取数据，存到redux中
    setPatient: (state: PatientStateType, action: PayloadAction<PatientInfo[]>) => {
      state.patientData = action.payload
    },
  },
})

export const { setPatient } = patientSlice.actions

export default patientSlice.reducer
