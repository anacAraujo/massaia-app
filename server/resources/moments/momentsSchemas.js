import Joi from 'joi'

const id = Joi.number().integer().positive().required();
const name = Joi.string();
const image = Joi.string();
const video = Joi.string();
const date = Joi.date();

export const idSchema = Joi.object({
    id: id,
})