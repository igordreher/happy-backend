import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage' 

export default {
    async create(req:Request, res:Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend
        });

        await orphanagesRepository.save(orphanages)

        return res.status(201).json(orphanages)
    }
}