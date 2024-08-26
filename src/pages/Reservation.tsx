import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import useLoadPatientInfo from '@/hooks/useLoadPatientInfo'
import { PatientInfo } from '@/store/patinetReducer'
import { StateType } from '@/store/index'
import { addAppointment } from '@/store/appointmentReducer'
import { AppointmentInfo } from '@/store/appointmentReducer'
import { addAppointmentService } from '@/services/appointment'
import { useRequest } from 'ahooks'

interface FormData {
  title: string
  start: string
  end: string
  patientName: string
  appointmentType: string
}

const Reservation: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useLoadPatientInfo()
  const patients = useSelector((state: StateType) => state.patient.patientData)
  const [filteredPatients, setFilteredPatients] = useState<PatientInfo[]>([])
  const [isListOpen, setIsListOpen] = useState(false)

  const { run: addAppointmentServiceRun } = useRequest(
    async (appointment: AppointmentInfo) => {
      return await addAppointmentService(appointment)
    },
    {
      manual: true,
    }
  )

  const onSubmit = (data: FormData) => {
    const appointment: AppointmentInfo = {
      id: Date.now().toString(), // 使用时间戳作为唯一ID
      title: data.patientName + ' - ' + data.title,
      patientName: data.patientName,
      start: data.start,
      end: data.end,
      type: data.appointmentType,
    }
    dispatch(addAppointment(appointment))
    addAppointmentServiceRun(appointment) // 调用后端接口添加预约

    // 导航到日历页面
    navigate('/')
  }

  const handlePatientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    const filtered = patients.filter(patient => patient.name.toLowerCase().includes(query))
    setFilteredPatients(filtered)
    setValue('patientName', event.target.value) // 更新输入框的值
    setIsListOpen(true) // 打开列表
  }

  const handlePatientSelect = (name: string) => {
    setValue('patientName', name) // 更新 react-hook-form 的状态
    setFilteredPatients([]) // 清空过滤列表
    setIsListOpen(false) // 关闭列表
  }

  return (
    <div className="min-h-full flex items-center justify-center bg-white">
      <div className="max-w-2xl w-full p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create a Appointment</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              {...register('title', { required: 'Event title is required' })}
              placeholder="Enter event title"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              {...register('start', { required: 'Start time is required' })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.start && <span className="text-red-500 text-sm">{errors.start.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              {...register('end', { required: 'End time is required' })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.end && <span className="text-red-500 text-sm">{errors.end.message}</span>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1">Patient Name</label>
            <input
              type="text"
              {...register('patientName', { required: 'Patient name is required' })}
              placeholder="Enter patient name"
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={handlePatientNameChange}
            />
            {errors.patientName && (
              <span className="text-red-500 text-sm">{errors.patientName.message}</span>
            )}
            {isListOpen && filteredPatients.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white z-10">
                {filteredPatients.map(patient => (
                  <li
                    key={`${patient.nrm}-${patient.name}`}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handlePatientSelect(patient.name)}
                  >
                    {patient.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Appointment Type</label>
            <select
              {...register('appointmentType', { required: 'Appointment type is required' })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select an appointment type</option>
              <option value="follow-up">Follow-up</option>
              <option value="new consult">New Consult</option>
              <option value="pre-op">Pre-op</option>
              <option value="urgent">Urgent</option>
              <option value="annual exam">Annual Exam</option>
              <option value="new physical">New Physical</option>
            </select>
            {errors.appointmentType && (
              <span className="text-red-500 text-sm">{errors.appointmentType.message}</span>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button type="button" onClick={() => navigate('/')} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reservation
