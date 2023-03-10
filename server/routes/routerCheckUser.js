import express from 'express';

const router = express.Router();

//import the controller
import { checkUser, recoverPassword} from '../controllers/controllerCheckUser.js';

router.get('/checkUser', checkUser);
router.post('/recoverPassword', recoverPassword)


export default router;