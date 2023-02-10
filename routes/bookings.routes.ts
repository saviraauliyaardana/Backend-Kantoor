import { EditDataBookings, GetDataBookings, InputDataBookings } from '../controller/bookings.controller';
import { Router } from 'express';

const router = Router();
router.put("/:uid", EditDataBookings)
router.get("/", GetDataBookings)
router.post("/",InputDataBookings)


export default router;

