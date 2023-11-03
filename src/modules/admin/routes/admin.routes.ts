import express from 'express';

const route = express.Router();

import { Auth } from '../../../middlewares/auth';

const { authenticateUser } = Auth;

route.post("admin_sign_up",)
