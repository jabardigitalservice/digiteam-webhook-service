export interface Rows {
  Timestamp: Date
  git: string
  telegram: string
}

export interface PayloadInterface {
  repositoryName: string
  repositoryUrl: string
  platform: string
  url: string
  body: string
  createdBy: string
  createdAt: Date
}

export interface BodyInterface {
  project: string
  title: string
  participants: string[]
  date?: string
  screenshot?: string
  isValidBody: boolean
  url: string
  addition: PayloadInterface
}
