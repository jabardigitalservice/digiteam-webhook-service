import Joi from 'joi'

export const EvidenceSchema = Joi.object({
  title: Joi.string().required(),
  project: Joi.string().required(),
  participants: Joi.string().required(),
  url: Joi.string().uri().required(),
  date: Joi.string().optional(),
  screenshot: Joi.string().uri().optional(),
})
