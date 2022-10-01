export interface GithubMerge {
  action: string
  number: number
  pull_request: PullRequest
  repository: Repo
  organization: Organization
  sender: Sender
}

export interface Organization {
  login: string
  id: number
  node_id: string
  url: string
  repos_url: string
  events_url: string
  hooks_url: string
  issues_url: string
  members_url: string
  public_members_url: string
  avatar_url: string
  description: string
}

export interface PullRequest {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: Sender
  body: string
  created_at: Date
  updated_at: Date
  closed_at: Date
  merged_at: Date
  merge_commit_sha: string
  assignee: Sender
  assignees: Sender[]
  requested_reviewers: Sender[]
  requested_teams: any[]
  labels: any[]
  milestone: null
  draft: boolean
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  head: Base
  base: Base
  _links: Links
  author_association: string
  auto_merge: null
  active_lock_reason: null
  merged: boolean
  mergeable: null
  rebaseable: null
  mergeable_state: string
  merged_by: Sender
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}

export interface Links {
  self: Comments
  html: Comments
  issue: Comments
  comments: Comments
  review_comments: Comments
  review_comment: Comments
  commits: Comments
  statuses: Comments
}

export interface Comments {
  href: string
}

export interface Sender {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: Type
  site_admin: boolean
}

export enum Type {
  Organization = 'Organization',
  User = 'User',
}

export interface Base {
  label: string
  ref: string
  sha: string
  user: Sender
  repo: Repo
}

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Sender
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: Date
  updated_at: Date
  pushed_at: Date
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url: null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License
  allow_forking: boolean
  is_template: boolean
  topics: any[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  allow_squash_merge?: boolean
  allow_merge_commit?: boolean
  allow_rebase_merge?: boolean
  allow_auto_merge?: boolean
  delete_branch_on_merge?: boolean
}

export interface License {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}
