import { Router } from "express";
import { ProducerController } from "../controllers/producerController";

const router = Router();
const producerController = new ProducerController();

router.get('/award-intervals', producerController.getProducerAwardIntervals);

export default router;
