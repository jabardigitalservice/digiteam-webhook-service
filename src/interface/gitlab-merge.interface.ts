export interface GitlabMerge {
  object_kind: string
  event_type: string
  user: User
  project: Project
  object_attributes: ObjectAttributes
  labels: any[]
  changes: Changes
  repository: Repository
}

export interface Changes {
  state_id: StateID
  updated_at: UpdatedAt
}

export interface StateID {
  previous: number
  current: number
}

export interface UpdatedAt {
  previous: string
  current: string
}

export interface ObjectAttributes {
  assignee_id: null
  author_id: number
  created_at: string
  description: string
  head_pipeline_id: null
  id: number
  iid: number
  last_edited_at: null
  last_edited_by_id: null
  merge_commit_sha: string
  merge_error: null
  merge_params: MergeParams
  merge_status: string
  merge_user_id: null
  merge_when_pipeline_succeeds: boolean
  milestone_id: null
  source_branch: string
  source_project_id: number
  state_id: number
  target_branch: string
  target_project_id: number
  time_estimate: number
  title: string
  updated_at: string
  updated_by_id: number
  url: string
  source: Project
  target: Project
  last_commit: LastCommit
  work_in_progress: boolean
  total_time_spent: number
  time_change: number
  human_total_time_spent: null
  human_time_change: null
  human_time_estimate: null
  assignee_ids: any[]
  state: string
  action: string
}

export interface LastCommit {
  id: string
  message: string
  title: string
  timestamp: Date
  url: string
  author: Author
}

export interface Author {
  name: string
  email: string
}

export interface MergeParams {
  force_remove_source_branch: string
}

export interface Project {
  id: number
  name: string
  description: string
  web_url: string
  avatar_url: null
  git_ssh_url: string
  git_http_url: string
  namespace: string
  visibility_level: number
  path_with_namespace: string
  default_branch: string
  ci_config_path: string
  homepage: string
  url: string
  ssh_url: string
  http_url: string
}

export interface Repository {
  name: string
  url: string
  description: string
  homepage: string
}

export interface User {
  id: number
  name: string
  username: string
  avatar_url: string
  email: string
}
