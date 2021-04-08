import express from 'express';
import { test } from './test.controller'
import { query } from 'express-validator';

const router = express.Router();

router.get('/', [
  query('id')
    .exists(),
  query('no')
    .if(query('no').notEmpty())
    .isNumeric()
    .withMessage('no is type Number')
], test)

export default router;