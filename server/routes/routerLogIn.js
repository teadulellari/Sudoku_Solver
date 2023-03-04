import express from 'express';
const router = express.Router();

import {logIn} from '../controllers/controllerLogIn.js';

router.post('/login', logIn);

export default router;