import styles from './event-card.module.scss'

export const EventCard = ({ data }) => {
  const { title, startDateTime, endDateTime } = data

  const formattedStartTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(startDateTime))

  return (
    <div className={styles['event-card-wrapper']}>
      <span className={styles['title']}>{title}</span>
      <span className={styles['start-time']}>{formattedStartTime}</span>
    </div>
  )
}