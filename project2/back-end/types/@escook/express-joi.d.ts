// TypeScript declaration file for @escook/express-joi
// This file provides type definitions for the @escook/express-joi package

import { RequestHandler } from 'express';
import Joi from 'joi';

/**
 * Schema configuration interface for @escook/express-joi
 * This can include validation schemas for different parts of the request
 */
declare interface ExpressJoiSchema {
  /** Validation schema for req.body */
  body?: Record<string, Joi.Schema> | Joi.ObjectSchema;
  /** Validation schema for req.query */
  query?: Record<string, Joi.Schema> | Joi.ObjectSchema;
  /** Validation schema for req.params */
  params?: Record<string, Joi.Schema> | Joi.ObjectSchema;
}

/**
 * @escook/express-joi validation middleware factory function
 * @param schema Schema configuration object with body/query/params validation rules
 * @returns Express middleware function that validates requests against the schema
 */
declare function expressJoi(schema: ExpressJoiSchema): RequestHandler;

export default expressJoi;
