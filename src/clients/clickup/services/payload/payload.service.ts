import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { Clickup } from '../../interface/clickup.interface'
import { UserService } from '../user/user.service'

@Injectable()
export class PayloadService {
  constructor(private userService: UserService, private evidenceService: EvidenceService) {}

  public getEvidence = async (clickup: Clickup): Promise<Evidence> => {
    const evidence = this.evidenceService.GetEvidence(clickup.description)
    evidence.participants = await this.userService.getUsers(evidence.participants)
    evidence.source = clickup
    evidence.url = clickup.url
    return evidence
  }
}
