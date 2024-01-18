import { SHOW_NOTIFICATION } from "@/store/mutationsType"
import { TypeNotification } from "@/interfaces/INotification"
import { store } from "@/store"

export const notifyMixing = {
  methods: {
    notify(type: TypeNotification, title: string, text: string): void {
      store.commit(SHOW_NOTIFICATION, {
        title,
        text,
        type
      })
    }
  }
}