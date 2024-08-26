import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

import { SubmitHandler } from 'react-hook-form'

interface EventFormProps {
  onSubmit: SubmitHandler<{ title: string; start: string; end: string; type: string }>
  onCancel: () => void
  initialData?: { title: string; start: string; end: string; type: string }
}

const EventForm: FC<EventFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  })

  const dialogRef = useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  const handleCancel = () => {
    dialogRef.current?.close()
    onCancel()
  }

  return (
    <dialog ref={dialogRef} className="rounded-md p-4 bg-white shadow-md w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Event Title</label>
          <input
            type="text"
            {...register('title', { required: 'Event title is required' })}
            placeholder="Enter event title"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            {...register('start', { required: 'Start time is required' })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="datetime-local"
            {...register('end', { required: 'End time is required' })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Type of Appointment</label>
          <select
            {...register('type', { required: 'Appointment type is required' })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="follow-up">Follow-up</option>
            <option value="new consult">New Consult</option>
            <option value="pre-op">Pre-op</option>
            <option value="urgent">Urgent</option>
            <option value="annual exam">Annual Exam</option>
            <option value="new physical">New Physical</option>
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="button" onClick={handleCancel} variant="secondary" className="mr-2">
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Add Event
          </Button>
        </div>
      </form>
    </dialog>
  )
}

export default EventForm
