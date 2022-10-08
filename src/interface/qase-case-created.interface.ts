export interface QaseCaseCreated {
  event_name: string
  timestamp: number
  payload: Payload
  team_member_id: number
  project_code: string
}

export interface Payload {
  id: number
  title: string
  description: string
  preconditions: string
  postconditions: string
  priority: Rity
  severity: Rity
  behavior: Automation
  type: Automation
  automation: Automation
  status: Automation
  suite_id: number
  milestone_id: null
  steps: Step[]
  attachments: any[]
  custom_fields: CustomField[]
}

export interface Automation {
  id: number
  title: string
}

export interface CustomField {
  id: number
  title: string
  type: string
  value: string
}

export interface Rity {
  id: number
  title: string
  icon: string
  color: string
}

export interface Step {
  position: number
  action: string
  expected_result: string
  data: string
  attachments: any[]
  shared: boolean
}
