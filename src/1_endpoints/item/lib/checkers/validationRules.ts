import { Request, Response, NextFunction } from "express";

import Joi from "joi";

const getItemsSchema = Joi.object({
  limit: Joi.number().integer().min(10).required(),
  offset: Joi.number().integer().min(0).required(),
});

const purchaseItemSchema = Joi.object({
  marketHashName: Joi.string().required(),
  count: Joi.number().integer().min(0).required(),
});

const buyItemsSchema = Joi.object({
  userName: Joi.string()
    .pattern(/^[a-zA-Z0-9_]+$/)
    .min(5)
    .max(50)
    .required(),
  purchaseItems: Joi.array().items(purchaseItemSchema).required(),
});

export const validateGetItems = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = getItemsSchema.validate(req.query);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export const validatePostItems = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = buyItemsSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};
