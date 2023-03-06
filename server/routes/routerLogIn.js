import express from 'express';
const router = express.Router();

import {logIn, checkSessionValidity} from '../controllers/controllerLogIn.js';

router.post('/login', logIn);
router.get('/session', checkSessionValidity);

export default router;