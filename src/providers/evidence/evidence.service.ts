import { BadRequestException, Injectable } from '@nestjs/common'
import { regex } from 'src/common/helpers/regex'
import { Evidence } from 'src/interface/evidence.interface'
import { UserService } from '../telegram/user.service'

@Injectable()
export class EvidenceService {
  constructor(private userService: UserService) {}
  private evidenceRegex = {
    project: regex('project: (.+)'),
    title: regex('title: (.+)'),
    participants: regex('participants: (.+)'),
    date: regex('date: (.+)'),
    screenshot: regex('screenshot: (.+)'),
  }

  private validateEvidence = (evidence: any) => {
    let isValid = true
    for (const item in evidence) {
      if (evidence[item] === null) {
        isValid = false
        break
      }
      evidence[item] = evidence[item][1]
    }
    evidence.isValid = isValid

    return evidence
  }

  public GetEvidence = async (
    description: string,
    assigness: string[] = null
  ): Promise<Evidence> => {
    const evidence = this.validateEvidence({
      project: this.evidenceRegex.project.exec(description),
      title: this.evidenceRegex.title.exec(description),
      participants: this.evidenceRegex.participants.exec(description),
    })

    if (!evidence.isValid) throw new BadRequestException()

    const participants = evidence.participants.trimEnd().split(/[ ,]+/)
    const users = assigness ? assigness : participants
    evidence.participants = await this.userService.getUsers(users)

    const date = this.evidenceRegex.date.exec(description)
    evidence.date = date ? date[1] : null
    const screenshot = this.evidenceRegex.screenshot.exec(description)
    evidence.screenshot = screenshot ? screenshot[1] : null

    return evidence
  }
}
