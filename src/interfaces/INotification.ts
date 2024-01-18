export enum TypeNotification{
  SUCCESS,
  FAIL,
  ATTENTION
}

export default interface INotification {
  title: string
  text: string
  type: TypeNotification
  id: number
}