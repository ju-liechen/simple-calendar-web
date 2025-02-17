import { useForm, Form, SubmitButton, TextInput} from 'components/form'
import { Button } from 'components/button'
import { Modal } from 'components/modal'

import { classnames } from 'util/classnames'
import { useStore } from 'util/store'

import styles from './event-details.module.scss'


export function EventDetails() {
  const setModal = useStore((state) => state.setModal)

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
          Event Details
        </h2>
        <div className={styles.body}>
          <div className={styles['select-wrapper']}>
            Info here
          </div>
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
