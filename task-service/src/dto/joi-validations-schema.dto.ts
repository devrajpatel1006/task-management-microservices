import * as Joi from 'joi';

export const addTasksSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum().required(),
  priority: Joi.number().required(),
  due_date: Joi.string().required()
});


export const updateTasksSchema = Joi.object({
  task_id: Joi.number().required(),
  title: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().alphanum().required(),
  priority: Joi.number().required(),
  due_date: Joi.string().required()
});
