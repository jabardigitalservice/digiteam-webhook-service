# Digiteam Webhook Service
  
## Subcriber 
   - Digiteam
      ### Send report telegram Bot for Evidence

      This git webhook includes gitlab and github, helps to automatically report each time according to the main task of making code or as a peer to peer code
      ### How to use
      1. Make a pull request/merge request
      2. Added evidence format in the description section
      
      ```bash
      ## Evidence
      - title:
      - project:
      - participants:
      - date: (Optional)
      - screenshot: (Optional) for git private
      ```
      
      3. do Merge
      4. The report will be sent directly by the Telegram bot, containing a screenshot of the pull request/merge request, title, project, participants, url
      5. Participants are taken from the Telegram username


## Stack Technology
- NodeJS
- Nestjs Framework
- Redis (Queue)
- Elastic (Logging)
- API Telegram

## Quick Start
Clone project and install dependencies:
```bash
git clone https://github.com/jabardigitalservice/digiteam-webhook-service.git
cd digiteam-webhook-service
cp .env.example .env
```

Structure Repo

```bash
├── src/
│   ├── common/
│   │   ├── helpers
│   │   └── ...
│   ├── config
│   ├── interface
│   ├── providers/
│   │   ├── elastic
│   │   ├── queue
│   │   ├── screenshot
│   │   └── telegram
│   ├── receivers/
│   │   ├── github
│   │   ├── gitlab
│   │   └── ...
│   └── subcribers/
│       ├── digiteam/
│       │   ├── interface
│       │   ├── jobs/
│       │   │   ├── github-job
│       │   │   ├── gitlab-job
│       │   │   └── ...
│       │   ├── services/
│       │   │   ├── payload
│       │   │   └── user
│       │   └── ...
│       └── ...
├── app.module.ts
├── main.ts
└── ...
```
