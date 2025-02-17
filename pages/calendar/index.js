import { Calendar } from 'components/calendar'

import styles from './calendar.module.scss'

const CalendarPage = () => {
  return (
    <div className={styles['calendar-wrapper']}>
      <Calendar/>
    </div>
  )
}

CalendarPage.Layouts = ['BaseLayout']
export default CalendarPage