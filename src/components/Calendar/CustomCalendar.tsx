import { FC, useState } from 'react'
import { EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '@/store/index'
import EventForm from './EventForm'
import { addAppointment, removeAppointment } from '@/store/appointmentReducer'
import { addAppointmentService, deleteAppointmentService } from '@/services/appointment'
import { useRequest } from 'ahooks'
import { AppointmentInfo } from '@/store/appointmentReducer'

const CustomCalendar: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null)
  const appointmentList = useSelector((state: StateType) => state.appointment.appointmentData)

  const { run: addAppointmentServiceRun } = useRequest(
    async (appointment: AppointmentInfo) => {
      return await addAppointmentService(appointment)
    },
    {
      manual: true,
    }
  )

  const { run: deleteAppointmentServiceRun } = useRequest(
    async (id: string) => {
      return await deleteAppointmentService(id)
    },
    {
      manual: true,
    }
  )

  const handleAddEventClick = () => {
    navigate('/reservation')
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo)
  }

  const handleEventFormSubmit = (data: { title: string; start: string; end: string }) => {
    const calendarApi = selectInfo?.view.calendar

    calendarApi?.unselect()

    calendarApi?.addEvent({
      id: createEventId(),
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: selectInfo?.allDay,
    })

    const appointment = {
      id: createEventId(),
      title: data.title,
      start: data.start,
      end: data.end,
      patientName: '',
      type: '',
    }
    dispatch(addAppointment(appointment))
    addAppointmentServiceRun(appointment) // 调用后端接口添加预约
    setSelectInfo(null) // 关闭表单
  }

  const handleEventFormCancel = () => {
    setSelectInfo(null) // 关闭表单
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove() // 从日历中移除事件
      dispatch(removeAppointment(clickInfo.event.id)) // 从 Redux store 中移除事件
      deleteAppointmentServiceRun(clickInfo.event.id) // 调用后端接口删除预约
    }
  }

  return (
    <div className="demo-app flex p-4">
      {selectInfo && (
        <EventForm
          onSubmit={handleEventFormSubmit}
          onCancel={handleEventFormCancel}
          initialData={{
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          }}
        />
      )}
      <div className="demo-app-main flex flex-grow">
        <div className="w-2/3">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today addEventButton',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              addEventButton: {
                text: 'Add an appointment',
                click: handleAddEventClick,
              },
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={appointmentList}
            select={handleDateSelect}
            eventClick={handleEventClick} // 绑定事件点击处理函数
            eventContent={renderEventContent}
            eventsSet={setCurrentEvents}
          />
        </div>
        <div className="w-1/3 pl-4">
          <FullCalendar
            plugins={[listPlugin]}
            initialView="listWeek"
            events={currentEvents.map(event => ({
              id: event.id,
              title: event.title,
              start: event.start?.toISOString(),
              end: event.end?.toISOString(),
              allDay: event.allDay,
            }))}
            noEventsContent={'No events to display'}
          />
        </div>
      </div>
    </div>
  )
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

let eventGuid = 0

export function createEventId() {
  return String(eventGuid++)
}

export default CustomCalendar
