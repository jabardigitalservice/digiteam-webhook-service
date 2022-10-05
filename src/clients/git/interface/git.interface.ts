export interface GitUser {
  Timestamp: Date
  git: string
  telegram: string
}

export interface Git {
  repoName: string
  repoUrl: string
  url: string
  description: string
  createdBy: string
  createdAt: string
}
