import express from "express";
import { userController } from "../controllers/index.js";
import { validateUser } from "../validation/zod/index.js";
import { authenticate, authorize } from "../auth/index.js";

const route = express.Router();


route.post('/add',validateUser,userController.addUser)

route.get('/',authenticate,authorize(['admin']),userController.getAllUser)

route.get('/update/:id',userController.updateUser)

route.delete('/delete/:id',userController.deleteUser)

route.post('/sign-in',userController.signIn)
route.post('/sign-out',userController.signOut)

route.get('/:id',authenticate,userController.getUser)

export default route;