import express from 'express';

const route = express.Router();

import { Auth } from '../../../middlewares/auth';

import { validateAdminSignupInput } from '../../../middlewares/validationMiddleware';

import { adminSignup } from '../service/admin.auth.service';

const { authenticateUser } = Auth;

route.post('admin_sign_up', validateAdminSignupInput, adminSignup);

export default route;
