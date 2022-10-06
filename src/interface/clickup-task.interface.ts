export interface ClickupTask {
  id: string
  custom_id: string
  name: string
  text_content: string
  description: string
  status: Status
  orderindex: string
  date_created: string
  date_updated: string
  date_closed: string
  creator: Creator
  assignees: string[]
  checklists: string[]
  tags: string[]
  parent: string
  priority: string
  due_date: string
  start_date: string
  time_estimate: string
  time_spent: string
  custom_fields: CustomField[]
  list: Folder
  folder: Folder
  space: Folder
  url: string
}

export interface Creator {
  id: number
  username: string
  color: string
  profilePicture: string
}

export interface CustomField {
  id: string
  name: string
  type: string
  type_config: TypeConfig
  date_created: string
  hide_from_guests: boolean
  value: Value
  required: boolean
}

export interface TypeConfig {}

export interface Value {
  id: number
  username: string
  email: string
  color: string
  initials: string
  profilePicture: null
}

export interface Folder {
  id: string
}

export interface Status {
  status: string
  color: string
  orderindex: number
  type: string
}
