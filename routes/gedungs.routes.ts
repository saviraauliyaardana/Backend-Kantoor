import { DeleteGedungs, 
    DeleteReviewGedungs, 
    EditDataGedungs, 
    GetDataGedungs, 
    GetDataGedungsSpesifik, 
    InputDataGedungs, 
    JenisGedung, 
    ReviewGedung } from '../controller/gedungs.controller';
import { Router } from 'express';

const router = Router();

router.get("/", GetDataGedungs)
router.get("/review",ReviewGedung)
router.get("/jenis-gedungs",JenisGedung)
router.get("/:uid",GetDataGedungsSpesifik)
router.put("/:uid", EditDataGedungs)
router.post("/",InputDataGedungs)
router.delete("/review/:uid",DeleteReviewGedungs)
router.delete("/:uid",DeleteGedungs)


export default router;





