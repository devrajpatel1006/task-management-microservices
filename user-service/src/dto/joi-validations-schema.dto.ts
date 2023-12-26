import * as Joi from 'joi';

export const addUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  type: Joi.number().required(),
  password: Joi.string().required()
});

export const deleteUserSchema = Joi.object({
  user_id: Joi.number().required()
});
