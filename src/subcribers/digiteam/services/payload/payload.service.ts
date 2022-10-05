import { BadRequestException, Injectable } from '@nestjs/common'
import { Body, Payload } from '../../interface/digiteam.interface'
import { UserService } from '../user/user.service'

@Injectable()
export class PayloadService {
  constructor(private userService: UserService) {}

  private regex = (string: string): RegExp => new RegExp(string, 'i')

  private bodyRegex = {
    project: this.regex('project: (.+)'),
    title: this.regex('title: (.+)'),
    participants: this.regex('participants: (.+)'),
    date: this.regex('date: (.+)'),
    screenshot: this.regex('screenshot: (.+)'),
  }

  private getBody = (body: any) => {
    let isValidBody = true
    for (const item in body) {
      if (body[item] === null) {
        isValidBody = false
        break
      }
      body[item] = body[item][1]
    }
    body.isValidBody = isValidBody

    return body
  }

  public body = async (payload: Payload): Promise<Body> => {
    const body = this.getBody({
      project: this.bodyRegex.project.exec(payload.body),
      title: this.bodyRegex.title.exec(payload.body),
      participants: this.bodyRegex.participants.exec(payload.body),
    })

    const date = this.bodyRegex.date.exec(payload.body)
    body.date = date ? date[1] : null
    const screenshot = this.bodyRegex.screenshot.exec(payload.body)
    body.screenshot = screenshot ? screenshot[1] : null

    delete payload.body

    if (!body.isValidBody) throw new BadRequestException()

    console.log(body.participants);
    body.participants = await this.userService.users(body.participants)
    

    body.addition = payload
    body.url = payload.url
    return body
  }

  public formatByCreated = (payload: Body): string => {
    const message = `
  /lapor ${payload.project} | ${payload.title}
Peserta: ${payload.participants[0]}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
    return payload.participants[0] ? message : null
  }

  public formatByReview = (payload: Body): string => {
    const message = `
/lapor ${payload.project} | Peer code review ${payload.title}
Peserta: ${payload.participants.slice(1).join('  ')}
Lampiran: ${payload.url}
${payload.date ? `Tanggal: ${payload.date}` : ''}
`
    return payload.participants.slice(1).length ? message : null
  }
}
