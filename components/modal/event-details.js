import { useForm, Form, SubmitButton, TextInput} from 'components/form'
import { Button } from 'components/button'
import { Modal } from 'components/modal'

import { classnames } from 'util/classnames'
import { useStore } from 'util/store'

import styles from './event-details.module.scss'


export function EventDetails() {
  const setModal = useStore((state) => state.setModal)
  const eventData = useStore((state) => state.modalState)

  const formattedStartTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(eventData.startDateTime))

  const formattedEndTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(new Date(eventData.endDateTime))


  function closeModal() {
    setModal(null)
  }

  const methods = useForm({
    defaultValues: {
    },
    onSubmit: async (data) => {
      console.log('SUBMIT')
    }
  })

  return (
    <Modal variant="small white" onClose={closeModal}>
      <Form className={styles['content-wrapper']} methods={methods}>
        <h2 className={classnames(['modal-title', styles.title])}>
          {eventData.title}
        </h2>
        <div className={styles.body}>
          <span>{formattedStartTime}</span>
          <span>{formattedEndTime}</span>
        </div>
        <div className={styles.actions}>
          <SubmitButton fullWidth disabled={false}>
            Save
          </SubmitButton>
          <Button
            fullWidth
            type="button"
            onClick={() => closeModal()}
          >
            Back
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
