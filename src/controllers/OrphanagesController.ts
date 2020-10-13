import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage' 
import OrphanageView from '../views/orphanage_view'

export default {
    async index(req:Request, res:Response){
        const orphanagesRepository = getRepository(Orphanage)
        
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(OrphanageView.renderMany(orphanages))
    },
    async show(req:Request, res:Response){
        const orphanagesRepository = getRepository(Orphanage)
        const { id } = req.params;

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(OrphanageView.render(orphanage));
    },
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

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename}
        })
        

        const orphanages = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend,
            images
        });

        await orphanagesRepository.save(orphanages)

        return res.status(201).json(orphanages)
    }
}