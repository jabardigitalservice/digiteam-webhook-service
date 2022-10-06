import { Injectable } from '@nestjs/common'
import { Evidence } from 'src/interface/evidence.interface'
import { EvidenceService } from 'src/providers/evidence/evidence.service'
import { Git } from '../../interface/git.interface'
import { UserService } from '../user/user.service'

@Injectable()
export class PayloadService {
  constructor(private userService: UserService, private evidenceService: EvidenceService) {}

  public getEvidence = async (git: Git): Promise<Evidence> => {
    const evidence = this.evidenceService.GetEvidence(git.description)
    evidence.participants = await this.userService.getUsers(evidence.participants)
    delete git.description
    evidence.source = git
    evidence.url = git.url
    return evidence
  }
}
