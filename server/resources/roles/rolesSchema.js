import Joi from "joi";

const id = Joi.number().integer().positive().required();
const name = Joi.string().required();

export const addRoleSchema = Joi.object({
    id: id,
    name: name
});