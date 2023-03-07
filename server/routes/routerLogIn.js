import express from 'express';
const router = express.Router();

import {logIn, checkSessionValidity} from '../controllers/controllerLogIn.js';

router.post('/login', logIn);
router.get('/checkSession', checkSessionValidity);

export default router;