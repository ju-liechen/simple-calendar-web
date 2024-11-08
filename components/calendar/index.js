
import { useQuery } from '@tanstack/react-query'
import {
  Button as CalendarButton,
  Calendar as CalendarRoot,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading as CalendarHeading,
} from 'react-aria-components'

import { EventCard } from 'components/event-card'
import { parseISO } from 'date-fns';

import styles from './calendar.module.scss'
import { axiosClient } from 'util/axios-client'

export const Calendar = () => {
  const { data: eventsData } = useQuery({
    queryKey: ['userEvents'],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/user/schedule/events`)
      return data
    }
  })

  const renderCalendarCell = (date) => {
    const content =
      eventsData?.count > 0
        ? eventsData.results.filter((event) => {
          const eventDate = parseISO(event.startDateTime)
          return (
            eventDate.getFullYear() === date.year &&
            eventDate.getMonth() + 1 === date.month &&
            eventDate.getDate() === date.day
          )
        }) : []
    return (
      <CalendarCell date={date}>
        {date.day}
        {content.length > 0 && (
          <div className={styles.events}>
            {content.map((event) => (
              <EventCard key={event.id} data={event} />
            ))}
          </div>
        )}
      </CalendarCell>
    )
  }

  return (
    <CalendarRoot
      aria-label="Appointment date"
      className={styles['react-calendar']}
    >
      <div className={styles.heading}>
        <CalendarButton slot="previous">Previous</CalendarButton>
        <CalendarHeading/>
        <CalendarButton slot="next">Next</CalendarButton>
      </div>
      <div className={styles.table}>
        <CalendarGrid weekdayStyle="long" className={styles['cal-grid']}>
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => renderCalendarCell(date)}
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </CalendarRoot>
  )
}