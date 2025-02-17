import { useStore } from 'util/store'

import styles from './event-card.module.scss'


export const EventCard = ({ data }) => {
  const { title, startDateTime, endDateTime } = data
  const setModal = useStore((state) => state.setModal)
  const setModalState = useStore((state) => state.setModalState)

  const formattedStartTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(startDateTime))

  const onClickEventCard = () => {
    setModalState(data)
    setModal('EventDetails')
  }

  return (
    <div className={styles['event-card-wrapper']} onClick={onClickEventCard}>
      <span className={styles['title']}>{title}</span>
      <span className={styles['start-time']}>{formattedStartTime}</span>
    </div>
  )
}