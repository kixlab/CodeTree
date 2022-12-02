import { useCallback, useEffect } from 'react'
import { getString } from '../shared/Localization'

export function useConfirmBeforeLeave() {
  const onBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    event.returnValue = getString('assessment_alert_back')
    return getString('assessment_alert_back')
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [onBeforeUnload])
}
