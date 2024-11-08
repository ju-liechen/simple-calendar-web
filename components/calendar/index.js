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

import styles from './calendar.module.scss'

export const Calendar = () => {
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
      <div className={styles.body}>
        <CalendarGrid weekdayStyle="long">
          <CalendarGridHeader>
            {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
          </CalendarGridHeader>
          <CalendarGridBody>
            {(date) => <CalendarCell date={date} />}
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </CalendarRoot>
  )
}