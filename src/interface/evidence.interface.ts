import { Git } from 'src/clients/git/interface/git.interface'

interface Client {
  Git?: Git
}

export interface Evidence {
  title: string
  project: string
  participants: string[]
  url: string
  date?: string
  screenshot?: string
  isValid?: string
  client: Client
}
