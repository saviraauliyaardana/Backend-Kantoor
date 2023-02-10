import { deletedataUser, 
    EditDataUser, 
    GetDataUser, 
    GetDataUserSpesifik, 
    InputDataUser, 
    login, 
    ResetPassword} from '../controller/user.controller';
import { Router } from 'express';

const router = Router();

router.get("/", GetDataUser)
router.put("/:uid", EditDataUser)
router.put("/reset-password/:uid",ResetPassword)
router.post("/",InputDataUser)
router.post("/login",login)
router.get("/:uid",GetDataUserSpesifik)
router.delete("/:uid", deletedataUser)


export default router;