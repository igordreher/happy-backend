import express from 'express';
import { getRepository } from 'typeorm';
import Orphanage from './database/models/Orphanage'

import './database/connection'

const app = express();
app.use(express.json())

app.post('/orphanages', async (req, res) => {
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

    return res.status(201).json(orphanages);
})

app.listen(3333);
