import express from 'express';
import { search } from './search.controller'
import { query } from 'express-validator';

const router = express.Router();

router.get('/', [
  query('keyword')
    .exists()
    .isString()
    .isLength({ min: 1, max: 50 }),
  query('menu_cd')
    .isString()
    .toLowerCase()
    .default('all')
    .isIn(['all', 'test'])
], search)

export default router;