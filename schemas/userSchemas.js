import Joi from 'joi';

export const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});
