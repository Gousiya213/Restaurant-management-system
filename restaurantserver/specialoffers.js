import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import { spoffers } from './db.js';


dotenv.config();

const spoffersRouter = Router();
const app = express();
app.use(express.json());

spoffersRouter.post('/additem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
        image: z.string(),
        description: z.string(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price, image, description } = req.body;
    try {
        await spoffers.create({
            name,
            price,
            image,
            description,
        });

        res.status(201).json({ message: 'Item Added Successfully In Special Offers' });

    } catch (e) {
        console.error("Error in adding item:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
spoffersRouter.get('/allitems', async (req, res) => {
    try {
        const allItems = await spoffers.find();
        res.status(200).json(allItems);
    } catch (e) {
        console.error(" Fetch Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
spoffersRouter.delete('/deleteitem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price } = req.body;
    try {
        const deletedItem = await spoffers.findOneAndDelete({ name, price });

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: 'Item Deleted Successfully' });

    } catch (e) {
        console.error("Delete Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export default spoffersRouter;