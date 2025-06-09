export interface EmailSender {
  name: string
  email: string
  avatar?: string
}

export interface Email {
  id: string
  from: EmailSender
  to: string[]
  subject: string
  content: string
  date: string
  read: boolean
  starred: boolean
  labels?: string[]
}

