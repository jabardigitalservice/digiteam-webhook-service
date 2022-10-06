export interface ClickupTaskStatusUpdated {
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
  status: string
  color: string
  orderindex: number
  type: string
}

export interface Data {
  status_type: string
}

export interface User {
  id: number
  username: string
  email: string
  color: string
  initials: string
  profilePicture: null
}
