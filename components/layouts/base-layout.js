import ErrorBoundary from 'components/error-boundary'
import { EventDetails } from 'components/modal/event-details'
import { Modals } from 'components/modal'
import { Navigation } from 'components/navigation'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'

import styles from './base-layout.module.scss'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <div className={styles['base-layout']}>
        <Modals
          modals={{
            EventDetails
          }}
        />
        <Notification />
        <Navigation/>
        <ErrorBoundary>{children}</ErrorBoundary>
        <SvgDefs />
      </div>
    </>
  )
}
