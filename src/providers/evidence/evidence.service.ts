import { BadRequestException, Injectable } from '@nestjs/common'
import { regex } from 'src/common/helpers/regex'
import { Evidence } from 'src/interface/evidence.interface'
import { UserService } from '../telegram/user.service'

@Injectable()
export class EvidenceService {
  constructor(private userService: UserService) {}

  private required = ['project', 'title']

  private evidenceRegex = {
    project: regex('project: (.+)'),
    title: regex('title: (.+)'),
    participants: regex('participants: (.+)'),
    date: regex('date: (.+)'),
    screenshot: regex('screenshot: (.+)'),
    attachment: regex('attachment: (.+)'),
  }

  private validateEvidence = (evidence: any) => {
    let isValid = true
    for (const item in evidence) {
      const validation = evidence[item] === null && this.required.includes(item)
      if (validation) {
        isValid = false
        break
      }

      evidence[item] = evidence[item] ? evidence[item][1] : null
    }

    evidence.isValid = isValid

    return evidence
  }

  public getEvidence = async (description: string, assigness: string[] = []): Promise<Evidence> => {
    const evidence = this.validateEvidence({
      project: this.evidenceRegex.project.exec(description),
      title: this.evidenceRegex.title.exec(description),
      participants: this.evidenceRegex.participants.exec(description),
      date: this.evidenceRegex.date.exec(description),
      screenshot: this.evidenceRegex.screenshot.exec(description),
      attachment: this.evidenceRegex.attachment.exec(description),
    })

    if (!evidence.isValid) throw new BadRequestException()

    evidence.participants = evidence.participants
      ? evidence.participants.trimEnd().split(/[ ,]+/)
      : []

    const users = assigness.length ? assigness : evidence.participants
    evidence.participants = await this.userService.getUsers(users)

    return evidence
  }
}
