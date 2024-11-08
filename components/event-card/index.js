import styles from './event-card.module.scss'

export const EventCard = ({ data }) => {
  const { title, startDateTime, endDateTime } = data
  return (
    <div className={styles['event-card-wrapper']}>
      {title}
    </div>
  )
}