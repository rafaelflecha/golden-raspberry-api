import { Request, Response } from "express";
import { ProducerService } from "../services/producerService";

export class ProducerController {
    private producerService: ProducerService;

    constructor() {
        this.producerService = new ProducerService();
    }

    getProducerAwardIntervals = (req: Request, res: Response): void => {
        try {
            const intervals = this.producerService.getProducerAwardIntervals();
            res.json(intervals);
        } catch (error) {
            console.error("Error fetching producer award intervals:", error);
            res.status(500).json({ error: "Failed to retrieve producer intervals" });
        }
    }
}
