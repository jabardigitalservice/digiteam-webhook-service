export interface ClickupTaskMoved {
  event: string
  history_items: HistoryItem[]
  task_id: string
  webhook_id: string
}

export interface HistoryItem {
  id: string
  type: number
  date: string
  field: string
  parent_id: string
  data: Data
  source: null
  user: User
  before: After
  after: After
}

export interface After {
  id: string
  name: string
  category: Category
  project: Project
}

export interface Category {
  id: string
  name: string
  hidden: boolean
}

export interface Project {
  id: string
  name: string
}

export interface Data {
  mute_notifications: boolean
}

export interface User {
  id: number
  username: string
  email: string
  color: string
  initials: string
  profilePicture: null
}
