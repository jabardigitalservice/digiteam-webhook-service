export interface Rows {
  Timestamp: Date
  git: string
  telegram: string
}

export interface Payload {
  repoName: string
  repoUrl: string
  url: string
  body: string
  createdBy: string
  createdAt: string
}

export interface Body {
  project: string
  title: string
  participants: string[]
  date?: string
  screenshot?: string
  isValidBody: boolean
  url: string
  addition: Payload
}
