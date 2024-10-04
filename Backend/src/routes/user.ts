import express from 'express'
import { allUsers, register, updateUser } from '../controlar/user';
import {jwtCheck, jwtDecode} from '../middlewear/auth'
import { validateUser } from '../middlewear/validation';

const router = express.Router();

router.get('/get-user',jwtCheck, jwtDecode, allUsers)
router.post('/register', jwtCheck ,register)
router.put('/user-update',jwtCheck, jwtDecode,validateUser, updateUser)

export default router;