export interface ClickupTaskCommentPosted {
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
  before: null
  after: string
  comment: HistoryItemComment
}

export interface HistoryItemComment {
  id: string
  date: string
  parent: string
  type: number
  comment: CommentElement[]
  text_content: string
  x: null
  y: null
  image_y: null
  image_x: null
  page: null
  comment_number: null
  page_id: null
  page_name: null
  view_id: null
  view_name: null
  team: null
  user: User
  new_thread_count: number
  new_mentioned_thread_count: number
  email_attachments: any[]
  threaded_users: any[]
  threaded_replies: number
  threaded_assignees: number
  threaded_assignees_members: any[]
  threaded_unresolved_count: number
  thread_followers: User[]
  group_thread_followers: any[]
  reactions: any[]
  emails: any[]
}

export interface CommentElement {
  text: string
  attributes: Attributes
}

export interface Attributes {
  'block-id'?: string
}

export interface User {
  id: number
  username: string
  email: string
  color: string
  initials: string
  profilePicture: null
}

export interface Data {}
