import { TypeNotification } from "@/interfaces/INotification"
import { store } from "@/store"
import { SHOW_NOTIFICATION } from "@/store/mutationsType"

type Notifier = {
  notify: (type: TypeNotification, title: string, text: string) => void
}

export default (): Notifier => {
  const notify = (type: TypeNotification, title: string, text: string): void => {
    store.commit(SHOW_NOTIFICATION, {
      title,
      text,
      type
    })
  }

  return {
    notify
  }
}