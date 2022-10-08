export interface QaseTest {
  event_name: string
  timestamp: number
  payload: Payload
  team_member_id: number
  project_code: string
}

export interface Payload {
  description: string
}
